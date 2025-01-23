import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const BookServicePopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleBookNow = () => {
    navigate("/book-repair");
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-primary">
            Ready to Fix Your Device?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            Book a repair service now and get your device fixed by our expert technicians!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction onClick={handleBookNow} className="bg-primary w-full">
          Book Now
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};