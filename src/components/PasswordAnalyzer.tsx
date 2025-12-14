/**
 * PasswordAnalyzer Component
 * Main component that brings together all password analysis features
 * Acts as the container for the entire password strength checking tool
 */
import { useState, useMemo } from 'react';
import { Lock, BookOpen } from 'lucide-react';
import { PasswordInput } from './PasswordInput';
import { StrengthMeter } from './StrengthMeter';
import { CheckList } from './CheckList';
import { CrackTimeDisplay } from './CrackTimeDisplay';
import { Suggestions } from './Suggestions';
import { Explanation } from './Explanation';
import { analyzePassword } from '@/lib/passwordAnalyzer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function PasswordAnalyzer() {
  // State to store the password being analyzed
  const [password, setPassword] = useState('');
  
  // Analyze password whenever it changes
  // useMemo prevents unnecessary recalculations
  const analysis = useMemo(() => {
    if (password.length === 0) return null;
    return analyzePassword(password);
  }, [password]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Main Input Card */}
      <Card className="glow-border">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Password Strength Analyzer</CardTitle>
          </div>
          <CardDescription>
            Enter a password to see how strong it is and learn how to improve it
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password input field */}
          <PasswordInput value={password} onChange={setPassword} />
          
          {/* Strength meter - always visible */}
          <StrengthMeter analysis={analysis} />
        </CardContent>
      </Card>
      
      {/* Analysis Results - Only shown when password is entered */}
      {analysis && (
        <div className="space-y-6 animate-fade-in">
          {/* Crack time and explanation row */}
          <div className="grid gap-4 md:grid-cols-2">
            <CrackTimeDisplay 
              crackTime={analysis.crackTime} 
              strength={analysis.strength} 
            />
            <Explanation 
              explanation={analysis.explanation} 
              strength={analysis.strength} 
            />
          </div>
          
          {/* Requirements checklist */}
          <Card>
            <CardContent className="pt-6">
              <CheckList checks={analysis.checks} />
            </CardContent>
          </Card>
          
          {/* Improvement suggestions */}
          <Card>
            <CardContent className="pt-6">
              <Suggestions suggestions={analysis.suggestions} />
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Educational Footer */}
      <Card className="bg-secondary/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Why Password Strength Matters
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Strong passwords protect your accounts from hackers who use automated tools 
                to guess millions of passwords per second. A good password combines length, 
                variety (uppercase, lowercase, numbers, symbols), and unpredictability. 
                Never use the same password for multiple accounts!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
