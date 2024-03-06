import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate, useParams } from 'react-router-dom';

const TeacherCourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return;

      try {
        setLoading(true);
        setError(null);

        console.log('Fetching course details...'); // Log fetching process

        // Fetch course details directly using Axios
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teacher/courses/${courseId}`);
        setCourseDetails(response.data);

        setLoading(false);
        console.log('Course details fetched successfully:', courseDetails); // Log successful fetching
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  console.log('Loading:', loading); // Log loading state
  console.log('Error:', error); // Log error state

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{courseDetails ? courseDetails.title : 'Course Title'}</h1>
      <p>{courseDetails ? courseDetails.description : 'Course Description'}</p>
      <p>{courseDetails ? courseDetails.article : 'Course Article'}</p>
    </div>
  );
};

export default TeacherCourseDetails;
