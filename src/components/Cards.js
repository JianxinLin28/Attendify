import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import courseImage from '../constants/course-image.png';
import QR from './QRModal';


export default function ImgMediaCard( { title, body } ) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={courseImage}
        draggable={false}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" class="cardTitle">
        {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Manage</Button>
        <QR />
      </CardActions>
    </Card>
  );
}
