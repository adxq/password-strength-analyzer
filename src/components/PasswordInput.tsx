/**
 * PasswordInput Component
 * A styled input field for entering passwords with a show/hide toggle
 */
import { useState } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PasswordInput({ value, onChange }: PasswordInputProps) {
  // State to track whether password is visible or hidden
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      {/* Label with icon */}
      <label 
        htmlFor="password-input" 
        className="flex items-center gap-2 text-sm font-medium text-foreground"
      >
        <Shield className="h-4 w-4 text-primary" />
        Enter a password to analyze
      </label>
      
      {/* Input container with show/hide button */}
      <div className="relative">
        <Input
          id="password-input"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your password here..."
          className="pr-12 font-mono text-lg h-14 bg-secondary border-border focus:border-primary focus:ring-primary/20"
          autoComplete="off"
        />
        
        {/* Show/Hide toggle button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 p-0 text-muted-foreground hover:text-foreground"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {/* Helper text */}
      <p className="text-xs text-muted-foreground">
        Your password is analyzed locally and never sent to any server.
      </p>
    </div>
  );
}
