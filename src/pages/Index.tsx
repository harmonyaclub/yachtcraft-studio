// Update this page (the content is just a fallback if you fail to update the page)

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Anchor, Palette, Headset, Image } from "lucide-react";
import yachtHero from "@/assets/yacht-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${yachtHero})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-pearl max-w-4xl mx-auto px-4">
          <Anchor className="h-16 w-16 mx-auto mb-6 text-champagne" />
          <h1 className="text-6xl font-bold mb-6">YachtCraft</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Progetta e personalizza il yacht dei tuoi sogni con il nostro configuratore 3D avanzato. 
            Materiali premium, design su misura e esperienza VR immersiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/configurator">
              <Button size="lg" className="bg-ocean-deep hover:bg-ocean-medium text-lg px-8">
                <Palette className="h-5 w-5 mr-2" />
                Inizia Progetto
              </Button>
            </Link>
            <Link to="/vr-view">
              <Button size="lg" variant="outline" className="text-lg px-8 border-pearl text-pearl hover:bg-pearl hover:text-foreground">
                <Headset className="h-5 w-5 mr-2" />
                Esperienza VR
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ocean-deep mb-4">
              Il Futuro del Design Nautico
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tecnologie all'avanguardia per creare yacht unici e personalizzati
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Palette className="h-12 w-12 text-ocean-deep mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Configuratore 3D</h3>
              <p className="text-muted-foreground">
                Personalizza ogni dettaglio con il nostro editor 3D interattivo
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Headset className="h-12 w-12 text-ocean-deep mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Realtà Virtuale</h3>
              <p className="text-muted-foreground">
                Esplora il tuo yacht in VR prima della costruzione
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Image className="h-12 w-12 text-ocean-deep mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Materiali Premium</h3>
              <p className="text-muted-foreground">
                Catalogo completo di materiali di lusso e sostenibili
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
