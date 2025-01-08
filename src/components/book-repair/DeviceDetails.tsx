import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";

interface DeviceDetailsProps {
  form: UseFormReturn<any>;
}

export const DeviceDetails = ({ form }: DeviceDetailsProps) => {
  return (
    <div className="space-y-4">
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
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex-1"
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="laptop" id="laptop" />
                    <label htmlFor="laptop" className="flex items-center gap-2 cursor-pointer">
                      <Laptop className="w-5 h-5" />
                      Laptop
                    </label>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex-1"
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer">
                      <Smartphone className="w-5 h-5" />
                      Mobile
                    </label>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex-1"
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="ipad" id="ipad" />
                    <label htmlFor="ipad" className="flex items-center gap-2 cursor-pointer">
                      <Tablet className="w-5 h-5" />
                      iPad/Tablet
                    </label>
                  </div>
                </motion.div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      
      {/* BRAND NAME */}
      <FormField
        control={form.control}
        name="deviceName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand Name</FormLabel>
            <FormControl>
              <Input 
                placeholder={`${form.watch('deviceType') === 'laptop' 
                  ? 'Apple / Asus / HP / Lenovo etc.' 
                  : form.watch('deviceType') === 'ipad' 
                  ? 'Apple / Samsung / Lenovo / Microsoft etc.' 
                  : 'Apple / Samsung / Redmi / Oppo etc.'}`} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* DEVICE MODEL */}
      <FormField
        control={form.control}
        name="deviceModel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Device Model</FormLabel>
            <FormControl>
              <Input 
                placeholder={`${form.watch('deviceType') === 'laptop' 
                  ? 'Macbook Air / F15 / Ideapad etc.' 
                  : form.watch('deviceType') === 'ipad' 
                  ? 'iPad Pro 13 / Galaxy Tab S10 / Pad 6 etc.' 
                  : 'iPhone 15 / S22 / Note 10 etc.'}`} 
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