import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress } from '@mui/material';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('')
    const [className, setClassName] = useState('')
    const [sclassName, setSclassName] = useState('')

    const adminID = currentUser._id
    const role = "Student"
    const attendance = []

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    }

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

    const submitHandler = (event) => {
        event.preventDefault()
        if (sclassName === "") {
            setMessage("Please select a classname")
            setShowPopup(true)
        }
        else {
            setLoader(true)
            dispatch(registerUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <div className="register">
                <form className="registerForm" onSubmit={submitHandler}>
                    <span className="registerTitle">Add Student</span>
                    <label>Name</label>
                    <input className="registerInput" id='input' type="text" placeholder="Enter student's name..."
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name" required />

                    {
                        situation === "Student" &&
                        <>
                            <label>Class</label>
                            <select
                                className="registerInput"
                                value={className}
                                onChange={changeHandler} required>
                                <option value='Select Class'>Select Class</option>
                                {sclassesList.map((classItem, index) => (
                                    <option key={index} value={classItem.sclassName}>
                                        {classItem.sclassName}
                                    </option>
                                ))}
                            </select>
                        </>
                    }

                    <label>Roll Number</label>
                    <input className="registerInput" type="number" placeholder="Enter student's Roll Number..."
                        value={rollNum}
                        onChange={(event) => setRollNum(event.target.value)}
                        required />

                    <label>Password</label>
                    <input className="registerInput" type="password" placeholder="Enter student's password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password" required />

                    <button className="registerButton" type="submit" disabled={loader}>
                        {loader ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Add'
                        )}
                    </button>
                </form>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddStudent




// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../../../redux/userRelated/userHandle';
// import Popup from '../../../components/Popup';
// import { underControl } from '../../../redux/userRelated/userSlice';
// import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
// import { CircularProgress } from '@mui/material';

// const AddStudent = ({ situation }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const params = useParams();
//     const attendance = [];

//     const userState = useSelector(state => state.user);
//     const { status, currentUser, response, error } = userState;
//     const { sclassesList } = useSelector((state) => state.sclass);

//     const [name, setName] = useState('');
//     const [rollNum, setRollNum] = useState('');
//     const [password, setPassword] = useState('');
//     const [className, setClassName] = useState('');
//     const [sclassName, setSclassName] = useState('');
//     const [image, setImage] = useState(null);
//     const [previewImage, setPreviewImage] = useState(null);
//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState('');
//     const [loader, setLoader] = useState(false);

//     useEffect(() => {
//         dispatch(getAllSclasses(currentUser._id, "Sclass"));
//     }, [currentUser._id, dispatch]);

//     useEffect(() => {
//         if (situation === "Class") {
//             setSclassName(params.id);
//         }
//     }, [params.id, situation]);

//     const imageChangeHandler = (event) => {
//         const selectedImage = event.target.files[0];
//         setImage(selectedImage);
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setPreviewImage(reader.result);
//         };
//         reader.readAsDataURL(selectedImage);
//     };

//     const changeHandler = (event) => {
//         if (event.target.value === 'Select Class') {
//             setClassName('Select Class');
//             setSclassName('');
//         } else {
//             const selectedClass = sclassesList.find(
//                 (classItem) => classItem.sclassName === event.target.value
//             );
//             setClassName(selectedClass.sclassName);
//             setSclassName(selectedClass._id);
//         }
//     };

//     const fields = { name, rollNum, password, sclassName, adminID: currentUser._id, role: "Student", attendance };

//     const submitHandler = (event) => {
//         event.preventDefault();
//         if (sclassName === "") {
//             setMessage("Please select a classname");
//             setShowPopup(true);
//         } else {
//             setLoader(true);
//             const formData = new FormData();
//             formData.append('name', name);
//             formData.append('rollNum', rollNum);
//             formData.append('password', password);
//             formData.append('sclassName', sclassName);
//             formData.append('adminID', currentUser._id);
//             formData.append('role', "Student");
//             formData.append('attendance', JSON.stringify(attendance));
//             if (image) {
//                 formData.append('image', image);
//             }
//             dispatch(registerUser(formData, "Student"));
//         }
//     };

//     useEffect(() => {
//         if (status === 'added') {
//             dispatch(underControl());
//             navigate(-1);
//         } else if (status === 'failed') {
//             setMessage(response);
//             setShowPopup(true);
//             setLoader(false);
//         } else if (status === 'error') {
//             setMessage("Network Error");
//             setShowPopup(true);
//             setLoader(false);
//         }
//     }, [status, navigate, error, response, dispatch]);

//     return (
//         <>
//             <div className="register">
//                 <form className="registerForm" onSubmit={submitHandler}>
//                     <span className="registerTitle">Add Student</span>
//                     <label>Name</label>
//                     <input className="registerInput" type="text" placeholder="Enter student's name..."
//                         value={name}
//                         onChange={(event) => setName(event.target.value)}
//                         autoComplete="name" required />

//                     {situation === "Student" && (
//                         <>
//                             <label>Class</label>
//                             <select
//                                 className="registerInput"
//                                 value={className}
//                                 onChange={changeHandler} required>
//                                 <option value='Select Class'>Select Class</option>
//                                 {sclassesList.map((classItem, index) => (
//                                     <option key={index} value={classItem.sclassName}>
//                                         {classItem.sclassName}
//                                     </option>
//                                 ))}
//                             </select>
//                         </>
//                     )}

//                     <label>Roll Number</label>
//                     <input className="registerInput" type="number" placeholder="Enter student's Roll Number..."
//                         value={rollNum}
//                         onChange={(event) => setRollNum(event.target.value)}
//                         required />

//                     <label>Password</label>
//                     <input className="registerInput" type="password" placeholder="Enter student's password..."
//                         value={password}
//                         onChange={(event) => setPassword(event.target.value)}
//                         autoComplete="new-password" required />

//                     <label>Profile Image</label>
//                     <input
//                         type="file"
//                         onChange={imageChangeHandler}
//                         accept="image/*"
//                         required
//                     />
//                     {previewImage && (
//                         <img
//                             src={previewImage}
//                             alt="Preview"
//                             style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                         />
//                     )}

//                     <button className="registerButton" type="submit" disabled={loader}>
//                         {loader ? (
//                             <CircularProgress size={24} color="inherit" />
//                         ) : (
//                             'Add'
//                         )}
//                     </button>
//                 </form>
//             </div>
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     )
// }

// export default AddStudent;
