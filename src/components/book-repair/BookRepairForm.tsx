import { motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useToast } from "@/components/ui/use-toast";
import { DeviceDetails } from "./DeviceDetails";
import { Plus, Trash2 } from "lucide-react";

const deviceSchema = z.object({
  deviceType: z.enum(["laptop", "mobile", "ipad"]),
  deviceName: z.string().min(2, "Please enter your device name"),
  deviceModel: z.string().min(2, "Please enter your device model"),
  problem: z.string().min(20, "Please describe the problem in detail"),
});

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(10, "Please enter a valid mobile number"),
  address: z.string().min(10, "Please enter your complete address"),
  devices: z.array(deviceSchema).min(1, "Add at least one device"),
});

export const BookRepairForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      address: "",
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Repair Request Submitted!",
      description: "We'll contact you shortly to confirm your booking.",
    });
    form.reset();
  };

  return (
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

          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="relative space-y-6 p-6 border rounded-lg"
            >
              <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium"> {index === 0 ? "Device" : `Device ${index + 1}`} </h3>
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
            transition={{ delay: 0.6 }}
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
  );
};