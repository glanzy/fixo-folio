import { motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DeviceDetails } from "./DeviceDetails";
import { ClipboardIcon, Plus, Trash2 } from "lucide-react";
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
import { useState } from "react";
import { supabase } from "@/supabaseClient";

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

export const BookRepairForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [serviceId, setServiceId] = useState("");

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
      console.log("Form values:", values);
      const newServiceId = generateServiceId();
      
      // Insert customer information
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

      if (customerError) throw customerError;

      // Insert device information
      const devicesData = values.devices.map(device => ({
        service_id: newServiceId,
        device_type: device.deviceType,
        device_name: device.deviceName,
        device_model: device.deviceModel,
        problem_description: device.problem,
      }));

      const { error: deviceError } = await supabase
        .from('devices')
        .insert(devicesData);

      if (deviceError) throw deviceError;

      // Create initial service tracking entry
      const { error: trackingError } = await supabase
        .from('service_tracking')
        .insert({
          service_id: newServiceId,
          status: 'pickup',
          notes: 'Service request created',
        });

      if (trackingError) throw trackingError;

      setServiceId(newServiceId);
      setShowConfirmation(true);
      
      toast({
        title: "Success!",
        description: "Your repair request has been submitted successfully.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your repair request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);
    navigate("/");
  };

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  // ... keep existing code (form JSX)

  return (
    <>
      <div className="md:w-3/4 p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number (To which we can contact)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Date</FormLabel>
                    <FormControl>
                      <Input type="date" min={minDate} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
<FormField
  control={form.control}
  name="preferredTime"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Preferred Time Slot</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-wrap "
        >
          {timeSlots.map((slot) => (
            <FormItem
              key={slot}
              className="flex items-center space-x-2 border rounded-md p-2 w-36 hover:bg-gray-50 transition-colors"
            >
              <FormControl>
                <RadioGroupItem value={slot} className="mr-2" />
              </FormControl>
              <FormLabel className="font-normal flex-grow cursor-pointer">
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
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
                <Plus className="mr-2 h-4 w-4" /> Add Another Device
              </Button>

              <Button type="submit" className="w-full">
                Submit Repair Request
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Repair Request Submitted Successfully!</AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-2">
              <p>Thank you for submitting your repair request. We will reach out to you soon.</p>
              <div className="flex items-center justify-center space-x-2">
                <p className="font-semibold text-primary">Your Service ID: {serviceId}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(serviceId);
                    toast({
                      description: "Service ID copied to clipboard",
                    });
                  }}
                  className="text-sm text-primary hover:text-secondary"
                >
                  <ClipboardIcon className="h-5 w-5 text-primary cursor-pointer" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">Please save this ID for future reference.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleConfirmation} className="w-full">
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
