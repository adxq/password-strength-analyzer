/**
 * Suggestions Component
 * Displays helpful tips to improve password strength
 * Only shows suggestions that are relevant to the current password
 */
import { Lightbulb, ArrowRight } from 'lucide-react';

interface SuggestionsProps {
  suggestions: string[];
}

export function Suggestions({ suggestions }: SuggestionsProps) {
  // Don't render if there are no suggestions needed
  if (suggestions.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-strength-strong/10 border border-strength-strong/30">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-strength-strong" />
          <p className="text-sm font-medium text-strength-strong">
            Great job! Your password meets all requirements.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium text-foreground">
          How to Improve
        </h3>
      </div>
      
      {/* Suggestions list */}
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ArrowRight className="h-3 w-3 text-primary flex-shrink-0" />
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
