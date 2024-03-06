import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseDetails } from '../../redux/courseRelated/courseHandle';

const TeacherCourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseDetails = useSelector((state) => state.course.courseDetails);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) return;

      try {
        setLoading(true);
        setError(null);
        await dispatch(getCourseDetails(courseId));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, dispatch]);

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
