import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteSubject = createAsyncThunk(
  'sclass/deleteSubject',
  async (subjectId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/Subject/${subjectId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSubjects = createAsyncThunk(
  'subject/fetchSubjects',
  async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Subject`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
