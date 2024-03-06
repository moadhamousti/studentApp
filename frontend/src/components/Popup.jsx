import React from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../redux/userRelated/userSlice';
import { underStudentControl } from '../redux/studentRelated/studentSlice';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const Popup = ({ message, setShowPopup, showPopup }) => {
    const dispatch = useDispatch();

    const vertical = "top";
    const horizontal = "right";

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopup(false);
        dispatch(underControl());
        dispatch(underStudentControl());
    };

    return (
        <Snackbar open={showPopup} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
            <Alert
                onClose={handleClose}
                severity={message.includes('successfully') ? "success" : "error"} // Check message content for success or error
                sx={{ width: '100%' }}
                icon={message.includes('successfully') ? <CheckCircleIcon fontSize="inherit" /> : <ErrorIcon fontSize="inherit" />} // Set icon based on message content
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Popup;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
