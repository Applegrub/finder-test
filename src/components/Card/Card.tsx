import React from 'react';
import {
  Box,
  Card as MuiCard,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CharacterInfo, PlanetInfo } from 'services/ResponseTypes';
import { CategoryRequestEnum } from 'utils/constants';

interface Props {
  character: CharacterInfo | PlanetInfo;
  id: number;
  category: CategoryRequestEnum;
}

const Card: React.FC<Props> = ({ character: { name }, id, category }) => {
  return (
    <MuiCard sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Box p={1}>
          <Link to={`/${category}/${id}`}>Learn More</Link>
        </Box>
      </CardActions>
    </MuiCard>
  );
};

export default Card;
