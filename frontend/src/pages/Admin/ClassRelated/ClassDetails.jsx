import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    Box, Container, Typography, Tab, IconButton
} from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { AddButton, BlueButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
import TabContext from '@mui/lab/TabContext';


const ClassDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id
    const teacherID = params.id

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"))
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getClassStudents(classID));
                dispatch(resetSubjects())
                dispatch(getSubjectList(classID, "ClassSubjects"))
            })
    }

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ]

    const subjectRows = subjectsList && subjectsList.length > 0 && subjectsList.map((subject) => {
        return {
            name: subject.subName,
            code: subject.subCode,
            id: subject._id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                    <DeleteSweepIcon style={{ color: '#bd1531' }} />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => {
                        navigate(`/Admin/class/subject/${classID}/${row.id}`)
                        
                    }}
                >
                    View
                </BlueButton >
            </>
        );
    };

    const subjectActions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/addsubject/" + classID)
        },
        {
            icon: <DeleteForeverIcon style={{ color: '#bd1531' }} />, name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => {
        return (
            <>
                {response ?
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <AddButton
                            variant="contained"
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                        >
                            Add Subjects
                        </AddButton>
                    </Box>
                    :
                    <>
                        <Typography style={{ fontWeight: 'bold', fontSize: '2rem' }} variant="h5" gutterBottom>
                            Subjects List:
                        </Typography>

                        <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                        <SpeedDialTemplate actions={subjectActions} />
                    </>
                }
            </>
        )
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <DeleteSweepIcon style={{ color: '#bd1531' }} />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                    style={{ marginRight: '10px' }} // Add margin to the right
                >
                    View
                </BlueButton>
                <PurpleButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/attendance/" + row.id)}
                >
                    Attendance
                </PurpleButton>
            </>
        );
    };

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: <DeleteForeverIcon  style={{ color: '#bd1531' }} />, name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => {
        return (
            <>
                {getresponse ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <AddButton
                                variant="contained"
                                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            >
                                Add Students
                            </AddButton>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography style={{ fontWeight: 'bold', fontSize: '2rem' }} variant="h5" gutterBottom>
                            Students List:
                        </Typography>

                        <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                        <SpeedDialTemplate actions={studentActions} />
                    </>
                )}
            </>
        )
    }

    const ClassTeachersSection = () => {
        const [teacherAssigned, setTeacherAssigned] = useState(false);
    
        useEffect(() => {
            if (sclassDetails && sclassDetails.teacher) {
                setTeacherAssigned(true);
            }
        }, [sclassDetails]);
    
        return (
            <>
                <Typography style={{ fontWeight: 'bold', fontSize: '2rem' }} variant="h4" align="center" gutterBottom>
                    Teacher Details
                </Typography>
                {teacherAssigned ? (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Teacher Name: {sclassDetails.teacher.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Teacher Email: {sclassDetails.teacher.email}
                        </Typography>
                    </>
                ) : (
                    <AddButton
                        variant="contained"
                        onClick={() => navigate("/Admin/teachers/addteacher/" + classID)}
                        style={{ display: 'block', margin: '0 auto' }}
                    >
                        Add Teacher
                    </AddButton>
                )}
            </>
        );
    };

    const ClassDetailsSection = () => {
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <>
                <Typography style={{ fontWeight: 'bold', fontSize: '2rem' }} variant="h4" align="center" gutterBottom>
                    Class Details
                </Typography>
                <Box
                    bgcolor="#c9c3c3"
                    boxShadow={2}
                    borderRadius={4}
                    p={2}
                    mb={2}
                    >
                    <Typography align="center" variant="h5" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                        This is Class : <br />
                        <span style={{ color: '#004aba' }}>{sclassDetails && sclassDetails.sclassName}</span>
                    </Typography>
                    <Typography align="center" variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        Number of Subjects:
                        <span style={{ color: '#004aba' }}>{numberOfSubjects}</span>
                    </Typography>
                    <Typography align="center" variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        Number of Students: 
                        <span style={{ color: '#004aba' }}>{numberOfStudents}</span> 
                    </Typography>
                </Box>
                {getresponse &&
                    <AddButton
                        variant="contained"
                        onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                    >
                        Add Students
                    </AddButton>
                }
                {response &&
                    <AddButton
                        variant="contained"
                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                    >
                        Add Subjects
                    </AddButton>
                }

                
            </>
        );
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Box sx={{ width: '100%', typography: 'body1', }} >
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                    <Tab label="Details" value="1" />
                                    <Tab label="Subjects" value="2" />
                                    <Tab label="Students" value="3" />
                                    <Tab label="Teachers" value="4" />
                                </TabList>
                            </Box>
                            <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                                <TabPanel value="1">
                                    <ClassDetailsSection />
                                </TabPanel>
                                <TabPanel value="2">
                                    <ClassSubjectsSection />
                                </TabPanel>
                                <TabPanel value="3">
                                    <ClassStudentsSection />
                                </TabPanel>
                                <TabPanel value="4">
                                    <ClassTeachersSection />
                                </TabPanel>
                            </Container>
                        </TabContext>
                    </Box>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;