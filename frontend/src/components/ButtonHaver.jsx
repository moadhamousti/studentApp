import React from 'react';
import Button from '@mui/material/Button';

const ButtonHaver = ({ row }) => {
    // Define your button action logic here
    const handleButtonClick = () => {
        // Example action: Log the row data to the console
        console.log(row);
    };

    return (
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
            Click Me
        </Button>
    );
};

export default ButtonHaver;
