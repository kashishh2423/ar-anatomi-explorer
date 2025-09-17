import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MedicalCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted';
}

export default function MedicalCard({ 
  title, 
  description, 
  children, 
  className = '',
  variant = 'default'
}: MedicalCardProps) {
  const baseClasses = "bg-gradient-surface shadow-medical border-border/50 backdrop-blur-sm";
  const variantClasses = variant === 'highlighted' 
    ? "ring-1 ring-primary/20 shadow-glow" 
    : "";

  return (
    <Card className={`${baseClasses} ${variantClasses} ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
}