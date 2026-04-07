import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered';
  hover?: boolean;
}

export function Card({ className, variant = 'default', hover = true, children, ...props }: CardProps) {
  const variants = {
    default: 'bg-surface rounded-card shadow-[var(--shadow-card)]',
    glass: 'glass-card',
    bordered: 'bg-surface border border-border rounded-card',
  };

  return (
    <div
      className={cn(
        variants[variant],
        hover && 'hover:shadow-[var(--shadow-card-hover)] transition-shadow cursor-pointer',
        'p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-lg font-semibold font-heading text-foreground', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('text-muted-foreground', className)} {...props}>
      {children}
    </div>
  );
}
