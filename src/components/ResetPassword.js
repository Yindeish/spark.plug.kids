import axios from 'axios';

export const ResetPassword = async (email) => {
  try {
    // Send a request to the backend API for resetting the password
    const response = await axios.post('http://192.168.0.105:3000/api/resetpassword', { email });
    // Handle the response or perform any necessary actions
    console.log(response.data); // Log the response data for testing purposes
    // You can customize the logic here based on your backend API response

    // Example: If the API returns a success message, you can handle it accordingly
    if (response.data.success) {
      // Password reset success
    } else {
      // Password reset failed
    }
  } catch (error) {
    // Handle any errors that occurred during the password reset process
    console.log(error);
    throw new Error('Error resetting password');
  }
};
