import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Track Service", href: "/track-service-entry" },
    { label: "FAQ", href: "#faq", onClick: async (e: React.MouseEvent) => {
      e.preventDefault();
      if (window.location.pathname !== '/') {
        await navigate('/');
        setTimeout(() => {
          document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
      }
    }},
    { label: "Book Now", href: "/book-repair", className: "bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between pl-0">
          <Link to="/" className="block">
            <img 
              src="/logo/LOGO.png" 
              alt="FIXO" 
              className="h-12"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={item.onClick}
                className={`text-gray-800 text-bold text-l transition-colors ${item.className || ''}`}
              >
                {item.label}
              </Link>
            ))}
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
                    className={`text-lg text-gray-600 hover:text-primary transition-colors ${item.className || ''}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};