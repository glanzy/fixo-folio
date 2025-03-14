import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { toast } from "sonner";

interface Task {
  service_id: string;
  brandName: string;
  model: string;
  pickupDate: string;
  pickupTime: string;
  problemDescription: string;
  customer_name: string;
  address: string;
  mobile: string;
}

const VendorDashboard: FC = () => {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async (vendorId: string) => {
    try {
      console.log('Fetching tasks for vendor:', vendorId);

      // First get all tasks assigned to this vendor
      const { data: trackingData, error: trackingError } = await supabase
        .from('service_tracking')
        .select('*')  // Changed from just service_id to all fields
        .eq('vendor_assigned', vendorId);

      console.log('Tracking Data:', trackingData);
      console.log('Tracking Error:', trackingError);

      if (trackingError) throw trackingError;
      if (!trackingData || trackingData.length === 0) {
        console.log('No tasks found for this vendor');
        setTasks([]);
        setLoading(false);
        return;
      }

      const serviceIds = trackingData.map(t => t.service_id);
      console.log('Service IDs:', serviceIds);

      // Get customer details
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select(`
          service_id,
          name,
          mobile,
          address,
          preferred_date,
          preferred_time
        `)
        .in('service_id', serviceIds);

      console.log('Customer Data:', customerData);
      console.log('Customer Error:', customerError);

      if (customerError) throw customerError;

      // Get device details
      const { data: deviceData, error: deviceError } = await supabase
        .from('devices')
        .select(`
          service_id,
          device_type,
          device_name,
          device_model,
          problem_description
        `)
        .in('service_id', serviceIds);

      console.log('Device Data:', deviceData);
      console.log('Device Error:', deviceError);

      if (deviceError) throw deviceError;

      // Combine the data
      const combinedTasks = customerData.map(customer => {
        const devices = deviceData.filter(d => d.service_id === customer.service_id);
        const tracking = trackingData.find(t => t.service_id === customer.service_id);
        
        return {
          service_id: customer.service_id,
          customer_name: customer.name,
          mobile: customer.mobile,
          address: customer.address,
          pickupDate: customer.preferred_date,
          pickupTime: customer.preferred_time,
          brandName: devices[0]?.device_name || 'Not specified',
          model: devices[0]?.device_model || 'Not specified',
          problemDescription: devices[0]?.problem_description || 'No description provided',
          status: tracking?.status || 'pending'
        };
      });

      console.log('Combined Tasks:', combinedTasks);
      setTasks(combinedTasks);
      toast.success(`Found ${combinedTasks.length} assigned tasks`);

    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Modified useEffect to show vendorAuth value
  useEffect(() => {
    const vendorAuth = localStorage.getItem('vendorAuth');
    console.log('Vendor Auth:', vendorAuth);
    
    if (!vendorAuth) {
      navigate('/vendor/login');
    } else {
      fetchTasks(vendorAuth);
    }
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem('vendorAuth');
            navigate('/vendor/login');
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <div className="grid gap-4">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Assigned Devices</h2>
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No devices assigned yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map(task => (
                <div
                  key={task.service_id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedTask(task.service_id)}
                >
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold text-lg">{task.brandName}</span>
                    <span className="text-sm text-gray-500">{task.model}</span>
                    <span className="text-sm text-gray-500">Service ID: {task.service_id}</span>
                    <span className="text-sm text-gray-500">Pickup: {task.pickupDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Device Details</h3>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {tasks.find(task => task.service_id === selectedTask) && (
              <div className="space-y-4">
                {Object.entries(tasks.find(task => task.service_id === selectedTask) || {})
                  .map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-2">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span>{String(value)}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
