import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Laptop, Smartphone, User, Phone, MapPin, FileText } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(10, "Please enter a valid mobile number"),
  address: z.string().min(10, "Please enter your complete address"),
  deviceType: z.enum(["laptop", "mobile"]),
  problem: z.string().min(20, "Please describe the problem in detail"),
});

const BookRepair = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      address: "",
      deviceType: "laptop",
      problem: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Repair Request Submitted!",
      description: "We'll contact you shortly to confirm your booking.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/2 bg-primary p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Book Your Repair</h2>
              <p className="mb-8">Get your device fixed by our expert technicians</p>
              
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4"
                >
                  <div className="p-3 bg-white/10 rounded-lg">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Personal Details</h3>
                    <p className="text-sm opacity-75">We'll keep your information secure</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4"
                >
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Contact Information</h3>
                    <p className="text-sm opacity-75">To keep you updated about repairs</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4"
                >
                  <div className="p-3 bg-white/10 rounded-lg">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Device Details</h3>
                    <p className="text-sm opacity-75">Tell us about your device</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your mobile number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Device Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="laptop" id="laptop" />
                              <label htmlFor="laptop" className="flex items-center gap-2 cursor-pointer">
                                <Laptop className="w-5 h-5" />
                                Laptop
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="mobile" id="mobile" />
                              <label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer">
                                <Smartphone className="w-5 h-5" />
                                Mobile
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="problem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe the Problem</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe the issue you're facing with your device"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Submit Repair Request
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookRepair;