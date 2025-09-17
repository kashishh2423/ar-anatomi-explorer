import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Brain, Eye, Layers } from 'lucide-react';
import HeartModel from '@/components/3d/HeartModel';
import LayerControls from '@/components/LayerControls';
import AnnotationPanel from '@/components/AnnotationPanel';
import CrossSectionControl from '@/components/CrossSectionControl';
import QuizMode from '@/components/QuizMode';

type ViewMode = 'explore' | 'quiz';

export default function HeartViewer() {
  const [viewMode, setViewMode] = useState<ViewMode>('explore');
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const [crossSection, setCrossSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [layers, setLayers] = useState({
    exterior: true,
    muscles: false,
    chambers: true,
    vessels: true
  });

  const handleLayerToggle = (layer: keyof typeof layers) => {
    setLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const handleStructureClick = (structure: string) => {
    if (viewMode === 'explore') {
      setSelectedStructure(structure);
    }
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setTimeout(() => {
      setCurrentQuestion(prev => prev + 1);
    }, 2000);
  };

  const handleQuizRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={goHome} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">3D Heart Explorer</h1>
                <p className="text-sm text-muted-foreground">Interactive Anatomy Learning</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'explore' ? 'medical' : 'control'}
                onClick={() => setViewMode('explore')}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Explore
              </Button>
              <Button
                variant={viewMode === 'quiz' ? 'medical' : 'control'}
                onClick={() => setViewMode('quiz')}
                className="gap-2"
              >
                <Brain className="h-4 w-4" />
                Quiz
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* 3D Viewer */}
          <div className="lg:col-span-3 relative bg-gradient-surface rounded-xl shadow-medical border border-border/50 overflow-hidden">
            <div className="absolute inset-0">
              <HeartModel
                crossSection={crossSection}
                visibleLayers={layers}
                onStructureClick={handleStructureClick}
              />
            </div>
            
            {/* Annotation Overlay */}
            <AnnotationPanel
              structure={selectedStructure}
              onClose={() => setSelectedStructure(null)}
            />
            
            {/* Mode Indicator */}
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50">
              <div className="flex items-center gap-2">
                {viewMode === 'explore' ? (
                  <>
                    <Layers className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Exploration Mode</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">Quiz Mode</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-4 overflow-y-auto">
            {viewMode === 'explore' ? (
              <>
                <LayerControls layers={layers} onLayerToggle={handleLayerToggle} />
                <CrossSectionControl value={crossSection} onChange={setCrossSection} />
              </>
            ) : (
              <QuizMode
                onQuizAnswer={handleQuizAnswer}
                currentQuestion={currentQuestion}
                totalQuestions={5}
                score={score}
                onRestart={handleQuizRestart}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}