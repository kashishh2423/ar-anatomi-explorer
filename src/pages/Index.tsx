import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Play, BookOpen, Users, Zap, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MedicalCard from '@/components/MedicalCard';

const Index = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Heart,
      title: "Interactive 3D Models",
      description: "Explore detailed anatomical structures with realistic 3D visualization",
      color: "text-red-500"
    },
    {
      icon: Zap,
      title: "Real-time Learning",
      description: "Toggle layers, cross-sections, and annotations in real-time",
      color: "text-primary"
    },
    {
      icon: BookOpen,
      title: "Smart Annotations",
      description: "Click any structure for detailed medical information and clinical notes",
      color: "text-accent"
    },
    {
      icon: Users,
      title: "Quiz Mode",
      description: "Test your knowledge with interactive quizzes and instant feedback",
      color: "text-success"
    }
  ];

  const stats = [
    { number: "95%", label: "Student Engagement" },
    { number: "40%", label: "Better Retention" },
    { number: "3D", label: "Visualization" },
    { number: "50+", label: "Anatomical Structures" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-8 relative">
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-soft">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Revolutionary Medical Education</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
              ARMedLearn
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the future of medical education with interactive 3D anatomy models. 
              Learn, explore, and master human anatomy through immersive visualization.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="medical" 
                size="lg" 
                onClick={() => navigate('/heart')}
                className="gap-2 text-lg px-8 py-6"
              >
                <Play className="h-5 w-5" />
                Start Learning
                <ArrowRight className="h-5 w-5" />
              </Button>
              
              <Button variant="control" size="lg" className="gap-2 text-lg px-8 py-6">
                <BookOpen className="h-5 w-5" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30 backdrop-blur-sm border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Revolutionary Learning Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform how students learn anatomy with cutting-edge 3D visualization and interactive features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group cursor-pointer"
              >
                <MedicalCard 
                  title={feature.title} 
                  description={feature.description}
                  className={`h-full transition-all duration-300 ${
                    hoveredFeature === index ? 'scale-105 shadow-glow' : ''
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-full bg-gradient-surface border border-border/50 ${
                      hoveredFeature === index ? 'shadow-glow' : 'shadow-soft'
                    } transition-all duration-300`}>
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                  </div>
                </MedicalCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
              Ready to Transform Medical Education?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Join thousands of students and educators who are already experiencing the future of anatomy learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => navigate('/heart')}
                className="gap-2 text-lg px-8 py-6 bg-background text-foreground hover:bg-background/90"
              >
                <Heart className="h-5 w-5" />
                Explore Heart Model
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card/50 backdrop-blur-sm border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-foreground">ARMedLearn</h3>
            <p className="text-muted-foreground">
              Revolutionizing medical education through interactive 3D visualization
            </p>
            <div className="text-sm text-muted-foreground">
              © 2024 ARMedLearn. Built for the future of medical education.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
