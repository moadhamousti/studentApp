// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import TableTemplate from '../../../components/TableTemplate';
// import { getCoursesByTeacher } from '../../../redux/courseRelated/courseHandle'; // Import the action creator
// import { BlueButton } from '../../../components/buttonStyles';

// function ShowCourses() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [courses, setCourses] = useState([]);
//   const teachers = useSelector(state => state.teachers); // Assuming you have a teachers reducer in your Redux store

//   useEffect(() => {
//     // Fetch course list for each teacher when component mounts
//     teachers.forEach(teacher => {
//       dispatch(getCoursesByTeacher(teacher.id)); // Dispatch action to fetch courses for each teacher
//     });
//   }, [dispatch, teachers]);

//   const columns  = [
//     { header: 'Teacher ID', accessor: 'id' },
//     { header: 'Teacher Name', accessor: 'name' },
//     { header: 'Course Count', accessor: 'courseCount' },
//   ];

//   const viewCourseDetails = (teacherID) => {
//     navigate(`/Admin/courses/${teacherID}`);
//   };

//   const rows = courses.map((course) => ({
//     title: course.title,
//     description: course.description,
//     actions: (
//       <BlueButton
//         variant="contained"
//         onClick={() => viewCourseDetails(course._id)}
//       >
//         View
//       </BlueButton>
//     )
//   }));

//   return (
//     <div>
//       <h2>Teachers and their Courses</h2>
//       {Array.isArray(courses) && courses.length > 0 && 
//         <TableTemplate columns={columns} rows={rows} />
//       }
//     </div>
//   );
// }

// export default ShowCourses;


import React from 'react'

function ShowCourses() {
  return (
    <div>ShowCourses</div>
  )
}

export default ShowCourses
