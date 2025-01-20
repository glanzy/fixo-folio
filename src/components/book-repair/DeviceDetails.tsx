import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Laptop, Laptop2, Smartphone, Tablet } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";

interface DeviceDetailsProps {
  form: UseFormReturn<any>;
  index: number;
}

export const DeviceDetails = ({ form, index }: DeviceDetailsProps) => {
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
                className="flex gap-4 flex-wrap"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex-1"
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="laptop" id={`laptop-${index}`} />
                    <label htmlFor={`laptop-${index}`} className="flex items-center gap-2 cursor-pointer">
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
                    <RadioGroupItem value="mobile" id={`mobile-${index}`} />
                    <label htmlFor={`mobile-${index}`} className="flex items-center gap-2 cursor-pointer">
                      <Smartphone className="w-5 h-5" />
                      Android
                    </label>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex-1"
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="ipad" id={`ipad-${index}`} />
                    <label htmlFor={`ipad-${index}`} className="flex items-center gap-2 cursor-pointer">
                      <Tablet className="w-5 h-5" />
                      iPad
                    </label>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex-1"
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="iphone" id={`iphone-${index}`} />
                    <label htmlFor={`iphone-${index}`} className="flex items-center gap-2 cursor-pointer">
                      <Smartphone className="w-5 h-5" />
                      iPhone
                    </label>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex-1"
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="macbook" id={`macbook-${index}`} />
                    <label htmlFor={`macbook-${index}`} className="flex items-center gap-2 cursor-pointer">
                      <Laptop2 className="w-5 h-5" />
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
              <FormControl>
                <Input 
                  placeholder={deviceType === 'laptop' 
                    ? 'Asus / HP / Lenovo etc.' 
                    : 'Samsung / Redmi / Oppo etc.'} 
                  {...field} 
                />
              </FormControl>
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
