import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import TableTemplate from '../../components/TableTemplate';
import SpeedDialTemplate from '../../components/SpeedDialTemplate';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { BlueButton } from "../../components/buttonStyles";
import { useSelector } from 'react-redux';

const StudentCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Student/courses/${currentUser._id}`);
            setCourses(response.data);
            console.log('Courses:', response.data); // Log the courses
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    fetchCourses();
  }, [currentUser._id]);

  const viewCourseDetails = (courseID) => {
    navigate(`/Student/courses/${courseID}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 100 },
    { id: 'actions', label: 'Actions', align: 'right', minWidth: 100 }
  ];

  const rows = courses.map((course) => ({
    title: course.title,
    description: course.description,
    actions: (
      <BlueButton
        key={course._id} // Add unique key prop
        variant="contained"
        onClick={() => viewCourseDetails(course._id)}
      >
        View
      </BlueButton>
    )
  }));

  return (
    <>
      <TableTemplate columns={columns} rows={rows} />
    </>
  );
};

export default StudentCourses;
