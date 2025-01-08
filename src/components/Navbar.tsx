// Navbar component - Linked the first page, rest are left as it is


import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Track Service", href: "/track-service" },
    { label: "About Us", href: "/about-us" },
    
    { label: "FAQ", href: "#faq",  onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      if (window.location.pathname !== '/') {
        navigate('/', { replace: true });
      } else {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
      }}
      },
      
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            FIXO
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={item.onClick}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button onClick={() => window.location.href = "/book-repair"}>Book Now</Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={item.onClick}
                    className="text-lg text-gray-600 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button className="w-full">Book Now</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};