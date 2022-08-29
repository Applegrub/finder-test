import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPersonalInfoQuery } from 'services/apiService/infoApi';
import { CategoryRequestEnum } from 'utils/constants';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type Params = {
  category: CategoryRequestEnum;
  id: string;
};

const PersonalInfo: React.FC = () => {
  const { category, id } = useParams();
  const { data: personalInfo, isLoading } = useGetPersonalInfoQuery({
    category,
    id,
  } as Params);

  const navigate = useNavigate();
  const handleGoBack = () => navigate('/');

  if (isLoading) {
    return (
      <Box mt={6} display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Button onClick={handleGoBack}>Back</Button>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 300 }} size='small' aria-label='simple table'>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Key</StyledTableCell>
                <StyledTableCell align='right'>Value</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {personalInfo &&
                Object.keys(personalInfo).map((key) => {
                  const value: string | string[] =
                    personalInfo[key as keyof typeof personalInfo];
                  if (!Array.isArray(value) && !value.startsWith('https:')) {
                    return (
                      <StyledTableRow
                        key={key}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <StyledTableCell component='th' scope='row'>
                          {key}
                        </StyledTableCell>
                        <StyledTableCell align='right'>{value}</StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
