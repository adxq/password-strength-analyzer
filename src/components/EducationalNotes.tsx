/**
 * EducationalNotes Component
 * Provides beginner-friendly explanations of key cybersecurity concepts
 * Designed for students learning about password security
 */
import { Cpu, Ruler, Copy, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Each topic has an icon, title, and simple explanation
const topics = [
  {
    icon: Cpu,
    title: 'What is a Brute-Force Attack?',
    description:
      "Imagine a thief trying every possible key on a keychain until one opens your door. That's a brute-force attack! Hackers use powerful computers to try millions of password combinations every second until they find the right one. Simple passwords like \"123456\" or \"password\" are cracked almost instantly because hackers try these first.",
  },
  {
    icon: Ruler,
    title: 'Why Longer Passwords Are Safer',
    description:
      "Every character you add to your password makes it exponentially harder to crack. A 6-character password might have millions of combinations, but a 12-character password has quintillions! Think of it like a combination lock — a lock with 3 digits is easy to crack, but one with 10 digits would take years. Aim for at least 12 characters.",
  },
  {
    icon: Copy,
    title: 'The Danger of Password Reuse',
    description:
      "Using the same password everywhere is like having one key for your house, car, and office. If someone steals that key, they can access everything! When hackers break into one website, they try those stolen passwords on other sites. This is called \"credential stuffing.\" Always use a unique password for each account, especially for email and banking.",
  },
];

export function EducationalNotes() {
  return (
    <Card className="bg-card/50 border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Learn: Password Security Basics</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2"
          >
            {/* Topic header */}
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <topic.icon className="h-4 w-4 text-primary" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">
                {topic.title}
              </h4>
            </div>
            
            {/* Topic explanation */}
            <p className="text-sm text-muted-foreground leading-relaxed pl-8">
              {topic.description}
            </p>
          </div>
        ))}
        
        {/* Quick tip */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            💡 <strong>Pro Tip:</strong> Consider using a password manager to generate and store unique passwords for all your accounts!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
