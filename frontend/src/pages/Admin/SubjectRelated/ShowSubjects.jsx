import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    Paper, Box, IconButton,
} from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, AddButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import { deleteSubject } from '../../../redux/subjectRelated/subjectSlice';

// Import your loading GIF file
import loadingGif from '../../../assets/loadingGif.gif';

const ShowSubjects = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID) => {
        dispatch(deleteSubject(deleteID));
        setMessage("Sorry the delete function has been disabled for now.");
        dispatch(getSubjectList(currentUser._id, "AllSubjects"))
          .catch((error) => {
            console.error('Error deleting subject:', error);
            // Handle error
          });
    };
    

    const subjectColumns = [
        { id: 'subName', label: 'Sub Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ]

    const subjectRows = subjectsList.map((subject) => {
        return {
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName ? subject.sclassName.sclassName : "N/A", // Check if subject.sclassName is not null before accessing sclassName
            sclassID: subject.sclassName ? subject.sclassName._id : "N/A", // Check if subject.sclassName is not null before accessing _id
            id: subject._id,
        };
    });
    
    

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                    <DeleteSweepIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => {
                        console.log("Navigating to view subject...");
                        console.log("Class ID:", row.sclassID);
                        console.log("Subject ID:", row.id);
                        navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`);
                    }}
                >
                    View
                </BlueButton>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteForeverIcon style={{ color: '#bd1531' }}/>, name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <>
            {loading ?
                <div style={{ textAlign: 'center' }}>
                    <img src={loadingGif} alt="Loading..." />
                </div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <AddButton variant="contained"
                                onClick={() => navigate("/Admin/subjects/chooseclass")}>
                                Add Subjects
                            </AddButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 &&
                                <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

        </>
    );
};

export default ShowSubjects;
