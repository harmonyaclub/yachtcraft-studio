import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Anchor } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/configurator", label: "Configuratore" },
    { href: "/gallery", label: "Galleria" },
    { href: "/materials", label: "Materiali" },
    { href: "/vr-view", label: "Vista VR" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Anchor className="h-8 w-8 text-ocean-deep" />
          <span className="text-xl font-bold text-ocean-deep">YachtCraft</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-ocean-medium ${
                isActive(item.href)
                  ? "text-ocean-deep border-b-2 border-ocean-deep"
                  : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="default" className="bg-ocean-deep hover:bg-ocean-medium">
            Inizia Progetto
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-ocean-medium ${
                    isActive(item.href) ? "text-ocean-deep" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="bg-ocean-deep hover:bg-ocean-medium mt-4">
                Inizia Progetto
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;