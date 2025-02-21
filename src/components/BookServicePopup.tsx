import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

export const BookServicePopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Ensure the popup shows on the home page after a delay regardless of previous visits
    if (location.pathname === '/') {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleBookNow = () => {
    navigate("/book-repair");
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <button 
          onClick={() => setOpen(false)} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-primary">
            Ready to Fix Your Device?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            Book a repair service now and get your device fixed by our expert technicians!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleBookNow} className="bg-primary">
            Book Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
