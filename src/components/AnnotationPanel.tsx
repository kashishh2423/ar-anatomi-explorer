import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MedicalCard from './MedicalCard';

interface AnnotationInfo {
  name: string;
  description: string;
  function: string;
  clinicalNote?: string;
}

interface AnnotationPanelProps {
  structure: string | null;
  onClose: () => void;
}

const anatomyData: Record<string, AnnotationInfo> = {
  'Heart Exterior': {
    name: 'Heart Exterior (Epicardium)',
    description: 'The outer layer of the heart wall, consisting of connective tissue and fat.',
    function: 'Protects the heart and reduces friction during beating.',
    clinicalNote: 'Pericarditis affects this layer, causing chest pain and inflammation.'
  },
  'Left Ventricle': {
    name: 'Left Ventricle',
    description: 'The heart\'s main pumping chamber, with thick muscular walls.',
    function: 'Pumps oxygenated blood to the entire body through the aorta.',
    clinicalNote: 'Left ventricular dysfunction is a major cause of heart failure.'
  },
  'Right Ventricle': {
    name: 'Right Ventricle',
    description: 'Pumps deoxygenated blood to the lungs for oxygenation.',
    function: 'Maintains pulmonary circulation and gas exchange.',
    clinicalNote: 'Right heart failure often results from pulmonary hypertension.'
  },
  'Left Atrium': {
    name: 'Left Atrium',
    description: 'Receives oxygenated blood from the pulmonary veins.',
    function: 'Stores and transfers blood to the left ventricle.',
    clinicalNote: 'Atrial fibrillation commonly originates in the left atrium.'
  },
  'Right Atrium': {
    name: 'Right Atrium',
    description: 'Receives deoxygenated blood from the body via vena cava.',
    function: 'Collects venous return and transfers it to the right ventricle.',
    clinicalNote: 'Contains the sinoatrial (SA) node, the heart\'s natural pacemaker.'
  },
  'Aorta': {
    name: 'Aorta',
    description: 'The body\'s largest artery, carrying blood from the left ventricle.',
    function: 'Distributes oxygenated blood to all body organs and tissues.',
    clinicalNote: 'Aortic aneurysms and stenosis are serious cardiovascular conditions.'
  },
  'Coronary Arteries': {
    name: 'Coronary Arteries',
    description: 'Blood vessels that supply the heart muscle itself with oxygen and nutrients.',
    function: 'Ensure the heart muscle receives adequate blood supply for proper function.',
    clinicalNote: 'Coronary artery disease is the leading cause of heart attacks.'
  },
  'Pulmonary Artery': {
    name: 'Pulmonary Artery',
    description: 'Carries deoxygenated blood from the right ventricle to the lungs.',
    function: 'Transports blood for oxygenation in the pulmonary circulation.',
    clinicalNote: 'Pulmonary embolism can block these arteries, causing serious complications.'
  }
};

export default function AnnotationPanel({ structure, onClose }: AnnotationPanelProps) {
  if (!structure) return null;

  const info = anatomyData[structure];
  if (!info) return null;

  return (
    <div className="absolute top-4 right-4 w-80 z-10">
      <MedicalCard title={info.name} variant="highlighted">
        <div className="space-y-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="space-y-3 pt-2">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">{info.description}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Function</h4>
              <p className="text-sm text-muted-foreground">{info.function}</p>
            </div>
            
            {info.clinicalNote && (
              <div className="bg-accent/20 p-3 rounded-lg border border-accent/30">
                <h4 className="text-sm font-semibold text-accent-foreground mb-1">Clinical Note</h4>
                <p className="text-sm text-accent-foreground/80">{info.clinicalNote}</p>
              </div>
            )}
          </div>
        </div>
      </MedicalCard>
    </div>
  );
}