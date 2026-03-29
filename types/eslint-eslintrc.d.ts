declare module '@eslint/eslintrc' {
  export interface FlatCompatOptions {
    baseDirectory?: string;
    resolvePluginsRelativeTo?: string;
    recommendedConfig?: unknown;
    allConfig?: unknown;
  }

  export class FlatCompat {
    constructor(options?: FlatCompatOptions);
    config(config: unknown): unknown[];
  }
}
