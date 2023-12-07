import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import QR from '../constants/qr.png';
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  <style jsx>{`
    .modal-image {
      width: 250px;
      height: auto;
      draggable = false;
    }
  `}</style>

  const qrButton = () => {
    Swal.fire({
      title: "Attendance QR Code",
      text: "Scan the QR code to mark your attendance!",
      imageUrl: QR,
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: "QR-Image"
    });
  }

  return (
    <div>
      <Button onClick={qrButton}>QR Code</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Scan QR Code for attendance!
          </Typography>
          <Typography id="modal-modal-description modal-image" sx={{ mt: 2}}>
            <img src={QR} sx={{height: 3}} alt="QR Code" />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
