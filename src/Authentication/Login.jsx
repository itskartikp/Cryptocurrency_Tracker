// import { Box, Button, FormControl, FormHelperText, FormLabel, Input, VStack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { TextField, Button } from '@material-ui/core';
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";

const Login = ({ alert, setAlert, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        // setFlag(true);
        if (!email || !password) {
            // console.log("hello");
            setAlert({
                open: true,
                message: "Please Fill All the Fields!!",
                type: "error",
            });
            return;
        }
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log("in the log in ");
            console.log(result);

            setAlert({
                open: true,
                message: `Log In Successful. Welcome back ${result.user.email}`,
                type: "success",
            });

            // onClose()

        } catch (error) {

            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
            return;
        }

        onClose();
    }


    return (
        <>
            <Box
                p={3}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
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

                <Button
                    variant="contained"
                    size="large"
                    style={{ backgroundColor: "goldenrod", borderRadius: 10 }}
                    onClick={handleSubmit}
                >
                    Log In
                </Button>


            </Box>

        </>
    )
}

export default Login;
