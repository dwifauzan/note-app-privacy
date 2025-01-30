import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const OutlinedCard = (props: { // Define the props type
  title: string;
  subtitle: string;
  content?: string;
  buttonLabel?: string; // Optional button label
  onButtonClick?: () => void; // Optional button click handler
}) => {
  const { title, subtitle, content, buttonLabel = "Learn More", onButtonClick } = props; // Destructure props

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {/* You can add a default title if needed */}
          </Typography>
          <Typography variant="h5" component="div">
            {title} {/* Dynamic title */}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            {subtitle} {/* Dynamic subtitle */}
          </Typography>
          <Typography variant="body2">
            {content} {/* Dynamic content */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onButtonClick}> {/* Dynamic button label and click handler */}
            {buttonLabel}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default OutlinedCard;