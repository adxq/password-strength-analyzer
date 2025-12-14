/**
 * CrackTimeDisplay Component
 * Shows the estimated time it would take to crack the password
 * Helps users understand the real-world security of their password
 */
import { Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CrackTimeDisplayProps {
  crackTime: string;
  strength: 'weak' | 'medium' | 'strong';
}

export function CrackTimeDisplay({ crackTime, strength }: CrackTimeDisplayProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-xl border transition-all duration-300',
        strength === 'weak' && 'bg-strength-weak/10 border-strength-weak/30',
        strength === 'medium' && 'bg-strength-medium/10 border-strength-medium/30',
        strength === 'strong' && 'bg-strength-strong/10 border-strength-strong/30'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Clock
          className={cn(
            'h-4 w-4',
            strength === 'weak' && 'text-strength-weak',
            strength === 'medium' && 'text-strength-medium',
            strength === 'strong' && 'text-strength-strong'
          )}
        />
        <span className="text-sm font-medium text-muted-foreground">
          Estimated Crack Time
        </span>
      </div>
      
      {/* Crack time display */}
      <p
        className={cn(
          'text-2xl font-bold font-mono',
          strength === 'weak' && 'text-strength-weak',
          strength === 'medium' && 'text-strength-medium',
          strength === 'strong' && 'text-strength-strong'
        )}
      >
        {crackTime}
      </p>
      
      {/* Educational note */}
      <p className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
        <Zap className="h-3 w-3 mt-0.5 flex-shrink-0" />
        <span>
          Based on a computer trying 10 billion passwords per second
        </span>
      </p>
    </div>
  );
}
