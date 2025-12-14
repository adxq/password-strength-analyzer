/**
 * Password Strength Analyzer
 * This file contains all the logic for analyzing password strength
 * and providing educational feedback to users.
 */

// Define the structure for password analysis results
export interface PasswordAnalysis {
  strength: 'weak' | 'medium' | 'strong';
  score: number; // 0-100
  checks: PasswordCheck[];
  crackTime: string;
  suggestions: string[];
  explanation: string;
}

// Each check represents one requirement for a strong password
export interface PasswordCheck {
  id: string;
  label: string;
  passed: boolean;
  description: string;
}

/**
 * Main function to analyze password strength
 * Takes a password string and returns a complete analysis
 */
export function analyzePassword(password: string): PasswordAnalysis {
  // Run all individual checks on the password
  const checks = getPasswordChecks(password);
  
  // Calculate overall score based on passed checks
  const passedChecks = checks.filter(check => check.passed).length;
  const score = Math.round((passedChecks / checks.length) * 100);
  
  // Determine strength level based on score
  const strength = getStrengthLevel(score);
  
  // Get suggestions for improvement
  const suggestions = getSuggestions(checks);
  
  // Calculate estimated crack time
  const crackTime = estimateCrackTime(password);
  
  // Generate explanation based on analysis
  const explanation = getExplanation(strength, checks);
  
  return {
    strength,
    score,
    checks,
    crackTime,
    suggestions,
    explanation,
  };
}

/**
 * Runs all password checks and returns results
 * Each check tests for a specific security requirement
 */
function getPasswordChecks(password: string): PasswordCheck[] {
  return [
    {
      id: 'length',
      label: 'At least 8 characters',
      passed: password.length >= 8,
      description: 'Longer passwords are harder to guess',
    },
    {
      id: 'length-strong',
      label: 'At least 12 characters',
      passed: password.length >= 12,
      description: 'Very long passwords are extremely secure',
    },
    {
      id: 'uppercase',
      label: 'Contains uppercase letter',
      passed: /[A-Z]/.test(password),
      description: 'Mix of upper and lowercase increases complexity',
    },
    {
      id: 'lowercase',
      label: 'Contains lowercase letter',
      passed: /[a-z]/.test(password),
      description: 'Lowercase letters are essential',
    },
    {
      id: 'number',
      label: 'Contains a number',
      passed: /[0-9]/.test(password),
      description: 'Numbers add another layer of complexity',
    },
    {
      id: 'symbol',
      label: 'Contains a symbol',
      passed: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      description: 'Symbols like !@#$% make passwords much stronger',
    },
    {
      id: 'no-common',
      label: 'Avoids common patterns',
      passed: !hasCommonPatterns(password),
      description: 'Avoid "123", "abc", "password", etc.',
    },
  ];
}

/**
 * Checks if password contains common weak patterns
 * These patterns are often the first things hackers try
 */
function hasCommonPatterns(password: string): boolean {
  const commonPatterns = [
    'password', '123456', 'qwerty', 'abc123', 'letmein',
    '111111', '123123', 'admin', 'welcome', 'monkey',
    '1234', 'pass', 'test', 'guest', 'master',
  ];
  
  const lowerPassword = password.toLowerCase();
  return commonPatterns.some(pattern => lowerPassword.includes(pattern));
}

/**
 * Determines strength level based on score
 * Returns 'weak', 'medium', or 'strong'
 */
function getStrengthLevel(score: number): 'weak' | 'medium' | 'strong' {
  if (score < 50) return 'weak';
  if (score < 75) return 'medium';
  return 'strong';
}

/**
 * Generates helpful suggestions based on failed checks
 * Only suggests improvements that are actually needed
 */
function getSuggestions(checks: PasswordCheck[]): string[] {
  const suggestions: string[] = [];
  
  const failedChecks = checks.filter(check => !check.passed);
  
  for (const check of failedChecks) {
    switch (check.id) {
      case 'length':
        suggestions.push('Add more characters to reach at least 8');
        break;
      case 'length-strong':
        suggestions.push('Try to use 12 or more characters for maximum security');
        break;
      case 'uppercase':
        suggestions.push('Add an uppercase letter (A-Z)');
        break;
      case 'lowercase':
        suggestions.push('Add a lowercase letter (a-z)');
        break;
      case 'number':
        suggestions.push('Include at least one number (0-9)');
        break;
      case 'symbol':
        suggestions.push('Add a special character like !@#$%^&*');
        break;
      case 'no-common':
        suggestions.push('Avoid common words and patterns');
        break;
    }
  }
  
  return suggestions;
}

/**
 * Estimates how long it would take to crack the password
 * Uses a simplified calculation for educational purposes
 */
function estimateCrackTime(password: string): string {
  if (password.length === 0) return 'Instantly';
  
  // Calculate the character set size based on what's in the password
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) charsetSize += 32;
  
  // If no recognized characters, assume just lowercase
  if (charsetSize === 0) charsetSize = 26;
  
  // Calculate total possible combinations
  // combinations = charsetSize ^ passwordLength
  const combinations = Math.pow(charsetSize, password.length);
  
  // Assume a fast computer can try 10 billion passwords per second
  const guessesPerSecond = 10_000_000_000;
  const seconds = combinations / guessesPerSecond;
  
  // Convert to human-readable time
  return formatTime(seconds);
}

/**
 * Converts seconds to a human-readable time string
 * Makes large numbers understandable
 */
function formatTime(seconds: number): string {
  if (seconds < 1) return 'Less than a second';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} minutes`;
  
  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} hours`;
  
  const days = hours / 24;
  if (days < 30) return `${Math.round(days)} days`;
  
  const months = days / 30;
  if (months < 12) return `${Math.round(months)} months`;
  
  const years = months / 12;
  if (years < 1000) return `${Math.round(years)} years`;
  
  if (years < 1_000_000) return `${Math.round(years / 1000)}K years`;
  if (years < 1_000_000_000) return `${Math.round(years / 1_000_000)}M years`;
  if (years < 1_000_000_000_000) return `${Math.round(years / 1_000_000_000)}B years`;
  
  return 'Centuries';
}

/**
 * Generates an educational explanation based on the analysis
 * Helps users understand why their password is weak or strong
 */
function getExplanation(
  strength: 'weak' | 'medium' | 'strong',
  checks: PasswordCheck[]
): string {
  const passedCount = checks.filter(c => c.passed).length;
  const totalCount = checks.length;
  
  switch (strength) {
    case 'weak':
      return `Your password meets only ${passedCount} of ${totalCount} security checks. Weak passwords can be cracked in minutes or seconds by automated tools. Hackers use "dictionary attacks" that try millions of common passwords and patterns.`;
    case 'medium':
      return `Your password meets ${passedCount} of ${totalCount} security checks. It's better than average, but could still be vulnerable to determined attackers. Adding more variety will make it much stronger.`;
    case 'strong':
      return `Excellent! Your password meets ${passedCount} of ${totalCount} security checks. It uses a good mix of characters and length, making it very difficult for attackers to guess or crack using automated tools.`;
  }
}
