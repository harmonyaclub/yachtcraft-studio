import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Palette, 
  Layers, 
  Sparkles, 
  Droplets, 
  Shield, 
  Leaf,
  Search,
  Filter,
  Star
} from "lucide-react";
import { toast } from "sonner";

const Materials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const materials = [
    {
      id: 1,
      name: "Teak Birmano Premium",
      category: "wood",
      type: "Ponte",
      price: 850,
      description: "Teak naturale di alta qualità, resistente all'acqua salata",
      properties: ["Resistente", "Naturale", "Premium"],
      sustainability: 4,
      durability: 5,
      maintenance: 3,
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      name: "Fibra di Carbonio Ultra",
      category: "composite",
      type: "Struttura",
      price: 1200,
      description: "Materiale composito ultraleggero e resistente",
      properties: ["Ultraleggero", "Resistente", "Moderno"],
      sustainability: 3,
      durability: 5,
      maintenance: 5,
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      name: "Pelle Italiana Luxury",
      category: "fabric",
      type: "Interno",
      price: 650,
      description: "Pelle italiana di prima qualità per interni lussuosi",
      properties: ["Lusso", "Comfort", "Elegante"],
      sustainability: 2,
      durability: 4,
      maintenance: 3,
      image: "/api/placeholder/300/200",
    },
    {
      id: 4,
      name: "Acciaio Inossidabile 316L",
      category: "metal",
      type: "Hardware",
      price: 320,
      description: "Acciaio marino di grado superiore, anticorrosione",
      properties: ["Anticorrosione", "Durevole", "Professionale"],
      sustainability: 4,
      durability: 5,
      maintenance: 5,
      image: "/api/placeholder/300/200",
    },
    {
      id: 5,
      name: "Tessuto Outdoor Premium",
      category: "fabric",
      type: "Esterno",
      price: 280,
      description: "Tessuto tecnico per esterni, UV resistente",
      properties: ["UV Resistente", "Impermeabile", "Tecnico"],
      sustainability: 4,
      durability: 4,
      maintenance: 4,
      image: "/api/placeholder/300/200",
    },
    {
      id: 6,
      name: "Marmo Calacatta Gold",
      category: "stone",
      type: "Interno",
      price: 950,
      description: "Marmo pregiato per superfici interne di lusso",
      properties: ["Lusso", "Elegante", "Naturale"],
      sustainability: 3,
      durability: 4,
      maintenance: 2,
      image: "/api/placeholder/300/200",
    },
    {
      id: 7,
      name: "Bamboo Ecosostenibile",
      category: "eco",
      type: "Ponte",
      price: 450,
      description: "Alternativa ecologica al teak tradizionale",
      properties: ["Ecologico", "Sostenibile", "Innovativo"],
      sustainability: 5,
      durability: 4,
      maintenance: 3,
      image: "/api/placeholder/300/200",
    },
    {
      id: 8,
      name: "Titanio Aeronautico",
      category: "metal",
      type: "Struttura",
      price: 1800,
      description: "Titanio di grado aeronautico per prestazioni estreme",
      properties: ["Ultraleggero", "Resistente", "Aerospace"],
      sustainability: 3,
      durability: 5,
      maintenance: 5,
      image: "/api/placeholder/300/200",
    },
  ];

  const categories = [
    { value: "all", label: "Tutti", icon: Layers },
    { value: "wood", label: "Legno", icon: Leaf },
    { value: "metal", label: "Metallo", icon: Shield },
    { value: "composite", label: "Composito", icon: Sparkles },
    { value: "fabric", label: "Tessuto", icon: Palette },
    { value: "stone", label: "Pietra", icon: Layers },
    { value: "eco", label: "Eco", icon: Leaf },
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || material.category === selectedCategory;
    const matchesPrice = material.price >= priceRange[0] && material.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const toggleFavorite = (materialId: number) => {
    setFavorites(prev => 
      prev.includes(materialId) 
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    );
  };

  const addToProject = (materialId: number) => {
    toast.success("Materiale aggiunto al progetto!");
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < rating ? 'text-luxury fill-current' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-ocean-deep mb-4">
            Catalogo Materiali Premium
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seleziona i migliori materiali per il tuo yacht personalizzato. 
            Qualità, sostenibilità e design in perfetta armonia.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca materiali..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-7">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger key={category.value} value={category.value} className="text-xs">
                      <Icon className="h-3 w-3 mr-1" />
                      {category.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Fascia di Prezzo: €{priceRange[0]} - €{priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={2000}
                min={0}
                step={50}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground">
            {filteredMaterials.length} materiali trovati
          </p>
          <Button variant="outline" size="sm">
            <Star className="h-4 w-4 mr-2" />
            Mostra Preferiti ({favorites.length})
          </Button>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-48 bg-gradient-to-r from-muted to-muted-foreground/20 flex items-center justify-center">
                    <span className="text-foreground text-lg font-semibold text-center p-4">
                      {material.name}
                    </span>
                  </div>
                  
                  {/* Favorite Button */}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => toggleFavorite(material.id)}
                  >
                    <Star className={`h-4 w-4 ${favorites.includes(material.id) ? 'text-luxury fill-current' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{material.name}</h3>
                    <Badge variant="secondary">{material.type}</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {material.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {material.properties.map((prop, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {prop}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Ratings */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sostenibilità:</span>
                    <div className="flex">{getRatingStars(material.sustainability)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Durata:</span>
                    <div className="flex">{getRatingStars(material.durability)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Manutenzione:</span>
                    <div className="flex">{getRatingStars(material.maintenance)}</div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-lg font-semibold text-ocean-deep">
                    €{material.price}/m²
                  </span>
                  <Button 
                    size="sm"
                    onClick={() => addToProject(material.id)}
                    className="bg-ocean-deep hover:bg-ocean-medium"
                  >
                    Aggiungi
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <Layers className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nessun materiale trovato</h3>
            <p className="text-muted-foreground">
              Prova a modificare i filtri per trovare i materiali che cerchi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Materials;