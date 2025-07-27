import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Headset, Play, Settings, Info } from "lucide-react";
import { toast } from "sonner";

const VRView = () => {
  const startVRExperience = () => {
    toast.success("Avvio esperienza VR...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-ocean-deep mb-4">
            Esperienza VR Immersiva
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Esplora il tuo yacht in realtà virtuale. Cammina negli interni, 
            personalizza gli spazi e vivi l'esperienza completa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* VR Launch Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Headset className="h-6 w-6 mr-2 text-ocean-deep" />
                Avvia Esperienza VR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-ocean-light to-ocean-medium h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-pearl">
                  <Headset className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl font-semibold">Vista VR Pronta</p>
                </div>
              </div>
              
              <Button 
                onClick={startVRExperience}
                className="w-full bg-ocean-deep hover:bg-ocean-medium h-12 text-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                Avvia VR Experience
              </Button>
            </CardContent>
          </Card>

          {/* Features Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-6 w-6 mr-2 text-ocean-deep" />
                Funzionalità VR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Navigazione Interni</span>
                  <Badge variant="default">Attiva</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Personalizzazione Live</span>
                  <Badge variant="default">Attiva</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Vista Esterna 360°</span>
                  <Badge variant="default">Attiva</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Controlli Gesture</span>
                  <Badge variant="secondary">Beta</Badge>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Configurazione VR
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VRView;