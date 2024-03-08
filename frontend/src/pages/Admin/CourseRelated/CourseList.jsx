import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton } from "../../../components/buttonStyles";
import { useSelector } from 'react-redux';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Popup from '../../../components/Popup'; // Import the Popup component

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control popup display
  const [message, setMessage] = useState("");
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        console.log("Fetching courses for teacher with ID:", currentUser._id); // Log teacher ID
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Admin/courses/${currentUser._id}`);
        console.log("Courses fetched successfully:", response.data); // Log fetched courses
        setCourses(response.data);
        setError(null); // Reset error state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentUser._id]);

  const viewCourseDetails = (courseID) => {
    navigate(`/Admin/courses/${currentUser._id}/${courseID}`);
  };

  const deleteCourse = async (courseID) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/Teacher/courses/${courseID}`);
      const updatedCourses = courses.filter(course => course._id !== courseID);
      setCourses(updatedCourses);
      setShowPopup(true); // Show popup when course is deleted
      setMessage('Course deleted successfully'); // Set popup message
    } catch (error) {
      console.error('Error deleting course:', error);
      setShowPopup(true); // Show popup if there's an error
      setMessage('Error deleting course'); // Set popup message for error
    }
  };

  const columns = [
    { id: 'title', label: 'Title (Course Title)', minWidth: 170 },
    { id: 'teacher', label: 'Teacher', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 200 }
  ];

  const rows = courses.map((course) => ({
    title: course.title,
    teacher: course.teacher.name, // Assuming each course object has a 'teacher' field with a 'name' property
    actions: (
      <>
        <DeleteSweepIcon
          onClick={() => deleteCourse(course._id)}
          color="error"
          style={{ cursor: 'pointer', marginRight: '8px' }} // Add margin to the right
        />
        <BlueButton
          variant="contained"
          onClick={() => viewCourseDetails(course._id)}
        >
          View
        </BlueButton>
      </>
    )
  }));

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {Array.isArray(courses) && courses.length > 0 && 
        <TableTemplate columns={columns} rows={rows} />
      }
      
      {showPopup && <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />}
    </>
  );
};

export default CourseList;
