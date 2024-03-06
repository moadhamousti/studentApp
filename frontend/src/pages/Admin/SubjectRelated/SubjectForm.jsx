import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, MenuItem, Select, Container } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';
import { fetchSubjects } from '../../../redux/subjectRelated/subjectSlice';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id;
    const adminID = currentUser._id;
    const address = "Subject";

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [existingSubjects, setExistingSubjects] = useState([]);

    const excludedSubjectId = "65d26855895832c679a59e1e";

    // Filter out the excluded subject from the existingSubjects array
    const filteredSubjects = existingSubjects.filter(subject => subject._id !== excludedSubjectId);

    useEffect(() => {
        dispatch(fetchSubjects())
            .unwrap()
            .then((data) => {
                console.log("Fetched existing subjects:", data); // Log fetched data
                if (Array.isArray(data)) {
                    setExistingSubjects(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching existing subjects:", error);
                setLoading(false);
            });
    }, [dispatch]);

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <Container>
            <Select
                label="Select Subject"
                value={subjects[0].subName} // Assuming you want to select the subject for the first entry in the subjects array
                onChange={handleSubjectNameChange(0)} // Assuming you want to change the subject for the first entry in the subjects array
                fullWidth
                required
            >
                <MenuItem value="" disabled>
                    Select a subject
                </MenuItem>
                {loading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                ) : existingSubjects.length === 0 ? (
                    <MenuItem disabled>No existing subjects</MenuItem>
                ) : (
                    filteredSubjects.map((existingSubject) => ( // Removed curly braces
                        <MenuItem key={existingSubject._id} value={existingSubject.subName}>
                            {existingSubject.subName}
                        </MenuItem>
                    )) // Removed closing curly braces
                )}
            </Select>

            <form onSubmit={submitHandler}>
                <Box mb={2}>
                    <Typography variant="h6" >Add Subjects</Typography>
                </Box>
                <Grid container spacing={2}>
                    {subjects.map((subject, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Subject Name"
                                    variant="outlined"
                                    value={subject.subName}
                                    onChange={handleSubjectNameChange(index)}
                                    sx={styles.inputField}
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Subject Code"
                                    variant="outlined"
                                    value={subject.subCode}
                                    onChange={handleSubjectCodeChange(index)}
                                    sx={styles.inputField}
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Sessions"
                                    variant="outlined"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    value={subject.sessions}
                                    onChange={handleSessionsChange(index)}
                                    sx={styles.inputField}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" alignItems="flex-end">
                                    {index === 0 ? (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={handleAddSubject}
                                        >
                                            Add Subject
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={handleRemoveSubject(index)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </Box>
                            </Grid>
                        </React.Fragment>
                    ))}
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button variant="contained" color="primary" type="submit" disabled={loader}>
                                {loader ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Save'
                                )}
                            </Button>
                        </Box>
                    </Grid>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </Grid>
            </form>
        </Container>
    );
}

export default SubjectForm

const styles = {
    inputField: {
        '& .MuiInputLabel-root': {
            color: '#838080',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#838080',
        },
    },
};
