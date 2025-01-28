import { motion } from "framer-motion";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { ArrowLeft, ClipboardIcon, Plus, Trash2, Laptop, Laptop2, Smartphone, Tablet, User, Phone, FileText, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/supabaseClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const deviceSchema = z.object({
  deviceType: z.enum(["laptop", "mobile", "ipad", "iphone", "macbook"]),
  deviceName: z.string().optional(),
  deviceModel: z.string().min(1, "Please enter your device model"),
  problem: z.string().min(1, "Please describe the problem in detail"),
});

const formSchema = z.object({
  name: z.string().min(1, "Name must be at least 2 characters"),
  mobile: z.string().min(10, "Please enter a valid mobile number"),
  address: z.string().min(1, "Please enter your complete address"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  devices: z.array(deviceSchema).min(1, "Add at least one device"),
});

const timeSlots = ["11:00 AM", "03:00 PM", "06:00 PM"];
const laptopBrands = ["Asus", "HP", "Lenovo", "Dell", "Acer", "MSI", "Samsung"];
const androidBrands = ["Samsung", "OnePlus", "Xiaomi", "Oppo", "Vivo", "Realme", "Nothing", "Motorola", "Google", "Honor", "Poco", "Asus", "Infinix", "Techno", "Iqoo", "Huawei", "CMF"];

const DeviceDetails = ({ form, index }: { form: UseFormReturn<any>; index: number }) => {
  const deviceType = form.watch(`devices.${index}.deviceType`);
  const isAppleDevice = ["iphone", "ipad", "macbook"].includes(deviceType);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={`devices.${index}.deviceType`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Device Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center">
                  <div className="flex items-center space-x-2 p-2 sm:p-3 border rounded-md cursor-pointer hover:bg-secondary/50 transition-colors w-32 sm:w-36">
                    <RadioGroupItem value="laptop" id={`laptop-${index}`} />
                    <label htmlFor={`laptop-${index}`} className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm">
                      <Laptop className="w-4 h-4 sm:w-5 sm:h-5" />
                      Laptop
                    </label>
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center">
                  <div className="flex items-center space-x-2 p-2 sm:p-3 border rounded-md cursor-pointer hover:bg-secondary/50 transition-colors w-32 sm:w-36">
                    <RadioGroupItem value="mobile" id={`mobile-${index}`} />
                    <label htmlFor={`mobile-${index}`} className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm">
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                      Android
                    </label>
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center">
                  <div className="flex items-center space-x-2 p-2 sm:p-3 border rounded-md cursor-pointer hover:bg-secondary/50 transition-colors w-32 sm:w-36">
                    <RadioGroupItem value="ipad" id={`ipad-${index}`} />
                    <label htmlFor={`ipad-${index}`} className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm">
                      <Tablet className="w-4 h-4 sm:w-5 sm:h-5" />
                      iPad
                    </label>
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center">
                  <div className="flex items-center space-x-2 p-2 sm:p-3 border rounded-md cursor-pointer hover:bg-secondary/50 transition-colors w-32 sm:w-36">
                    <RadioGroupItem value="iphone" id={`iphone-${index}`} />
                    <label htmlFor={`iphone-${index}`} className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm">
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                      iPhone
                    </label>
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center">
                  <div className="flex items-center space-x-2 p-2 sm:p-3 border rounded-md cursor-pointer hover:bg-secondary/50 transition-colors w-32 sm:w-36">
                    <RadioGroupItem value="macbook" id={`macbook-${index}`} />
                    <label htmlFor={`macbook-${index}`} className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm">
                      <Laptop2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      Macbook
                    </label>
                  </div>
                </motion.div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {!isAppleDevice && (
        <FormField
          control={form.control}
          name={`devices.${index}.deviceName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={deviceType === 'laptop' ? 'Select Laptop Brand' : 'Select Phone Brand'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(deviceType === 'laptop' ? laptopBrands : androidBrands).map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name={`devices.${index}.deviceModel`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Device Model</FormLabel>
            <FormControl>
              <Input 
                placeholder={deviceType === 'laptop' 
                  ? 'F15 / Ideapad etc.' 
                  : deviceType === 'ipad' 
                  ? 'iPad Pro 13 / iPad Air / iPad Mini etc.' 
                  : deviceType === 'iphone'
                  ? 'iPhone 15 / iPhone 14 Pro etc.'
                  : deviceType === 'macbook'
                  ? 'Macbook Air / Macbook Pro etc.'
                  : 'S22 / Note 10 etc.'} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const FormSection = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center space-x-4"
    >
      <div className="p-3 bg-white/10 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm opacity-75">{description}</p>
      </div>
    </motion.div>
  );
};

const BookRepair = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      address: "",
      preferredDate: "",
      preferredTime: "",
      devices: [
        {
          deviceType: "laptop",
          deviceName: "",
          deviceModel: "",
          problem: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "devices",
  });

  const generateServiceId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `SRV${timestamp}${random}`;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const newServiceId = generateServiceId();
      
      // Step 1: Insert customer information
      const { error: customerError } = await supabase
        .from('customers')
        .insert({
          service_id: newServiceId,
          name: values.name,
          mobile: values.mobile,
          address: values.address,
          preferred_date: values.preferredDate,
          preferred_time: values.preferredTime,
        });

      if (customerError) throw new Error(`Customer insertion failed: ${customerError.message}`);

      // Step 2: Insert devices
      const devicesToInsert = values.devices.map(device => ({
        service_id: newServiceId,
        device_type: device.deviceType,
        device_name: device.deviceName || null,
        device_model: device.deviceModel,
        problem_description: device.problem,
      }));

      const { error: deviceError } = await supabase
        .from('devices')
        .insert(devicesToInsert);

      if (deviceError) throw new Error(`Device insertion failed: ${deviceError.message}`);

      // Step 3: Create initial billing entry
      const { error: billingError } = await supabase
        .from('billing')
        .insert({
          service_id: newServiceId,
          subtotal: 0, // Initial values, to be updated later
          iitm: 0,
          total: 0,
          status: 'pending',
          payment_method: null,
          payment_date: null
        });

      if (billingError) throw new Error(`Billing insertion failed: ${billingError.message}`);

      // Step 4: Create tracking entry
      const { error: trackingError } = await supabase
        .from('service_tracking')
        .insert({
          service_id: newServiceId,
          status: 'pickup',
          notes: 'Service request created',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (trackingError) throw new Error(`Tracking insertion failed: ${trackingError.message}`);

      setServiceId(newServiceId);
      setShowConfirmation(true);
      
      toast({
        title: "Success!",
        description: `Your repair request has been submitted successfully. Service ID: ${newServiceId}`,
      });

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was an error submitting your repair request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);
    navigate("/");
  };

  const copyServiceId = async () => {
    try {
      await navigator.clipboard.writeText(serviceId);
      setCopySuccess(true);
      toast({
        title: "Copied!",
        description: "Service ID copied to clipboard",
      });
      // Reset the success state after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 4000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying manually",
        variant: "destructive",
      });
    }
  };

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <Button 
          variant="ghost" 
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 border"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      </div>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="md:flex">
            <div className="relative md:w-1/2 bg-primary p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Book Your Repair</h2>
              <p className="mb-8">Get your device fixed by our expert technicians</p>
              
              <div className="space-y-6 mb-8">
                <FormSection
                  icon={<User className="w-6 h-6" />}
                  title="Personal Details"
                  description="We'll keep your information secure"
                />

                <FormSection
                  icon={<Phone className="w-6 h-6" />}
                  title="Contact Information"
                  description="To keep you updated about repairs"
                />

                <FormSection
                  icon={<FileText className="w-6 h-6" />}
                  title="Device Details"
                  description="Tell us about your device"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="h-64 mt-8 hidden md:block"
              >
                <img
                  src="/lovable-uploads/Fixoman.png"
                  alt="FIXO Technician"
                  className="absolute bottom-0 left-0 h-128 object-contain"
                />
              </motion.div>
            </div>
            <div className="md:w-3/4 p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
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
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
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
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
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
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Date</FormLabel>
                          <FormControl>
                            <Input type="date" min={minDate} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Time Slot</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-wrap gap-4"
                            >
                              {timeSlots.map((slot) => (
                                <FormItem
                                  key={slot}
                                  className="flex items-center space-x-2 border rounded-md p-2 w-36 hover:bg-gray-50 transition-colors"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={slot} />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {slot}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  {fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="relative space-y-6 p-6 border rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">
                          {index === 0 ? "Device" : `Device ${index + 1}`}
                        </h3>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <DeviceDetails form={form} index={index} />
                      <FormField
                        control={form.control}
                        name={`devices.${index}.problem`}
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
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="space-y-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        append({
                          deviceType: "laptop",
                          deviceName: "",
                          deviceModel: "",
                          problem: "",
                        })
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Device
                    </Button>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Repair Request"}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </div>

          </div>
        </motion.div>
      </div>
      <AlertDialog open={showConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Booking Confirmed!</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>Your repair request has been submitted successfully.</p>
              <div className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
                <span>Service ID: {serviceId}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 transition-colors ${
                    copySuccess ? "bg-green-500 text-white hover:bg-green-600" : ""
                  }`}
                  onClick={copyServiceId}
                >
                  {copySuccess ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <ClipboardIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Please save this Service ID for future reference.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleConfirmation}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookRepair;