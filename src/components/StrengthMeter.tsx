/**
 * StrengthMeter Component
 * Displays a visual indicator of password strength with an animated bar
 */
import { cn } from '@/lib/utils';
import type { PasswordAnalysis } from '@/lib/passwordAnalyzer';

interface StrengthMeterProps {
  analysis: PasswordAnalysis | null;
}

export function StrengthMeter({ analysis }: StrengthMeterProps) {
  // Default values when no password is entered
  const strength = analysis?.strength ?? 'weak';
  const score = analysis?.score ?? 0;
  
  // Get the display label for the strength level
  const strengthLabels = {
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
  };

  return (
    <div className="space-y-3">
      {/* Header with strength label */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Password Strength
        </span>
        <span
          className={cn(
            'text-sm font-semibold uppercase tracking-wide',
            strength === 'weak' && 'text-strength-weak',
            strength === 'medium' && 'text-strength-medium',
            strength === 'strong' && 'text-strength-strong'
          )}
        >
          {analysis ? strengthLabels[strength] : 'Enter a password'}
        </span>
      </div>
      
      {/* Animated strength bar */}
      <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className={cn(
            'strength-bar h-full transition-all duration-500 ease-out',
            strength === 'weak' && 'strength-weak',
            strength === 'medium' && 'strength-medium',
            strength === 'strong' && 'strength-strong'
          )}
          style={{ width: `${score}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Password strength: ${score}%`}
        />
      </div>
      
      {/* Score percentage */}
      <p className="text-xs text-muted-foreground text-center">
        Score: {score}%
      </p>
    </div>
  );
}
