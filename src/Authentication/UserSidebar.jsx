import * as React from 'react';

// import Drawer from '@mui/material/Drawer';
import { Avatar, Button, Drawer, makeStyles } from '@material-ui/core';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { AiFillDelete } from 'react-icons/ai'
import { doc, setDoc } from 'firebase/firestore';
// import Coins from '../components/Coins';
// import { useStyles } from '@chakra-ui/react';
// import Button from '@mui/material/Button';
// import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        // fontFamily: "monospace"
        backgroundColor: "#212529"
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
        // fontFamily: "monospace"
        // backgroundColor: "#212529"
    },
    picture: {
        width: 200,
        height: 200,
        cursor: "pointer",
        // padding: 25
        backgroundColor: "goldenrod",
        objectFit: "contain"
    },
    logout: {
        width: "100%",
        height: "8%",
        cursor: "pointer",
        // padding: 25
        backgroundColor: "goldenrod",
        marginTop: 20
    },
    watchlist: {
        width: "100%",
        height: "8%",
        cursor: "pointer",
        // padding: 25
        backgroundColor: "grey",
        marginTop: 20,
        flex: 1,
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
        color: "wheat"
    },
    coin: {
        width: "100%",
        // height: "8%",
        padding: 10,
        borderRadius: 5,
        color: "black",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "goldenrod",
        boxShadow: "0 0 3px black"
    },


});




const UserSidebar = ({ user, alert, setAlert, watchlist }) => {

    const classes = useStyles();

    const [state, setState] = React.useState({
        right: false,
    });


    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef,
                // { coins: watchlist.filter((watch) => watch !== coin?.id) },
                { coins: watchlist.filter((watch) => watch !== coin) },
                { merge: "true" }
            );
            setAlert({
                open: true,
                message: `${coin} Removed from the Watchlist !`,
                type: "success",
            });

        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }

    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth);
        setAlert({
            open: true,
            message: "Log out Successfull !",
            type: "Success",
        });
        toggleDrawer();
    }

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            marginRight: 15,
                            cursor: "pointer",
                            backgroundColor: "gold",
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div className={classes.container}>
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.picture}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    style={{
                                        width: "100%",
                                        fontSize: 20,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                        color: "wheat",

                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <div className={classes.watchlist}>
                                    <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                                        WatchList
                                    </span>
                                    {
                                        // console.log(watchlist)
                                        // watchlist[0]
                                        // "fff"
                                        // watchlist.data()
                                        watchlist.map((coin) => (
                                            // if (watchlist.includes(coin.id))
                                            // return (
                                            <div className={classes.coin}>
                                                <span>
                                                    {coin}
                                                </span>

                                                <span
                                                    style={{ display: "flex", gap: 8 }}
                                                >
                                                    <AiFillDelete style={{ cursor: "pointer" }}
                                                        fontSize="16"
                                                        onClick={() => removeFromWatchlist(coin)}
                                                    />
                                                </span>

                                            </div>
                                            // );
                                            // console.log(i);
                                            // { i }
                                        ))
                                    }

                                </div>

                            </div>
                            <Button
                                variant="contained"
                                className={classes.logout}
                                onClick={logOut}


                            >
                                Log Out
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
};

export default UserSidebar;