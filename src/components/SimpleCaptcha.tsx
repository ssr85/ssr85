import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface SimpleCaptchaProps {
  onVerify: (token: string) => void;
  onError: () => void;
}

function generateChallenge() {
  const operators = ["+", "-"] as const;
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let num1: number, num2: number;
  
  if (operator === "+") {
    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * 20) + 1;
  } else {
    num1 = Math.floor(Math.random() * 20) + 10;
    num2 = Math.floor(Math.random() * num1) + 1;
  }
  
  const answer = operator === "+" ? num1 + num2 : num1 - num2;
  const question = `${num1} ${operator} ${num2} = ?`;
  
  return { question, answer, timestamp: Date.now() };
}

function generateToken(answer: number, timestamp: number): string {
  // Simple token combining answer and timestamp
  const data = `${answer}-${timestamp}-${Math.random().toString(36).slice(2)}`;
  return btoa(data);
}

export function SimpleCaptcha({ onVerify, onError }: SimpleCaptchaProps) {
  const [challenge, setChallenge] = useState(() => generateChallenge());
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  const refreshChallenge = useCallback(() => {
    setChallenge(generateChallenge());
    setUserAnswer("");
    setError("");
    setVerified(false);
    onError();
  }, [onError]);

  useEffect(() => {
    // Refresh challenge every 2 minutes for security
    const interval = setInterval(refreshChallenge, 120000);
    return () => clearInterval(interval);
  }, [refreshChallenge]);

  const handleVerify = () => {
    const parsed = parseInt(userAnswer, 10);
    
    if (isNaN(parsed)) {
      setError("Please enter a number");
      return;
    }
    
    if (parsed === challenge.answer) {
      setVerified(true);
      setError("");
      const token = generateToken(challenge.answer, challenge.timestamp);
      onVerify(token);
    } else {
      setError("Incorrect answer. Try again.");
      refreshChallenge();
    }
  };

  if (verified) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-md bg-primary/10 border border-primary/30">
        <span className="text-primary">✓</span>
        <span className="text-sm text-foreground">Verification complete</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>
        Security Check <span className="text-destructive">*</span>
      </Label>
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-2 rounded-md">
            {challenge.question}
          </span>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="Answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            className="w-20 border-border focus:border-primary"
            aria-label="CAPTCHA answer"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleVerify}
            className="shrink-0"
          >
            Verify
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={refreshChallenge}
          className="shrink-0"
          aria-label="New challenge"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
