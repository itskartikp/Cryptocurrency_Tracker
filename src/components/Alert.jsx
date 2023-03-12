import { Snackbar } from '@material-ui/core';
import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

// const Alert = ({ alert, setAlert }) => {
const Alert = ({ alert, setAlert }) => {


    // const [temp, setTemp] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert({
            open: false,
            // meassge: "",
            // type: "info"
        });
        // console.log(alert.meassge);
    };

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <MuiAlert
                onClose={handleClose}
                elevation={10}
                variant="filled"
                severity={alert.type}

            >
                {alert.message}
            </MuiAlert>

        </Snackbar>
    )
}

export default Alert;
