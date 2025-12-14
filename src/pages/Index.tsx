/**
 * Index Page
 * Main landing page for the Password Strength Analyzer
 * Features a cyber-themed background and the analyzer component
 */
import { Shield } from 'lucide-react';
import { PasswordAnalyzer } from '@/components/PasswordAnalyzer';
import { EducationalNotes } from '@/components/EducationalNotes';

const Index = () => {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-12 pb-8 px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Logo/Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient">Password Strength</span>
              <br />
              <span className="text-foreground">Analyzer</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-muted-foreground max-w-md mx-auto">
              Learn what makes a password secure and how to create 
              stronger passwords to protect your accounts.
            </p>
          </div>
        </header>
        
        {/* Main analyzer component */}
        <main className="px-4 pb-12 space-y-8">
          <PasswordAnalyzer />
          
          {/* Educational notes section */}
          <div className="max-w-2xl mx-auto">
            <EducationalNotes />
          </div>
        </main>
        
        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <p className="text-center text-xs text-muted-foreground">
            Built for educational purposes • All analysis happens in your browser
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
