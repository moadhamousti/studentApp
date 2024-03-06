// CourseForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCourse } from '../redux/courseRelated/courseHandle';
import { TextField, Button } from '@mui/material';

const CourseForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    attachment: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCourse(formData));
    // Reset form after submission if needed
    setFormData({ title: '', description: '', attachment: null });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
        onChange={handleFileChange}
      />
      <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
        Create Course
      </Button>
    </form>
  );
};

export default CourseForm;
