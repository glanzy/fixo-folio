const SHIFT_KEY = 5; // You can change this number for different encryption strength

export const encodeServiceId = (serviceId: string): string => {
  try {
    // First apply a simple shift cipher
    const shiftedChars = serviceId.split('').map(char => {
      const charCode = char.charCodeAt(0);
      return String.fromCharCode(charCode + SHIFT_KEY);
    });
    
    // Convert to Base64
    const encoded = btoa(shiftedChars.join(''));
    
    // Make URL safe
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (error) {
    console.error('Encoding error:', error);
    throw new Error('Failed to encode service ID');
  }
};

export const decodeServiceId = (hash: string): string => {
  try {
    // Restore Base64 standard characters
    const restored = hash.replace(/-/g, '+').replace(/_/g, '/');
    
    // Decode Base64
    const decoded = atob(restored);
    
    // Reverse the shift cipher
    const unshiftedChars = decoded.split('').map(char => {
      const charCode = char.charCodeAt(0);
      return String.fromCharCode(charCode - SHIFT_KEY);
    });
    
    return unshiftedChars.join('');
  } catch (error) {
    console.error('Decoding error:', error);
    throw new Error('Failed to decode service ID');
  }
};