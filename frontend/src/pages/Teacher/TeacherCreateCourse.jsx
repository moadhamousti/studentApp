import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubjects } from '../../redux/subjectRelated/subjectHandle'; // Update the path to your subject slice
import { useNavigate } from 'react-router-dom';

const TeacherCreateCourse = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const teacherID = currentUser ? currentUser._id : '';
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  // State variables
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    article: '',
    subject: '', // Add subject field to formData
  });
  const [userName, setUserName] = useState('');

  // Fetch subjects on component mount
  useEffect(() => {
    dispatch(fetchSubjects())
      .then((response) => {
        console.log('Fetched subjects:', response.payload);
        setSubjects(response.payload);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  }, [dispatch]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Quill editor changes
  const handleEditorChange = (content) => {
    setFormData({ ...formData, article: content });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseData = { 
        ...formData, 
        teacher: teacherID,
        school: currentUser.school,
        subject: formData.subject
      };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/Teacher/addcourse/${courseData.teacher}`, courseData);
      console.log('Course created successfully:', response.data);
      // Navigate after successful course creation
      navigate('/Teacher/courses');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  // Set user name on component mount
  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.name);
    }
  }, [currentUser]);

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Course
      </Typography>
      <TextField
        name="teacher"
        label="Teacher"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        fullWidth
        disabled
      />
      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        required
      />
      <ReactQuill
        value={formData.article}
        onChange={handleEditorChange}
      />
      <FormControl fullWidth>
        <InputLabel id="subject-label">Subject</InputLabel>
        <Select
          labelId="subject-label"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        >
          {subjects
            .filter(subject => subject.subName !== 'Guest Subject')
            .map(subject => (
              <MenuItem key={subject._id} value={subject._id}>{subject.subName}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Create Course
      </Button>
    </form>
  );
};

export default TeacherCreateCourse;