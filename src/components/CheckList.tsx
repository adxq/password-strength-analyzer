/**
 * CheckList Component
 * Displays all password requirements with pass/fail indicators
 * Helps users understand exactly what makes a strong password
 */
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PasswordCheck } from '@/lib/passwordAnalyzer';

interface CheckListProps {
  checks: PasswordCheck[];
}

export function CheckList({ checks }: CheckListProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">
        Security Requirements
      </h3>
      
      {/* List of all checks */}
      <ul className="space-y-2">
        {checks.map((check) => (
          <li
            key={check.id}
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg transition-all duration-300',
              check.passed 
                ? 'bg-strength-strong/10 border border-strength-strong/20' 
                : 'bg-secondary border border-border'
            )}
          >
            {/* Pass/Fail icon */}
            <div
              className={cn(
                'flex-shrink-0 mt-0.5 rounded-full p-1',
                check.passed 
                  ? 'bg-strength-strong text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {check.passed ? (
                <Check className="h-3 w-3" />
              ) : (
                <X className="h-3 w-3" />
              )}
            </div>
            
            {/* Check details */}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'text-sm font-medium',
                  check.passed ? 'text-strength-strong' : 'text-foreground'
                )}
              >
                {check.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {check.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
