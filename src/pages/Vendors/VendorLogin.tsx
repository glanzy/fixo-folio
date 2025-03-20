import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/supabaseClient";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Paper
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const VendorLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if vendor is already logged in
  React.useEffect(() => {
    const authToken = localStorage.getItem('vendorAuthToken');
    if (authToken) {
      const vendorData = JSON.parse(localStorage.getItem('vendorData') || '{}');
      navigate(vendorData.dashboardPath || '/vendors/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Hardcoded vendor credentials with specific dashboard paths
      const vendorCredentials = [
        { 
          vendor_id: 1, 
          username: 'Rookra', 
          password: 'Rookra@123', 
          vendor_name: 'Rookra',
          dashboard_path: '/vendors/vendor/rookra'
        },
        { 
          vendor_id: 2, 
          username: 'GlobalFix', 
          password: 'GlobalFix@123', 
          vendor_name: 'GlobalFix',
          dashboard_path: '/vendors/vendor/globalfix'
        }
      ];
      
      // Find matching vendor
      const matchingVendor = vendorCredentials.find(
        vendor => vendor.username === username && vendor.password === password
      );
      
      if (!matchingVendor) {
        throw new Error('Invalid username or password');
      }

      // Store auth info in localStorage with additional timestamp for real-time subscriptions
      const authData = {
        vendorId: matchingVendor.vendor_id,
        vendorName: matchingVendor.vendor_name,
        username: matchingVendor.username,
        dashboardPath: matchingVendor.dashboard_path,
        token: `vendor_${matchingVendor.vendor_id}_${Date.now()}`, // Simple token generation
        timestamp: Date.now() // Add timestamp for real-time authentication
      };
      
      localStorage.setItem('vendorAuthToken', authData.token);
      localStorage.setItem('vendorName', matchingVendor.vendor_name);
      localStorage.setItem('vendorData', JSON.stringify(authData));
      
      // Redirect to vendor-specific dashboard
      navigate(matchingVendor.dashboard_path);
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ 
              backgroundColor: 'primary.main', 
              borderRadius: '50%', 
              p: 1,
              mb: 2
            }}>
              <LockOutlinedIcon sx={{ color: 'white' }} />
            </Box>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Vendor Login
            </Typography>
          </Box>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              inputProps={{ maxLength: 50 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            Contact your administrator if you need access
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default VendorLogin;
