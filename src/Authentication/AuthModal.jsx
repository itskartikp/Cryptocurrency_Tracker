import { Button, ModalFooter, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from './Login';
import SignUp from './SignUp';
import { makeStyles } from '@material-ui/core';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

const useStyles = makeStyles({

    google: {

        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: 5,
        fontSize: 15

    },
});

const AuthModal = ({ alert, setAlert, user }) => {
    // const [alert, setAlert] = useState({
    //     open: true,
    //     message: "",
    //     type: "success",
    // });
    const classes = useStyles();

    const googleProvider = new GoogleAuthProvider();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then(res => {
            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${res.user.email}`,
                type: "success",
            });
        }).catch(error => {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
            return;
        })
        onClose();
    }



    return (
        <>
            <Button
                onClick={onOpen}
                style={{
                    color: "black",
                    backgroundColor: "goldenrod",
                    textAlign: "center",
                    cursor: "grab"
                }}
                variant="contained"
            >
                Login
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size='sm'>
                <ModalOverlay />
                <ModalContent style={{
                    backgroundColor: "rgb(88, 90, 92)",
                    color: "goldenrod.500",
                    fontWeight: "bold",
                }}>
                    <ModalHeader textAlign={"center"} style={{ color: "goldenrod" }}>Welcome to CryptoTracker!!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Tabs isFitted variant='enclosed'>
                            <TabList mb='1em'>
                                <Tab _selected={{ color: 'black', bg: 'goldenrod' }} >Login </Tab>
                                <Tab _selected={{ color: 'black', bg: 'goldenrod' }}>Sign Up</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Login alert={alert} setAlert={setAlert} onClose={onClose} />
                                    {/* <Alert alert={alert} setAlert={setAlert} /> */}
                                </TabPanel>
                                <TabPanel>
                                    <SignUp alert={alert} setAlert={setAlert} onClose={onClose} />
                                    {/* <Alert alert={alert} setAlert={setAlert} /> */}
                                </TabPanel>
                            </TabPanels>

                        </Tabs>
                    </ModalBody>
                    <ModalFooter className={classes.google}>
                        <span>OR</span>
                        <br />
                        <GoogleButton
                            style={{ width: "100%", outline: "none" }}
                            onClick={signInWithGoogle}
                        />

                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    );

}



export default AuthModal;
