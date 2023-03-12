// import { Alert, AlertIcon } from '@chakra-ui/react';
// import { Alert, AlertIcon, Button, FormControl, FormHelperText, FormLabel, Input, VStack } from '@chakra-ui/react';
// import { type } from '@testing-library/user-event/dist/type';
// import { useEffect } from 'react';
// import Alert from '../components/Alert';
import { Box, TextField, Button } from '@material-ui/core';
import React, { useState } from 'react'
import '../App.css'
import { createUserWithEmailAndPassword } from "@firebase/auth"
import { auth } from "../firebase"
// import Alert from '../components/Alert';

const SignUp = ({ alert, setAlert, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [flag, setFlag] = useState(false);


    const handleSubmit = async () => {
        // setFlag(true);
        if (password !== confirmPassword) {
            // console.log("hello");
            setAlert({
                open: true,
                message: "Passwords Do not Match",
                type: "error",
            });
            // setFlag(false);
            return;
        }

        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log("\n IN the sign up");
            console.log(result);

            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${result.user.email}`,
                type: "success",
            });
            // <Alert alert={alert} setAlert={setAlert} />

            // setFlag(false);
            // onClose();

        } catch (error) {

            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
            // setFlag(false);
            return;
        }

        onClose();
    }

    return (
        <>

            <Box Box
                p={3}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }
                }
            >
                <TextField
                    variant="outlined"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                />

                <Button
                    variant="contained"
                    size="large"
                    style={{ backgroundColor: "goldenrod", borderRadius: 10 }}
                    onClick={handleSubmit}
                >
                    Sign Up
                </Button>
            </Box>
            {/* {flag === true ?
                <> <Alert alert={alert} setAlert={setAlert} /> </>
                :
                <>
                </>
            } */}
        </>
    )
}

export default SignUp;

