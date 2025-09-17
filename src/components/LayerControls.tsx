import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import MedicalCard from './MedicalCard';

type LayerType = {
  exterior: boolean;
  muscles: boolean;
  chambers: boolean;
  vessels: boolean;
};

interface LayerControlsProps {
  layers: LayerType;
  onLayerToggle: (layer: keyof LayerType) => void;
}

const layerInfo = {
  exterior: { name: 'Exterior', description: 'Heart muscle and outer surface', color: 'bg-amber-500' },
  muscles: { name: 'Muscle Tissue', description: 'Myocardium and cardiac muscle', color: 'bg-red-500' },
  chambers: { name: 'Heart Chambers', description: 'Atria and ventricles', color: 'bg-rose-400' },
  vessels: { name: 'Blood Vessels', description: 'Arteries, veins, and coronary circulation', color: 'bg-blue-500' }
};

export default function LayerControls({ layers, onLayerToggle }: LayerControlsProps) {
  return (
    <MedicalCard title="Anatomical Layers" description="Toggle different heart structures">
      <div className="space-y-4">
        {Object.entries(layerInfo).map(([key, info]) => (
          <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${info.color}`} />
              <div>
                <Label htmlFor={key} className="text-sm font-medium cursor-pointer">
                  {info.name}
                </Label>
                <p className="text-xs text-muted-foreground">{info.description}</p>
              </div>
            </div>
            <Switch
              id={key}
              checked={layers[key as keyof LayerType]}
              onCheckedChange={() => onLayerToggle(key as keyof LayerType)}
            />
          </div>
        ))}
      </div>
    </MedicalCard>
  );
}