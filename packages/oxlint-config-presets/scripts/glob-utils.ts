/**
 * fast-glob (used by oxlint's `overrides[].files` matcher) does not support
 * extglob syntax (`@(...)`, `?(...)`, `*(...)`, `+(...)`, `!(...)`), unlike
 * ESLint's minimatch-based file matching. Patterns using it are silently
 * ignored rather than rejected: https://github.com/oxc-project/oxc/issues/21525
 *
 * `@(...)` and `?(...)` enumerate a finite set of alternatives, so they can
 * be rewritten into plain glob patterns with the same matching behavior.
 * `*(...)`, `+(...)`, and `!(...)` have no finite plain-glob equivalent
 * (unbounded repetition / negation) per the oxc maintainers' own analysis on
 * that issue, so callers must supply a manual replacement for those instead.
 */

interface ExtglobToken {
  index: number;
  length: number;
  operator: '@' | '?' | '*' | '+' | '!';
  content: string;
}

/** Finds top-level (non-nested) extglob tokens. Returns null if a token appears to be nested. */
function findExtglobTokens(pattern: string): ExtglobToken[] | null {
  const tokens: ExtglobToken[] = [];
  const re = /([@?*+!])\(([^()]*)\)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(pattern))) {
    tokens.push({
      index: match.index,
      length: match[0].length,
      operator: match[1] as ExtglobToken['operator'],
      content: match[2],
    });
  }

  let stripped = pattern;
  for (const token of [...tokens].sort((a, b) => b.index - a.index)) {
    stripped = stripped.slice(0, token.index) + stripped.slice(token.index + token.length);
  }
  // An operator immediately followed by '(' still present means a token was
  // nested (or otherwise malformed) and wasn't captured above - bail rather
  // than risk misinterpreting the pattern.
  if (/[@?*+!]\(/.test(stripped)) return null;

  return tokens;
}

function splitTopLevel(input: string, separator: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const ch of input) {
    if (ch === '[') depth++;
    else if (ch === ']') depth = Math.max(0, depth - 1);

    if (ch === separator && depth === 0) {
      parts.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  parts.push(current);
  return parts;
}

/** Expands a `[...]` bracket expression (chars and/or `a-z` ranges) into individual characters. */
function expandBracketClass(expr: string): string[] | null {
  const chars: string[] = [];
  for (let i = 0; i < expr.length; i++) {
    if (expr[i + 1] === '-' && expr[i + 2] !== undefined) {
      const start = expr.charCodeAt(i);
      const end = expr.charCodeAt(i + 2);
      if (end < start) return null;
      for (let code = start; code <= end; code++) chars.push(String.fromCharCode(code));
      i += 2;
    } else {
      chars.push(expr[i]);
    }
  }
  return chars;
}

function expandAlternative(alt: string): string[] | null {
  const bracketMatch = /^\[([^\]]+)\]$/.exec(alt);
  if (bracketMatch) return expandBracketClass(bracketMatch[1]);
  // A literal alternative that still contains glob metacharacters (other
  // than plain `*`/`?`) is out of scope for this simple expander.
  if (/[[\]]/.test(alt)) return null;
  return [alt];
}

function expandTokenContent(content: string): string[] | null {
  const alternatives: string[] = [];
  for (const part of splitTopLevel(content, '|')) {
    const expanded = expandAlternative(part);
    if (!expanded) return null;
    alternatives.push(...expanded);
  }
  return alternatives;
}

function expandToken(token: ExtglobToken): string[] | null {
  const alternatives = expandTokenContent(token.content);
  if (!alternatives) return null;

  switch (token.operator) {
    case '@': // exactly one of the alternatives
      return alternatives;
    case '?': // zero or one
      return ['', ...alternatives];
    case '*': // zero or more - unbounded, no finite plain-glob equivalent
    case '+': // one or more - unbounded, no finite plain-glob equivalent
    case '!': // negation - no plain-glob equivalent
      return null;
  }
}

/**
 * Expands `@(...)` / `?(...)` extglob tokens in `pattern` into an equivalent
 * set of plain glob patterns with no extglob syntax. Returns `[pattern]`
 * unchanged if it contains no extglob syntax, or `null` if it contains
 * extglob syntax that has no finite plain-glob equivalent (`*(...)`,
 * `+(...)`, `!(...)`, or a token nested inside another).
 */
export function expandExtglob(pattern: string): string[] | null {
  const tokens = findExtglobTokens(pattern);
  if (tokens === null) return null;
  if (tokens.length === 0) return [pattern];

  let results = [''];
  let cursor = 0;
  for (const token of tokens) {
    const literal = pattern.slice(cursor, token.index);
    const alternatives = expandToken(token);
    if (!alternatives) return null;
    results = results.flatMap((prefix) => alternatives.map((alt) => prefix + literal + alt));
    cursor = token.index + token.length;
  }
  const tail = pattern.slice(cursor);
  results = results.map((r) => r + tail);

  return [...new Set(results)];
}

/** True if `pattern` contains extglob syntax fast-glob does not support. */
export function hasExtglob(pattern: string): boolean {
  return /[@?*+!]\([^)]*\)/.test(pattern);
}
