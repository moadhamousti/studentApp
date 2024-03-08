import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import TableTemplate from '../../components/TableTemplate';
import { BlueButton } from "../../components/buttonStyles";
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubjects } from '../../redux/subjectRelated/subjectHandle'; // Import the fetchSubjects async thunk

const StudentCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [error, setError] = useState(null);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch fetchSubjects thunk to fetch subjects
        const subjectsResponse = await dispatch(fetchSubjects());
        setSubjects(subjectsResponse.payload); // Update subjects state with the fetched data
        
        // Fetch courses based on the user's ID
        const coursesResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/Student/courses/${currentUser._id}`);
        setCourses(coursesResponse.data);
        console.log('Courses:', coursesResponse.data); // Log the courses
      } catch (error) {
        setError(error.message);
      }
      setLoading(false); // Set loading state to false after fetching data
    };

    fetchData();
  }, [currentUser._id, dispatch]);

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

  const viewCourseDetails = (courseID) => {
    navigate(`/Student/courses/${courseID}`);
  };


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


  

