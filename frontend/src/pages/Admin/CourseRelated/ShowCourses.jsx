import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ShowCourse = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector(state => state.user);
  const teachCourses = useSelector(state => state.course.teachCourses);
  const currentUserCourse = teachCourses && Array.isArray(teachCourses) && teachCourses.length > 0 ? teachCourses[0]._id : null;

  useEffect(() => {
    console.log('Teacher ID:', currentUser._id);
    console.log('Teach Courses:', teachCourses);
    console.log('Current User Course:', currentUserCourse);

    if (!currentUserCourse) return;

    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Admin/courses/${currentUser._id}/${currentUserCourse}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [currentUser._id, currentUserCourse, teachCourses]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <h2>{course.title}</h2>
      <p>Description: {course.description}</p>
      {/* Render other course details here */}
    </div>
  );
};

export default ShowCourse;
