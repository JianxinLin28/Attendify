import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';

const QRCodeGenerator = () => {
  const [qrCodeImage, setQRCodeImage] = useState(null);

  const generateQRCode = async (data) => {
    try {
      console.log(data);
      const qrCode = await QRCode.toDataURL(data);
      setQRCodeImage(qrCode);
      return qrCode; // Return the QR code to be used in the then callback
    } catch (error) {
      console.error('Error generating QR code:', error.message);
      throw error; // Re-throw the error to be caught in the caller
    }
  };

  const sendPostRequestAndGenerateQRCode = async (courseId) => {
    try {
      // Update the backend URL to http://localhost:8080/qr
      const backendURL = 'http://localhost:8080/qr';

      // Make a POST request using Axios with the specified courseId
      const response = await axios.post(backendURL, { course_id: courseId });

      // Log the response from the backend
      console.log('Response from backend:', response.data);

      // Extract the token from the "key" attribute in the response
      const keyAttribute = 'key';
      const token = response.data[keyAttribute];

      console.log(`Token extracted from ${keyAttribute}:`, token);

      // Generate a QR code with the extracted token
      generateQRCode(JSON.stringify(token)).then((qrCode) => {
        // Display the QR code in the SweetAlert2 modal
        Swal.fire({
          title: 'Scan for attendance',
          html: `<img src="${qrCode}" alt="QR Code" draggable="false" style="display:block;margin:auto;height:300px;width:300px;"/>`,
          confirmButtonColor: '#3085d6',
        });
      });

    } catch (error) {
      console.error('Error sending POST request:', error.message);
    }
  };

  const handleClick = async () => {
    const { value: courseId } = await Swal.fire({
      title: 'Enter Course ID',
      input: 'text',
      inputLabel: 'Course ID',
      inputPlaceholder: 'Enter the course ID',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'QR Code',
    });

    if (courseId) {
      sendPostRequestAndGenerateQRCode(courseId);
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>QR Code</Button>
    </div>
  );
};

export default QRCodeGenerator;
