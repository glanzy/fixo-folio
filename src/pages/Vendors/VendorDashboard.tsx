import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from "@/supabaseClient";
import { updateServiceStatus, setupStatusSubscription } from "@/utils/statusUpdateService";
import {
  Typography,
  Container,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import LogoutIcon from '@mui/icons-material/Logout';

interface ServiceAssignment {
  service_id: string;
  customer_name: string;
  mobile: string;
  device_type: string;
  device_model: string;
  problem: string;
  status: string;
  address: string;
  created_at: string;
}

const serviceStatusOptions = [
  { value: 'pickup', label: 'Picked Up' },
  { value: 'diagnosis', label: 'In Diagnosis' },
  { value: 'repair', label: 'In Repairing' },
  { value: 'delivered', label: 'Delivered' }
];

const VendorDashboard = () => {
  const { vendorName } = useParams<{ vendorName: string }>();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<ServiceAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceAssignment | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const supabaseSubscription = useRef<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Authentication check
  useEffect(() => {
    const vendorData = JSON.parse(localStorage.getItem('vendorData') || '{}');
    if (!vendorData?.token || !vendorData?.vendorName) {
      navigate('/vendors/login');
      return;
    }

    // Make sure the vendor is accessing their own dashboard
    if (vendorName && vendorData.vendorName.toLowerCase() !== vendorName.toLowerCase()) {
      navigate('/vendors/login');
    }
  }, [vendorName, navigate]);

  // Fetch vendor assignments
  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const vendorData = JSON.parse(localStorage.getItem('vendorData') || '{}');
      if (!vendorData.vendorName) throw new Error('Vendor not authenticated');

      // Get vendor assignments
      const { data: assignmentData, error: assignmentError } = await supabase
        .from('vendor_assignments')
        .select('service_id')
        .eq('vendor_name', vendorData.vendorName);

      if (assignmentError) throw assignmentError;
      if (!assignmentData || assignmentData.length === 0) {
        setAssignments([]);
        setLoading(false);
        return;
      }

      // Get service IDs
      const serviceIds = assignmentData.map(a => a.service_id);

      // Get customer data for each service
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .in('service_id', serviceIds);

      if (customerError) throw customerError;

      // Get device data for each service
      const { data: deviceData, error: deviceError } = await supabase
        .from('devices')
        .select('*')
        .in('service_id', serviceIds);

      if (deviceError) throw deviceError;

      // Get status data for each service
      const { data: statusData, error: statusError } = await supabase
        .from('service_tracking')
        .select('*')
        .in('service_id', serviceIds);

      if (statusError) throw statusError;

      // Combine data
      const combinedData = serviceIds.map(serviceId => {
        const customer = customerData?.find(c => c.service_id === serviceId);
        const device = deviceData?.find(d => d.service_id === serviceId);
        const status = statusData?.find(s => s.service_id === serviceId);

        return {
          service_id: serviceId,
          customer_name: customer?.name || 'Unknown',
          mobile: customer?.mobile || 'Unknown',
          address: customer?.address || 'Unknown',
          device_type: device?.device_type || 'Unknown',
          device_model: device?.device_model || 'Unknown',
          problem: device?.problem_description || 'Unknown',
          status: status?.status || 'pickup',
          created_at: customer?.created_at || new Date().toISOString()
        };
      });

      setAssignments(combinedData);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Setup real-time subscription for service status changes
  const setupRealtimeSubscription = () => {
    if (supabaseSubscription.current) {
      supabase.removeChannel(supabaseSubscription.current);
    }

    supabaseSubscription.current = setupStatusSubscription(null, (service_id, status) => {
      console.log('Received real-time update:', service_id, status);
      // Update the assignments state with the new status
      setAssignments(prevAssignments => 
        prevAssignments.map(assignment => 
          assignment.service_id === service_id
            ? { ...assignment, status }
            : assignment
        )
      );
    });
  };

  // Handle status update
  const handleStatusUpdate = async (serviceId: string, status: string) => {
    setUpdatingStatus(serviceId);
    try {
      await updateServiceStatus(serviceId, status);
      
      // Immediately update UI without waiting for real-time subscription
      setAssignments(prevAssignments => 
        prevAssignments.map(assignment => 
          assignment.service_id === serviceId
            ? { ...assignment, status }
            : assignment
        )
      );
      
      // Show success feedback
      setSnackbarMessage('Status updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating status:', error);
      // Show error feedback
      setSnackbarMessage('Failed to update status');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setUpdatingStatus(null);
      setStatusDialogOpen(false);
    }
  };

  const openStatusDialog = (service: ServiceAssignment) => {
    setSelectedService(service);
    setNewStatus(service.status);
    setStatusDialogOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('vendorAuthToken');
    localStorage.removeItem('vendorName');
    localStorage.removeItem('vendorData');
    navigate('/vendors/login');
  };

  // Initial data fetch and subscription setup
  useEffect(() => {
    fetchAssignments();
    setupRealtimeSubscription();

    return () => {
      if (supabaseSubscription.current) {
        supabase.removeChannel(supabaseSubscription.current);
      }
    };
  }, []);

  // Get vendor display name
  const getVendorDisplayName = () => {
    const vendorData = JSON.parse(localStorage.getItem('vendorData') || '{}');
    return vendorData.vendorName || vendorName || 'Vendor';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            {getVendorDisplayName()} Dashboard
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              startIcon={<RefreshIcon />} 
              onClick={fetchAssignments}
              sx={{ mr: 2 }}
            >
              Refresh
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : assignments.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6">No assignments found</Typography>
            <Typography variant="body2" color="textSecondary">
              You don't have any service assignments yet
            </Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Device</TableCell>
                  <TableCell>Problem</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.service_id}>
                    <TableCell>{assignment.service_id}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{assignment.customer_name}</Typography>
                      <Typography variant="caption" color="textSecondary">{assignment.mobile}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{assignment.device_type}</Typography>
                      <Typography variant="caption" color="textSecondary">{assignment.device_model}</Typography>
                    </TableCell>
                    <TableCell>{assignment.problem}</TableCell>
                    <TableCell>
                      <Chip 
                        label={assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)} 
                        color={
                          assignment.status === 'pickup' ? 'info' :
                          assignment.status === 'diagnosis' ? 'warning' :
                          assignment.status === 'repair' ? 'primary' :
                          assignment.status === 'delivered' ? 'success' : 
                          'default'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        size="small"
                        disabled={updatingStatus === assignment.service_id}
                        onClick={() => openStatusDialog(assignment)}
                      >
                        {updatingStatus === assignment.service_id ? (
                          <CircularProgress size={24} />
                        ) : 'Update Status'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Status Update Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Update Service Status</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 300, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={newStatus}
                label="Status"
                onChange={(e) => setNewStatus(e.target.value)}
              >
                {serviceStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={() => selectedService && handleStatusUpdate(selectedService.service_id, newStatus)}
            variant="contained"
            disabled={!selectedService || selectedService.status === newStatus}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Snackbar */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VendorDashboard;
