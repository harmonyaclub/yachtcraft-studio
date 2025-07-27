import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Palette, Waves, Home, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface ConfigurationPanelProps {
  configuration: {
    hullColor: string;
    deckMaterial: string;
    interiorStyle: string;
    modules: string[];
  };
  onConfigChange: (config: any) => void;
}

const ConfigurationPanel = ({ configuration, onConfigChange }: ConfigurationPanelProps) => {
  const [activeTab, setActiveTab] = useState("hull");

  const hullColors = [
    { name: "Bianco Perla", color: "#F8F8FF", value: "#F8F8FF" },
    { name: "Blu Navy", color: "#1e3a8a", value: "#1e3a8a" },
    { name: "Grigio Acciaio", color: "#64748b", value: "#64748b" },
    { name: "Nero Elegante", color: "#0f172a", value: "#0f172a" },
    { name: "Champagne", color: "#F7E7CE", value: "#F7E7CE" },
  ];

  const deckMaterials = [
    { name: "Teak Naturale", value: "teak", description: "Legno teak premium resistente all'acqua" },
    { name: "Composito Avanzato", value: "composite", description: "Materiale composito antiscivolo" },
    { name: "Fibra di Carbonio", value: "carbon", description: "Ultraleggero e resistente" },
  ];

  const interiorStyles = [
    { name: "Moderno Minimalista", value: "modern", description: "Linee pulite e spazi aperti" },
    { name: "Classico Elegante", value: "classic", description: "Tradizione e raffinatezza" },
    { name: "Contemporaneo Lusso", value: "luxury", description: "Massimo comfort e stile" },
  ];

  const availableModules = [
    { name: "Cabina Armatoriale", value: "master-cabin", icon: "🛏️" },
    { name: "Cabina Ospiti", value: "guest-cabin", icon: "🛌" },
    { name: "Salotto Principale", value: "main-salon", icon: "🛋️" },
    { name: "Cucina Gourmet", value: "galley", icon: "👨‍🍳" },
    { name: "Sala da Pranzo", value: "dining", icon: "🍽️" },
    { name: "Area Relax", value: "lounge", icon: "🏖️" },
    { name: "Palestra", value: "gym", icon: "💪" },
    { name: "Spa & Wellness", value: "spa", icon: "🧘" },
    { name: "Ufficio", value: "office", icon: "💼" },
    { name: "Cinema", value: "cinema", icon: "🎬" },
  ];

  const updateConfiguration = (field: string, value: any) => {
    const newConfig = { ...configuration, [field]: value };
    onConfigChange(newConfig);
    toast.success(`Configurazione aggiornata: ${field}`);
  };

  const addModule = (moduleValue: string) => {
    if (!configuration.modules.includes(moduleValue)) {
      const newModules = [...configuration.modules, moduleValue];
      updateConfiguration("modules", newModules);
    }
  };

  const removeModule = (moduleValue: string) => {
    const newModules = configuration.modules.filter(m => m !== moduleValue);
    updateConfiguration("modules", newModules);
  };

  const saveConfiguration = () => {
    // Save to localStorage or send to backend
    localStorage.setItem("yachtConfig", JSON.stringify(configuration));
    toast.success("Configurazione salvata con successo!");
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Palette className="h-5 w-5 text-ocean-deep" />
          <span>Configurazione Yacht</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mx-4">
            <TabsTrigger value="hull" className="text-xs">Scafo</TabsTrigger>
            <TabsTrigger value="deck" className="text-xs">Ponte</TabsTrigger>
            <TabsTrigger value="interior" className="text-xs">Interni</TabsTrigger>
            <TabsTrigger value="modules" className="text-xs">Moduli</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-200px)] px-4">
            <TabsContent value="hull" className="mt-4">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Waves className="h-4 w-4 mr-2" />
                  Colore Scafo
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {hullColors.map((color) => (
                    <Button
                      key={color.value}
                      variant={configuration.hullColor === color.value ? "default" : "outline"}
                      className="h-auto p-3 flex flex-col items-center space-y-2"
                      onClick={() => updateConfiguration("hullColor", color.value)}
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color.color }}
                      />
                      <span className="text-xs text-center">{color.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deck" className="mt-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Materiale Ponte</h3>
                <div className="space-y-3">
                  {deckMaterials.map((material) => (
                    <Card
                      key={material.value}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        configuration.deckMaterial === material.value
                          ? "ring-2 ring-ocean-deep bg-ocean-light/10"
                          : ""
                      }`}
                      onClick={() => updateConfiguration("deckMaterial", material.value)}
                    >
                      <CardContent className="p-3">
                        <div className="font-medium">{material.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {material.description}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interior" className="mt-4">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Stile Interni
                </h3>
                <div className="space-y-3">
                  {interiorStyles.map((style) => (
                    <Card
                      key={style.value}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        configuration.interiorStyle === style.value
                          ? "ring-2 ring-ocean-deep bg-ocean-light/10"
                          : ""
                      }`}
                      onClick={() => updateConfiguration("interiorStyle", style.value)}
                    >
                      <CardContent className="p-3">
                        <div className="font-medium">{style.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {style.description}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="modules" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Moduli Interni</h3>
                  <Badge variant="secondary">
                    {configuration.modules.length} selezionati
                  </Badge>
                </div>

                {/* Current Modules */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Moduli Attuali:
                  </h4>
                  {configuration.modules.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">
                      Nessun modulo selezionato
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {configuration.modules.map((moduleValue) => {
                        const module = availableModules.find(m => m.value === moduleValue);
                        return (
                          <div
                            key={moduleValue}
                            className="flex items-center justify-between p-2 bg-muted rounded-lg"
                          >
                            <div className="flex items-center space-x-2">
                              <span>{module?.icon}</span>
                              <span className="text-sm">{module?.name}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeModule(moduleValue)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Available Modules */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Moduli Disponibili:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {availableModules
                      .filter(module => !configuration.modules.includes(module.value))
                      .map((module) => (
                        <Button
                          key={module.value}
                          variant="outline"
                          className="h-auto p-3 justify-start"
                          onClick={() => addModule(module.value)}
                        >
                          <span className="mr-2">{module.icon}</span>
                          <span className="text-sm">{module.name}</span>
                          <Plus className="h-3 w-3 ml-auto" />
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>

          {/* Save Button */}
          <div className="p-4 border-t">
            <Button
              onClick={saveConfiguration}
              className="w-full bg-ocean-deep hover:bg-ocean-medium"
            >
              <Save className="h-4 w-4 mr-2" />
              Salva Configurazione
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConfigurationPanel;