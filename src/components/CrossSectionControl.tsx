import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import MedicalCard from './MedicalCard';

interface CrossSectionControlProps {
  value: number;
  onChange: (value: number) => void;
}

export default function CrossSectionControl({ value, onChange }: CrossSectionControlProps) {
  return (
    <MedicalCard title="Cross-Section View" description="Slice through the heart to view internal structures">
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Section Depth</Label>
          <p className="text-xs text-muted-foreground mb-3">
            Drag to cut through the heart and reveal internal anatomy
          </p>
        </div>
        
        <div className="px-2">
          <Slider
            value={[value]}
            onValueChange={(values) => onChange(values[0])}
            max={1}
            min={0}
            step={0.01}
            className="w-full"
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Exterior</span>
          <span>{Math.round(value * 100)}%</span>
          <span>Core</span>
        </div>
      </div>
    </MedicalCard>
  );
}