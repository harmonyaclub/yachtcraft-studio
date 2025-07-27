import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Eye, Heart, Download, Filter } from "lucide-react";
import { toast } from "sonner";

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const yachtDesigns = [
    {
      id: 1,
      name: "Ocean Explorer",
      category: "expedition",
      length: "65m",
      style: "modern",
      image: "/api/placeholder/400/300",
      description: "Yacht esplorativo per lunghe navigazioni",
      likes: 124,
      downloads: 45,
    },
    {
      id: 2,
      name: "Luxury Pearl",
      category: "luxury",
      length: "80m",
      style: "classic",
      image: "/api/placeholder/400/300",
      description: "Eleganza classica per il massimo comfort",
      likes: 256,
      downloads: 78,
    },
    {
      id: 3,
      name: "Speed Demon",
      category: "sport",
      length: "45m",
      style: "contemporary",
      image: "/api/placeholder/400/300",
      description: "Yacht sportivo ad alte prestazioni",
      likes: 189,
      downloads: 62,
    },
    {
      id: 4,
      name: "Family Cruiser",
      category: "family",
      length: "55m",
      style: "modern",
      image: "/api/placeholder/400/300",
      description: "Perfetto per vacanze in famiglia",
      likes: 145,
      downloads: 33,
    },
    {
      id: 5,
      name: "Eco Voyager",
      category: "eco",
      length: "70m",
      style: "contemporary",
      image: "/api/placeholder/400/300",
      description: "Yacht eco-sostenibile del futuro",
      likes: 203,
      downloads: 89,
    },
    {
      id: 6,
      name: "Royal Majesty",
      category: "luxury",
      length: "120m",
      style: "classic",
      image: "/api/placeholder/400/300",
      description: "Il massimo del lusso e dell'eleganza",
      likes: 412,
      downloads: 156,
    },
  ];

  const categories = [
    { value: "all", label: "Tutti", count: yachtDesigns.length },
    { value: "luxury", label: "Lusso", count: yachtDesigns.filter(y => y.category === "luxury").length },
    { value: "sport", label: "Sport", count: yachtDesigns.filter(y => y.category === "sport").length },
    { value: "expedition", label: "Esplorazione", count: yachtDesigns.filter(y => y.category === "expedition").length },
    { value: "family", label: "Famiglia", count: yachtDesigns.filter(y => y.category === "family").length },
    { value: "eco", label: "Eco", count: yachtDesigns.filter(y => y.category === "eco").length },
  ];

  const filteredDesigns = yachtDesigns.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || design.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (designId: number) => {
    toast.success("Aggiunto ai preferiti!");
  };

  const handleDownload = (designId: number) => {
    toast.success("Download avviato!");
  };

  const handleView = (designId: number) => {
    toast.info("Apertura vista 3D...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-ocean-deep mb-4">
            Galleria Design Yacht
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Esplora la nostra collezione di design yacht personalizzabili. 
            Trova l'ispirazione perfetta per il tuo progetto.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca yacht per nome o descrizione..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value} className="text-xs">
                  {category.label} ({category.count})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Trovati {filteredDesigns.length} design
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDesigns.map((design) => (
            <Card key={design.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-48 bg-gradient-to-r from-ocean-light to-ocean-medium flex items-center justify-center">
                    <span className="text-pearl text-lg font-semibold">
                      {design.name}
                    </span>
                  </div>
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleView(design.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleLike(design.id)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleDownload(design.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{design.name}</h3>
                    <Badge variant="secondary">{design.length}</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {design.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {design.likes}
                      </span>
                      <span className="flex items-center">
                        <Download className="h-3 w-3 mr-1" />
                        {design.downloads}
                      </span>
                    </div>
                    
                    <Badge variant="outline" className="capitalize">
                      {design.style}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDesigns.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nessun design trovato</h3>
            <p className="text-muted-foreground">
              Prova a modificare i filtri o la ricerca per trovare quello che cerchi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;