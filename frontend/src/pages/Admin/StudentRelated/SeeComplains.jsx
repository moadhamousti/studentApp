// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Paper, Box, Checkbox } from '@mui/material';
// import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
// import TableTemplate from '../../../components/TableTemplate';
// import { deleteUserComplaints } from '../../../redux/userRelated/userSlice';
// import loadingGif from '../../../assets/loadingGif.gif';

// const SeeComplains = () => {
//     const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
//     const dispatch = useDispatch();
//     const { complainsList, loading, error, response } = useSelector((state) => state.complain);
//     const { currentUser } = useSelector((state) => state.user);
//     const [validComplains, setValidComplains] = useState([]);

//     useEffect(() => {
//         dispatch(getAllComplains(currentUser._id, "Complain"));
//     }, [currentUser._id, dispatch]);

//     useEffect(() => {
//         const filteredComplains = complainsList.filter(complain => complain.user !== null);
//         setValidComplains(filteredComplains);
//     }, [complainsList]);

//     useEffect(() => {
//         const invalidComplains = complainsList.filter(complain => complain.user === null);
//         invalidComplains.forEach(complain => {
//             dispatch(deleteUserComplaints(complain._id));
//         });
//     }, [complainsList, dispatch]);

//     if (error) {
//         console.log(error);
//     }

//     const complainColumns = [
//         { id: 'user', label: 'User', minWidth: 170 },
//         { id: 'complaint', label: 'Complaint', minWidth: 100 },
//         { id: 'date', label: 'Date', minWidth: 170 },
//     ];

//     const complainRows = validComplains.map((complain) => {
//         const date = new Date(complain.date);
//         const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
//         return {
//             user: complain.user ? complain.user.name : "Unknown",
//             complaint: complain.complaint,
//             date: dateString,
//             id: complain._id,
//         };
//     });

//     const ComplainButtonHaver = ({ row }) => {
//         return (
//             <Checkbox {...label} />
//         );
//     };

//     return (
//         <>
//             {loading ?
//                 <div style={{ textAlign: 'center' }}>
//                     <img src={loadingGif} alt="Loading..." />
//                 </div>
//                 :
//                 <>
//                     {response ?
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
//                             No Complaints Right Now
//                         </Box>
//                         :
//                         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                             {validComplains.length > 0 &&
//                                 <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
//                             }
//                         </Paper>
//                     }
//                 </>
//             }
//         </>
//     );
// };

// export default SeeComplains;




import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loadingGif from '../../../assets/loadingGif.gif';
import {
  Paper, Box, Checkbox
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';

const SeeComplains = () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
        user: complain.user ? complain.user.name : "N/A",
        complaint: complain.complaint,
        date: dateString,
        id: complain._id,
    };
  });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        <Checkbox {...label} />
      </>
    );
  };

  return (
    <>
      {loading ?
        <div style={{ textAlign: 'center' }}>
            <img src={loadingGif} alt="Loading..." />
        </div>
        :
        <>
          {response ?
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px', fontWeight:'500' }}>
              No Complains Right Now
            </Box>
            :
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              {Array.isArray(complainsList) && complainsList.length > 0 &&
                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
              }
            </Paper>
          }
        </>
      }
    </>
  );
};

export default SeeComplains;
