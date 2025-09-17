import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import MedicalCard from './MedicalCard';

interface QuizModeProps {
  onQuizAnswer: (isCorrect: boolean) => void;
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  onRestart: () => void;
}

const quizQuestions = [
  {
    question: "Which chamber pumps blood to the entire body?",
    structure: "Left Ventricle",
    options: ["Left Ventricle", "Right Ventricle", "Left Atrium", "Right Atrium"]
  },
  {
    question: "What is the heart's natural pacemaker located in?",
    structure: "Right Atrium",
    options: ["Left Ventricle", "Right Atrium", "Aorta", "Left Atrium"]
  },
  {
    question: "Which vessel carries blood from the heart to the lungs?",
    structure: "Pulmonary Artery",
    options: ["Aorta", "Coronary Arteries", "Pulmonary Artery", "Vena Cava"]
  },
  {
    question: "What supplies the heart muscle with oxygen and nutrients?",
    structure: "Coronary Arteries",
    options: ["Pulmonary Artery", "Aorta", "Coronary Arteries", "Vena Cava"]
  },
  {
    question: "Which is the body's largest artery?",
    structure: "Aorta",
    options: ["Pulmonary Artery", "Coronary Arteries", "Aorta", "Carotid Artery"]
  }
];

export default function QuizMode({ 
  onQuizAnswer, 
  currentQuestion, 
  totalQuestions, 
  score, 
  onRestart 
}: QuizModeProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const question = quizQuestions[currentQuestion];
  const isQuizComplete = currentQuestion >= totalQuestions;

  useEffect(() => {
    setSelectedAnswer(null);
    setAnswered(false);
    setFeedback(null);
  }, [currentQuestion]);

  const handleAnswer = (answer: string) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    const isCorrect = answer === question.structure;
    const message = isCorrect 
      ? `Correct! The ${question.structure} is the right answer.`
      : `Incorrect. The correct answer is ${question.structure}.`;
    
    setFeedback({ correct: isCorrect, message });
    onQuizAnswer(isCorrect);
  };

  if (isQuizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <MedicalCard title="Quiz Complete!" variant="highlighted">
        <div className="text-center space-y-4">
          <div className="text-3xl font-bold text-primary">{percentage}%</div>
          <p className="text-muted-foreground">
            You scored {score} out of {totalQuestions}
          </p>
          <div className="space-y-2">
            {percentage >= 80 && (
              <p className="text-success font-medium">Excellent work! 🎉</p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-warning font-medium">Good job! Keep studying! 📚</p>
            )}
            {percentage < 60 && (
              <p className="text-destructive font-medium">Keep practicing! You'll get it! 💪</p>
            )}
          </div>
          <Button variant="medical" onClick={onRestart} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </MedicalCard>
    );
  }

  return (
    <MedicalCard title={`Question ${currentQuestion + 1} of ${totalQuestions}`}>
      <div className="space-y-4">
        <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
          <p className="font-medium text-foreground">{question.question}</p>
        </div>
        
        <div className="space-y-2">
          {question.options.map((option) => (
            <Button
              key={option}
              variant={answered ? (
                option === question.structure 
                  ? "quiz" 
                  : selectedAnswer === option 
                    ? "destructive" 
                    : "control"
              ) : "control"}
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => handleAnswer(option)}
              disabled={answered}
            >
              <div className="flex items-center gap-2">
                {answered && option === question.structure && (
                  <CheckCircle className="h-4 w-4 text-success" />
                )}
                {answered && selectedAnswer === option && option !== question.structure && (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                <span>{option}</span>
              </div>
            </Button>
          ))}
        </div>

        {feedback && (
          <div className={`p-3 rounded-lg border ${
            feedback.correct 
              ? 'bg-success/10 border-success/20 text-success-foreground' 
              : 'bg-destructive/10 border-destructive/20 text-destructive-foreground'
          }`}>
            <p className="text-sm font-medium">{feedback.message}</p>
          </div>
        )}

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Score: {score}/{currentQuestion + (answered ? 1 : 0)}</span>
          <div className="w-24 bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + (answered ? 1 : 0)) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </MedicalCard>
  );
}