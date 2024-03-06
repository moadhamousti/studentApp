const Course = require('../models/courseSchema');

// controller:

const getCourseDetails = async (req, res) => {
    try {
        const courseId = req.params.courseId; 
        console.log('Received courseId:', courseId);

        // Find the course by its ID
        const course = await Course.findById(courseId);

        // Check if the course exists
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Send the course details in the response
        res.status(200).json(course); // Return the entire course object
    } catch (error) {
        console.error('Error fetching course details:', error);
        res.status(500).json({ message: 'Error fetching course details' });
    }
};








  
const courseCreate = async (req, res) => {
    try {
        const { title, description, article, teacher, school } = req.body;

        // Check if required fields are provided
        if (!title || !description || !teacher || !school) {
            const missingFields = [];
            if (!title) missingFields.push('title');
            if (!description) missingFields.push('description');
            if (!teacher) missingFields.push('teacher');
            if (!school) missingFields.push('school');

            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Create the course object
        const newCourse = new Course({ title, description, article, teacher, school });

        // Save the course to the database
        const savedCourse = await newCourse.save();

        // Send a success response
        res.status(201).json(savedCourse);
    } catch (error) {
        // Check if the error is a validation error
        if (error.name === 'ValidationError') {
            // Handle validation errors
            return res.status(400).json({ message: error.message });
        }
        // Log other errors
        console.error('Error creating course:', error);
        // Send an error response
        res.status(500).json({ message: 'Error creating course' });
    }
};






const courseList = async (req, res) => {
    try {
        const teacherID = req.params.teacherID; // Retrieve the teacher ID from the request parameters
        // Retrieve all courses for the specified teacher
        const courses = await Course.find({ teacher: teacherID });
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Error fetching courses' });
    }
};





const StudentcourseList = async (req, res) => {
    try {
        const studentID = req.params.studentID; // Retrieve the student ID from the request parameters
        // Retrieve all courses for the specified student
        const courses = await Course.find({ student: studentID });
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Error fetching courses' });
    }
};

const deleteCourse = async (req, res) => {
    try {
      const courseId = req.params.courseID;
      
      // Find the course by ID and delete it
      const deletedCourse = await Course.findByIdAndDelete(courseId);
      
      if (!deletedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }
      
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ message: 'Error deleting course' });
    }
  };

module.exports = { getCourseDetails ,courseCreate, courseList, StudentcourseList, deleteCourse};