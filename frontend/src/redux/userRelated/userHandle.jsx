import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getRequest,
    getFailed,
    getError,
    setImageUrl,
    deleteUserComplaints,
    getDeleteSuccess,
    fetchCoursesSuccess, 
    
} from './userSlice';

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';


export const uploadImageRequest = (imageData) => ({
    type: UPLOAD_IMAGE_REQUEST,
    payload: imageData,
});

export const uploadImageSuccess = (imageUrl) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    payload: imageUrl,
});

export const uploadImageFailure = (error) => ({
    type: UPLOAD_IMAGE_FAILURE,
    payload: error,
});

export const uploadImage = (imageData) => async (dispatch) => {
    // Dispatch the upload image request action
    dispatch(authRequest());

    try {
        // Perform your image upload request using Axios or any other HTTP client
        const result = await axios.post('YOUR_UPLOAD_ENDPOINT', imageData, {
            // Add your request headers if needed
        });

        // Dispatch the setImageUrl action with the uploaded image URL
        dispatch(setImageUrl(result.data.imageUrl)); // Adjust this line according to your server response
    } catch (error) {
        // Dispatch the error action if the upload fails
        dispatch(authError(error.message));
    }
};


export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
            if (result.data.courses) {
                dispatch(fetchCoursesSuccess(result.data.courses));
            }
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(error.message));
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role.toLowerCase()}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
            if (result.data.courses) {
                dispatch(fetchCoursesSuccess(result.data.courses));
            }
        } else if (result.data.school) {
            dispatch(stuffAdded());
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(error.message));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message)); // Dispatching only the error message
    }
}

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(deleteUserComplaints(id)); // Dispatch deleteUserComplaints action to delete associated complaints
            dispatch(getDeleteSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};




export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        }
        else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message)); // Dispatching only the error message
    }
}

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(error.message)); // Dispatching only the error message
    }
};








// userHandle.js


// Async action creator to update profile picture
export const updateUserProfilePicture = (studentId, formData) => async (dispatch) => {
  dispatch(uploadImageRequest());

  try {
    const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/Student/profile/upload-image/${studentId}`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
    const { profilePicture } = response.data;
    dispatch(uploadImageSuccess(profilePicture));
    return response.data; // Return response for handling success in component
  } catch (error) {
    dispatch(uploadImageFailure(error.message));
    throw error; // Throw error for handling in component
  }
};


