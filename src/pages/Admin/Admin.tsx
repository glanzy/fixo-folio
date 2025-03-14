import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface RepairBooking {
  service_id: string;
  customer_name: string;
  mobile: string;
  device_type: string;
  status: string;
  created_at: string;
  preferred_date: string;
  preferred_time: string;
  vendor_assigned: string | null;
  subtotal: number | null;
  iitm: number | null;
  total: number | null;
  payment_status: "paid" | "unpaid";
  payment_method: string | null;
  payment_date: string | null; 
  warranty_days: string | null; // Changed from number to string
}

interface DetailedBooking extends RepairBooking {
  address: string;
  devices: {
    device_type: string;
    device_name: string | null;
    device_model: string;
    problem_description: string;
  }[];
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<RepairBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] =
    useState<DetailedBooking | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [tempBilling, setTempBilling] = useState({
    subtotal: 0,
    iitm: 0,
    total: 0,
    status: "unpaid",
    payment_method: "",
    payment_date: "", 
    warranty_days: "", // Changed from 0 to empty string
  });
  const [savingPrice, setSavingPrice] = useState(false);
  const [editPaymentMethod, setEditPaymentMethod] = useState(false);
  const [editVendor, setEditVendor] = useState(false);
  const [editPaymentDate, setEditPaymentDate] = useState(false);  // Add this line
  const [editWarranty, setEditWarranty] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (username === adminUsername && password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // First, let's check if we can connect to Supabase 
      const { data: testConnection, error: connectionError } = await supabase
        .from("customers")
        .select("count")
        .single();

      if (connectionError) {
        console.error("Connection test error:", connectionError);
        toast.error("Database connection failed");
        return;
      }

      // Fetch customers
      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .select("*");

      if (customerError) {
        console.error("Customer fetch error:", customerError);
        toast.error("Failed to fetch customer data");
        return;
      }

      console.log("Fetched customers:", customerData); // Debug log

      // Fetch tracking data
      const { data: trackingData, error: trackingError } = await supabase
        .from("service_tracking")
        .select("*");

      if (trackingError) {
        console.error("Tracking fetch error:", trackingError);
        toast.error("Failed to fetch tracking data");
        return;
      }

      console.log("Fetched tracking:", trackingData); // Debug log

      // Fetch devices
      const { data: devicesData, error: deviceError } = await supabase
        .from("devices")
        .select("*");

      if (deviceError) {
        console.error("Device fetch error:", deviceError);
        toast.error("Failed to fetch device data");
        return;
      }

      console.log("Fetched devices:", devicesData); // Debug log

      // Update vendor assignments fetch
      const { data: vendorData, error: vendorError } = await supabase
        .from("vendor_assignments")
        .select("*");

      if (vendorError) {
        console.error("Vendor fetch error:", vendorError);
        toast.error("Failed to fetch vendor data");
        return;
      }

      // Add billing data fetch
      const { data: billingData, error: billingError } = await supabase
        .from("billing")
        .select("*");

      if (billingError) {
        console.error("Billing fetch error:", billingError);
        toast.error("Failed to fetch billing data");
        return;
      }

      // Add warranty data fetch
      const { data: warrantyData, error: warrantyError } = await supabase
        .from("warranties")
        .select("*");

      if (warrantyError) {
        console.error("Warranty fetch error:", warrantyError);
        toast.error("Failed to fetch warranty data");
        return;
      }

      // Combine the data
      const combinedData = customerData
        .map((customer) => ({
          service_id: customer.service_id,
          customer_name: customer.name,
          mobile: customer.mobile,
          created_at: customer.created_at,
          status:
            trackingData.find((t) => t.service_id === customer.service_id)
              ?.status || "pending",
          device_type:
            devicesData.find((d) => d.service_id === customer.service_id)
              ?.device_type || "unknown",
          preferred_date: customer.preferred_date, 
          preferred_time: customer.preferred_time, 
          vendor_assigned:
            vendorData.find((v) => v.service_id === customer.service_id)
              ?.vendor_name || null, 
          subtotal:
            billingData.find((b) => b.service_id === customer.service_id)
              ?.subtotal || null,
          iitm:
            billingData.find((b) => b.service_id === customer.service_id)
              ?.iitm || null,
          total:
            billingData.find((b) => b.service_id === customer.service_id)
              ?.total || null,
          payment_status:
            billingData.find((b) => b.service_id === customer.service_id)
              ?.status || "unpaid",
          payment_method:
            billingData.find((b) => b.service_id === customer.service_id)
              ?.payment_method || null,
          payment_date:
            billingData.find((b) => b.service_id === customer.service_id)?.payment_date || null, 
          warranty_days:
            warrantyData.find((w) => w.service_id === customer.service_id)
              ?.warranty_days || null,
        }))
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

      setBookings(combinedData);
      toast.success("Data fetched successfully");
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

const fetchDetailedBooking = async (serviceId: string) => {
  try {
    const [
      { data: customerData },
      { data: deviceData },
      { data: trackingData },
      { data: billingData },
      { data: vendorData }, // Add this line
      { data: warrantyData },
    ] = await Promise.all([
      supabase
        .from("customers")
        .select("*")
        .eq("service_id", serviceId)
        .single(),
      supabase.from("devices").select("*").eq("service_id", serviceId),
      supabase
        .from("service_tracking")
        .select("*")
        .eq("service_id", serviceId)
        .single(),
      supabase
        .from("billing")
        .select("*")
        .eq("service_id", serviceId)
        .single(),
      supabase  // Add this query
        .from("vendor_assignments")
        .select("*")
        .eq("service_id", serviceId)
        .single(),
      supabase
        .from("warranties")
        .select("*")
        .eq("service_id", serviceId)
        .single(),
    ]);

    if (customerData && deviceData) {
      setSelectedBooking({
        service_id: serviceId,
        customer_name: customerData.name,
        mobile: customerData.mobile,
        address: customerData.address,
        preferred_date: customerData.preferred_date,
        preferred_time: customerData.preferred_time,
        device_type: deviceData[0]?.device_type || "unknown",
        status: trackingData?.status || "pending",
        created_at: customerData.created_at,
        vendor_assigned: vendorData?.vendor_name || null, 
        subtotal: billingData?.subtotal || null,
        iitm: billingData?.iitm || null,
        total: billingData?.total || null,
        payment_status: billingData?.status || "unpaid",
        payment_method: billingData?.payment_method || null,
        payment_date: billingData?.payment_date || null, 
        warranty_days: warrantyData?.warranty_days || null,
        devices: deviceData.map((device) => ({
          device_type: device.device_type,
          device_name: device.device_name,
          device_model: device.device_model,
          problem_description: device.problem_description,
        })),
      });
      setShowDetails(true);
      // Reset editVendor based on whether vendor is assigned
      setEditVendor(!vendorData?.vendor_name);
      // Reset editWarranty based on whether warranty is set
      setEditWarranty(!warrantyData?.warranty_days);
    }
  } catch (error) {
    console.error("Error fetching detailed booking:", error);
    toast.error("Failed to fetch booking details");
  }
};

const handleVendorAssignment = async (serviceId: string, vendor: string) => {
  try {
    const { error } = await supabase
      .from("vendor_assignments")
      .upsert({
        service_id: serviceId,
        vendor_name: vendor,
      }, {
        onConflict: "service_id",
      });

    if (error) throw error;

    // Update local states
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.service_id === serviceId
          ? { ...booking, vendor_assigned: vendor }
          : booking
      )
    );

    setSelectedBooking((prev) => 
      prev ? { ...prev, vendor_assigned: vendor } : null
    );

    setEditVendor(false); // Keep edit mode off after successful assignment
    toast.success("Vendor assigned successfully");
  } catch (error) {
    console.error("Error assigning vendor:", error);
    toast.error("Failed to assign vendor");
  }
};

  const handlePricingUpdate = async (
    serviceId: string,
    field: "subtotal" | "iitm" | "total",
    value: number
  ) => {
    try {
      let newTotal = value;
      const currentBooking = bookings.find((b) => b.service_id === serviceId);

      if (field === "subtotal" || field === "iitm") {
        const subtotal =
          field === "subtotal" ? value : currentBooking?.subtotal || 0;
        const iitm = field === "iitm" ? value : currentBooking?.iitm || 0;
        newTotal = subtotal - iitm;
      }

      // First check if a billing record exists
      const { data: existingBilling } = await supabase
        .from("billing")
        .select("*")
        .eq("service_id", serviceId)
        .single();

      if (!existingBilling) {
        // If no billing record exists, create one
        const { error: insertError } = await supabase.from("billing").insert({
          service_id: serviceId,
          subtotal: field === "subtotal" ? value : 0,
          iitm: field === "iitm" ? value : 0,
          total: newTotal,
          status: "pending",
        });

        if (insertError) throw insertError;
      } else {
        // If billing record exists, update it
        const { error: updateError } = await supabase
          .from("billing")
          .update({
            [field]: value,
            total: newTotal,
          })
          .eq("service_id", serviceId);

        if (updateError) throw updateError;
      }

      // Update local state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.service_id === serviceId
            ? {
                ...booking,
                [field]: value,
                total: newTotal,
              }
            : booking
        )
      );

      if (selectedBooking && selectedBooking.service_id === serviceId) {
        setSelectedBooking((prev) => ({
          ...prev!,
          [field]: value,
          total: newTotal,
        }));
      }

      toast.success("Price updated successfully");
    } catch (error) {
      console.error("Error updating price:", error);
      toast.error("Failed to update price");
    }
  };

  const handleSavePrice = async (serviceId: string) => {
    setSavingPrice(true);
    try {
      const newTotal = tempBilling.subtotal - tempBilling.iitm;

      const billingData = {
        service_id: serviceId,
        subtotal: tempBilling.subtotal,
        iitm: tempBilling.iitm,
        total: newTotal,
        status: tempBilling.status,
        payment_method: tempBilling.payment_method.toUpperCase(),
        payment_date: tempBilling.payment_date || null,
      };

      // Update billing table
      const { data: existingBilling, error: checkError } = await supabase
        .from("billing")
        .select("*")
        .eq("service_id", serviceId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      const { error: billingError } = !existingBilling
        ? await supabase.from("billing").insert(billingData)
        : await supabase.from("billing").update(billingData).eq("service_id", serviceId);

      if (billingError) throw billingError;

      // Also update warranty if value is provided
      if (tempBilling.warranty_days) {
        await handleWarrantyUpdate(serviceId, tempBilling.warranty_days);
      }

      // Update local state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.service_id === serviceId
            ? {
                ...booking,
                subtotal: tempBilling.subtotal,
                iitm: tempBilling.iitm,
                total: newTotal,
                payment_status: tempBilling.status as "paid" | "unpaid",
                payment_method: tempBilling.payment_method,
                payment_date: tempBilling.payment_date,
                warranty_days: tempBilling.warranty_days,
              }
            : booking
        )
      );

      // Update selected booking state
      if (selectedBooking && selectedBooking.service_id === serviceId) {
        setSelectedBooking((prev) => ({
          ...prev!,
          subtotal: tempBilling.subtotal,
          iitm: tempBilling.iitm,
          total: newTotal,
          payment_status: tempBilling.status as "paid" | "unpaid",
          payment_method: tempBilling.payment_method,
          payment_date: tempBilling.payment_date,
          warranty_days: tempBilling.warranty_days,
        }));
      }

      toast.success("Billing details updated successfully");
      setEditPaymentMethod(false);
      setEditPaymentDate(false);  // Add this line
      setEditWarranty(false);
    } catch (error) {
      console.error("Error updating details:", error);
      toast.error("Failed to update billing details");
    } finally {
      setSavingPrice(false);
    }
  };

  const handleStatusUpdate = async (serviceId: string, newStatus: string) => {
    try {
      // First check if a record exists
      const { data: existingTracking, error: checkError } = await supabase
        .from("service_tracking")
        .select("*")
        .eq("service_id", serviceId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      // Update or insert the record
      const { error } = existingTracking
        ? await supabase
            .from("service_tracking")
            .update({ status: newStatus.toLowerCase() })
            .eq("service_id", serviceId)
        : await supabase
            .from("service_tracking")
            .insert({ service_id: serviceId, status: newStatus.toLowerCase() });

      if (error) throw error;

      // Update local state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.service_id === serviceId
            ? { ...booking, status: newStatus.toLowerCase() }
            : booking
        )
      );

      if (selectedBooking && selectedBooking.service_id === serviceId) {
        setSelectedBooking((prev) => ({
          ...prev!,
          status: newStatus.toLowerCase(),
        }));
      }

      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleWarrantyUpdate = async (serviceId: string, warrantyDays: string) => {
    try {
      // Check if warranty record exists
      const { data: existingWarranty } = await supabase
        .from("warranties")
        .select("*")
        .eq("service_id", serviceId)
        .single();

      if (!existingWarranty) {
        // If no warranty record exists, create one
        const { error: insertError } = await supabase.from("warranties").insert({
          service_id: serviceId,
          warranty_days: warrantyDays,
          warranty_start_date: new Date().toISOString().split('T')[0], // Set today as start date
        });

        if (insertError) throw insertError;
      } else {
        // If warranty record exists, update it
        const { error: updateError } = await supabase
          .from("warranties")
          .update({
            warranty_days: warrantyDays,
          })
          .eq("service_id", serviceId);

        if (updateError) throw updateError;
      }

      // Update local state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.service_id === serviceId
            ? {
                ...booking,
                warranty_days: warrantyDays,
              }
            : booking
        )
      );

      if (selectedBooking && selectedBooking.service_id === serviceId) {
        setSelectedBooking((prev) => ({
          ...prev!,
          warranty_days: warrantyDays,
        }));
      }

      setEditWarranty(false);
      toast.success("Warranty period updated successfully");
    } catch (error) {
      console.error("Error updating warranty:", error);
      toast.error("Failed to update warranty period");
    }
  };

  useEffect(() => {
    if (selectedBooking) {
      setTempBilling({
        subtotal: selectedBooking.subtotal || 0,
        iitm: selectedBooking.iitm || 0,
        total: selectedBooking.total || 0,
        status: selectedBooking.payment_status || "unpaid",
        payment_method: selectedBooking.payment_method || "",
        payment_date: selectedBooking.payment_date || "", 
        warranty_days: selectedBooking.warranty_days || "", // Changed from 0 to empty string
      });
      setEditPaymentMethod(!selectedBooking.payment_method);
      setEditPaymentDate(!selectedBooking.payment_date);  // Add this line
      setEditWarranty(!selectedBooking.warranty_days);
      // Remove the automatic setting of editVendor here
    }
  }, [selectedBooking]);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const filteredBookings = bookings.filter((booking) =>
    Object.values(booking).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Repair Bookings</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("adminAuth");
                  setIsAuthenticated(false);
                }}
              >
                Logout
              </Button>
              <Button
                variant="outline"
                onClick={fetchBookings}
                disabled={loading}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>
          
          {/* Search Bar of the page */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Google Form Link Section */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex justify-between items-center cursor-pointer hover:bg-blue-100 transition-colors"
               onClick={() => window.open("https://forms.gle/cXDAyGaNceR2QHw2A", "_blank")}>
            <div>
              <h1 className="font-medium text-blue-700">Pickup/Delivery Form</h1>
              <h1 className="text-sm text-blue-600">Make video during Pickup/Delivery</h1>
            </div>
            
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of all repair bookings.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Service ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Pickup Date</TableHead>
                <TableHead>Pickup Time</TableHead>
                <TableHead>Device Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vendor Assigned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow
                  key={booking.service_id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => fetchDetailedBooking(booking.service_id)}
                >
                  <TableCell>{booking.service_id}</TableCell>
                  <TableCell>{booking.customer_name}</TableCell>
                  <TableCell>{booking.mobile}</TableCell>
                  <TableCell>{booking.preferred_date}</TableCell>
                  <TableCell>{booking.preferred_time}</TableCell>
                  <TableCell className="capitalize">
                    {booking.device_type}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {booking.vendor_assigned || "Not assigned"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-[95%] md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
          <DialogHeader className="top-0 bg-white pb-4">
            <DialogTitle>Repair Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Display basic booking information */}
                <div>
                  <h4 className="font-semibold">Service ID</h4>
                  <p>{selectedBooking.service_id}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Status</h4>
                  {/* Show current repair status with a badge */}
                  <Badge variant="outline" className="capitalize">
                    {selectedBooking.status}
                  </Badge>
                </div>
                {/* Customer contact information */}
                <div>
                  <h4 className="font-semibold">Customer Name</h4>
                  <p>{selectedBooking.customer_name}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Mobile</h4>
                  <p>{selectedBooking.mobile}</p>
                </div>
                {/* Pickup details */}
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p>{selectedBooking.address}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Preferred Date</h4>
                  <p>{selectedBooking.preferred_date}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Preferred Time</h4>
                  <p>{selectedBooking.preferred_time}</p>
                </div>
              </div>

              {/* Device Details Section */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Devices</h4>
                <div className="space-y-4">
                  {/* Map through all devices in the booking */}
                  {selectedBooking.devices.map((device, index) => (
                    <div key={index} className="border p-3 md:p-4 rounded-lg">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {/* Device type information */}
                        <div>
                          <h5 className="font-medium">Device Type</h5>
                          <p className="capitalize">{device.device_type}</p>
                        </div>
                        {/* Only show brand name if it exists */}
                        {device.device_name && (
                          <div>
                            <h5 className="font-medium">Brand Name</h5>
                            <p>{device.device_name}</p>
                          </div>
                        )}
                        {/* Device model information */}
                        <div>
                          <h5 className="font-medium">Model</h5>
                          <p>{device.device_model}</p>
                        </div>
                        {/* Problem description spanning full width */}
                        <div className="col-span-1 sm:col-span-2">
                          <h5 className="font-medium">Problem Description</h5>
                          <p className="whitespace-pre-wrap">
                            {device.problem_description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vendor Assignment Section */}
              <div className="mt-6 border-t pt-4">
                <h4 className="font-semibold mb-2">Assign Vendor</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Show assigned vendor if exists and not in edit mode */}
                  {!editVendor && selectedBooking.vendor_assigned ? (
                    <>
                      <Badge variant="secondary" className="capitalize">
                        {selectedBooking.vendor_assigned}
                      </Badge>
                      {/* Button to enable vendor editing */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditVendor(true)}
                      >
                        Edit
                      </Button>
                    </>
                  ) : (
                    // Vendor selection dropdown when in edit mode
                    <Select
                      value={selectedBooking.vendor_assigned || ""}
                      onValueChange={(value) => {
                        handleVendorAssignment(selectedBooking.service_id, value);
                        setEditVendor(false);
                      }}
                    >
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rookra">Rookra</SelectItem>
                        <SelectItem value="GlobalFix">GlobalFix</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* Service Status Section */}
              <div className="mt-6 border-t pt-4">
                <h4 className="font-semibold mb-2">Service Status</h4>
                <Select
                  value={selectedBooking.status}
                  onValueChange={(value) => handleStatusUpdate(selectedBooking.service_id, value)}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Pickup</SelectItem>
                    <SelectItem value="diagnosis">Diagnosis</SelectItem>
                    <SelectItem value="repair">Repair</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Billing Details Section */}
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <h4 className="font-semibold">Billing Details</h4>
                  <Button
                    onClick={() => handleSavePrice(selectedBooking.service_id)}
                    disabled={savingPrice}
                    size="sm"
                  >
                    {savingPrice ? "Saving..." : "Save Price"}
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium">Subtotal</label>
                    <Input
                      type="number"
                      value={tempBilling.subtotal || ""}
                      onChange={(e) =>
                        setTempBilling((prev) => ({
                          ...prev,
                          subtotal: parseFloat(e.target.value) || 0,
                          total: (parseFloat(e.target.value) || 0) - prev.iitm,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Discount</label>
                    <Input
                      type="number"
                      value={tempBilling.iitm || ""}
                      onChange={(e) =>
                        setTempBilling((prev) => ({
                          ...prev,
                          iitm: parseFloat(e.target.value) || 0,
                          total:
                            prev.subtotal - (parseFloat(e.target.value) || 0),
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Total</label>
                    <Input
                      type="number"
                      value={tempBilling.total}
                      disabled
                      className="mt-1 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Payment Status
                    </label>
                    <Select
                      value={tempBilling.status}
                      onValueChange={(value) =>
                        setTempBilling((prev) => ({
                          ...prev,
                          status: value as "paid" | "unpaid",
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Payment Method</label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {!editPaymentMethod && tempBilling.payment_method ? (
                        <>
                          <Badge variant="outline" className="mt-1">
                            {tempBilling.payment_method}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditPaymentMethod(true)}
                            className="mt-1"
                          >
                            Edit
                          </Button>
                        </>
                      ) : (
                        <Select
                          value={tempBilling.payment_method || ""}
                          onValueChange={(value) => {
                            setTempBilling((prev) => ({
                              ...prev,
                              payment_method: value,
                            }));
                          }}
                        >
                          <SelectTrigger className="mt-1 w-full">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UPI">UPI</SelectItem>
                            <SelectItem value="CASH">CASH</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Payment Date</label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {!editPaymentDate && tempBilling.payment_date ? (
                        <>
                          <Badge variant="outline" className="mt-1">
                            {tempBilling.payment_date}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditPaymentDate(true)}
                            className="mt-1"
                          >
                            Edit
                          </Button>
                        </>
                      ) : (
                        <Input
                          type="date"
                          value={tempBilling.payment_date || ""}
                          onChange={(e) =>
                            setTempBilling((prev) => ({
                              ...prev,
                              payment_date: e.target.value,
                            }))
                          }
                          className="mt-1 w-full"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Warranty Period</label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {!editWarranty && selectedBooking.warranty_days ? (
                        <>
                          <Badge variant="outline" className="mt-1">
                            {selectedBooking.warranty_days}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditWarranty(true)}
                            className="mt-1"
                          >
                            Edit
                          </Button>
                        </>
                      ) : (
                        <Input
                          type="text"
                          placeholder="e.g., 90 days, 6 months"
                          value={tempBilling.warranty_days || ""}
                          onChange={(e) =>
                            setTempBilling((prev) => ({
                              ...prev,
                              warranty_days: e.target.value,
                            }))
                          }
                          className="mt-1 w-full"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
