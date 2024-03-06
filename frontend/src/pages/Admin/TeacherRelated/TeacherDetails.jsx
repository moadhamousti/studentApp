import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Box } from '@mui/material';
import { AddButton, BlueButton } from '../../../components/buttonStyles';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                
                <Container>
                    <Typography style={{ marginTop:'20px',marginBottom:'20px', fontWeight:'600'}}  variant="h4" align="center" gutterBottom>
                        Teacher Details
                    </Typography>
                    <Box bgcolor="#c9c3c3"
                        boxShadow={2}
                        borderRadius={4}
                        p={2}
                        mb={2}
                    >
                        <Typography align="center" variant="h5" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                            Teacher Name:  <br />
                            <span style={{ color: '#004aba' }}>{teacherDetails?.name}</span>
                        </Typography>
                        <Typography align="center" variant="h5" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                            Class Name:  <br />
                            <span style={{ color: '#004aba' }}>{teacherDetails?.teachSclass?.sclassName}</span>
                        </Typography>
                        {isSubjectNamePresent ? (
                            <>
                                <Typography align="center" variant="h5" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    Subject Name:  <br />
                                    <span style={{ color: '#004aba' }}>{teacherDetails?.teachSubject?.subName}</span>
                                </Typography>
                                <Typography align="center" variant="h5" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    Subject Sessions:   <br />
                                    <span style={{ color: '#004aba' }}>{teacherDetails?.teachSubject?.sessions}</span>
                                </Typography>
                            </>
                        ) : (
                            <AddButton variant="contained" onClick={handleAddSubject}>
                                Add Subject
                            </AddButton>
                        )}
                    </Box>
                </Container>
            )}
        </>
    );
};

export default TeacherDetails;