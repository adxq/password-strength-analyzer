/**
 * Explanation Component
 * Provides educational context about password security
 * Helps students understand the "why" behind password requirements
 */
import { Info, AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExplanationProps {
  explanation: string;
  strength: 'weak' | 'medium' | 'strong';
}

export function Explanation({ explanation, strength }: ExplanationProps) {
  // Choose icon based on strength
  const Icon = strength === 'strong' 
    ? ShieldCheck 
    : strength === 'medium' 
      ? Info 
      : ShieldAlert;

  return (
    <div
      className={cn(
        'p-4 rounded-xl border',
        strength === 'weak' && 'bg-strength-weak/5 border-strength-weak/20',
        strength === 'medium' && 'bg-strength-medium/5 border-strength-medium/20',
        strength === 'strong' && 'bg-strength-strong/5 border-strength-strong/20'
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <Icon
          className={cn(
            'h-5 w-5 mt-0.5 flex-shrink-0',
            strength === 'weak' && 'text-strength-weak',
            strength === 'medium' && 'text-strength-medium',
            strength === 'strong' && 'text-strength-strong'
          )}
        />
        <div>
          <h3
            className={cn(
              'text-sm font-semibold mb-1',
              strength === 'weak' && 'text-strength-weak',
              strength === 'medium' && 'text-strength-medium',
              strength === 'strong' && 'text-strength-strong'
            )}
          >
            {strength === 'strong'
              ? 'Excellent Security'
              : strength === 'medium'
                ? 'Good, But Could Be Better'
                : 'Security Warning'}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  );
}
