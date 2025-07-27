import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import YachtViewer3D from "@/components/YachtViewer3D";
import ConfigurationPanel from "@/components/ConfigurationPanel";
import Navbar from "@/components/Navbar";

const Configurator = () => {
  const [configuration, setConfiguration] = useState({
    hullColor: "#F8F8FF",
    deckMaterial: "teak",
    interiorStyle: "modern",
    modules: ["master-cabin", "main-salon", "galley"],
  });

  const handleConfigChange = (newConfig: typeof configuration) => {
    setConfiguration(newConfig);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* 3D Viewer */}
          <ResizablePanel defaultSize={75} minSize={50}>
            <div className="h-full">
              <YachtViewer3D 
                configuration={configuration}
                onConfigChange={handleConfigChange}
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Configuration Panel */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <div className="h-full border-l">
              <ConfigurationPanel 
                configuration={configuration}
                onConfigChange={handleConfigChange}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Configurator;