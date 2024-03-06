import React, { useState } from 'react';
import axios from 'axios';

const StudentProfile = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', image);

            // Log FormData before sending the request
            console.log('Form Data:', formData);

            const response = await axios.post('http://localhost:5000/student/profile/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Log the response data if the request succeeds
            console.log('Response:', response.data);

            // Display success message or update UI as needed
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <h1>Student Profile</h1>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Upload Image</button>
            {/* Display other student info */}
        </div>
    );
};

export default StudentProfile;

