import { cn } from '@/lib/utils';

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <pre className={cn('bg-muted overflow-auto rounded-lg p-3 text-xs', className)}>
      <code>{code}</code>
    </pre>
  );
}
