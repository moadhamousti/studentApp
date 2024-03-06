import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom'
import { authLogout } from '../../redux/userRelated/userSlice';
import { Box, Button, Collapse } from '@mui/material';
import Popup from '../../components/Popup';

// import { useSelector } from 'react-redux';

const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'Cancel' : 'Edit profile';

    const navigate = useNavigate()
    const dispatch = useDispatch();
        // const { currentUser } = useSelector((state) => state.user);
    const { currentUser, response, error } = useSelector((state) => state.user);
    const address = "Admin"

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(updateUser(fields, currentUser._id, address))
    }

    const deleteHandler = () => {
        try {
            dispatch(deleteUser(currentUser._id, "Students"));
            dispatch(deleteUser(currentUser._id, address));
            dispatch(authLogout());
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault(); // Prevent form submission
    
        // Create an object with the updated fields
        const updatedFields = {
            name,
            email,
            schoolName,
            password: password !== "" ? password : undefined // Include password if it's not empty
        };
    
        try {
            // Dispatch updateUser action with the updated fields and address "Admin"
            await dispatch(updateUser(updatedFields, currentUser._id, "Admin"));
            // If the update is successful, show a pop-up with the message "Profile updated successfully"
            setShowPopup(true);
            setMessage("Profile updated successfully");
        } catch (error) {
            // If an error occurs during the update, show a pop-up with the error message
            setShowPopup(true);
            setMessage(error.message); // Assuming the error message is provided by the updateUser action
        }
    };
    
    
    

    return (
        <div>
            {/* Name: {currentUser.name}
            <br />
            Email: {currentUser.email}
            <br />
            School: {currentUser.schoolName}
            <br /> */}
            <div className='button-del-cancel'>
                <Box>
                    <Button variant="contained" color="error" className='button-del-cancel' onClick={deleteHandler}>Delete</Button>
                </Box>
                <Box>
                    <Button variant="contained" sx={styles.showButton}
                        onClick={() => setShowTab(!showTab)}>
                        {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{buttonText}
                    </Button>
                </Box>
            </div>
            <Collapse in={showTab} timeout="auto" unmountOnExit>
                <div className="register">
                    <form className="registerForm" onSubmit={submitHandler}>
                        <span className="registerTitle">Edit Details</span>
                        <label>Name</label>
                        <input className="registerInput" type="text" placeholder="Enter your name..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name" required />

                        <label>School</label>
                        <input className="registerInput" type="text" placeholder="Enter your school name..."
                            value={schoolName}
                            onChange={(event) => setSchoolName(event.target.value)}
                            autoComplete="name" required />

                        <label>Email</label>
                        <input className="registerInput" type="email" placeholder="Enter your email..."
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email" required />

                        <label>Password</label>
                        <input className="registerInput" type="password" placeholder="Enter your password..."
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password" />

                        <button className="registerButton" type="submit" onClick={handleUpdate}>Update</button>
                    </form>
                </div>
            </Collapse>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    )
}

export default AdminProfile

const styles = {
    attendanceButton: {
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        }
    }
}