import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Paper,
    Box,
    Typography,
    Button,
    List,
    ListItem,
    Divider,
} from "@material-ui/core";
import firebase from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#F5F5F5",
    },
    textBox: {
        margin: "20px",
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 330,
    },
    input: {},
    iconButton: {
        padding: 10,
    },
}));

export default function SuperAdmin({ user }) {
    const [value, loading] = useCollection(
        firebase.firestore().collection("users").orderBy("cert")
    );

    const [disabled, setDisabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const [needAccess, loadingNeedAccess] = useCollection(
        firebase.firestore().collection("needAccess")
    );

    const [id, setID] = useState("");

    const classes = useStyles();

    function handleRequestApproval() {
        setDisabled(true);
        const db = firebase.firestore();
        // Get a new write batch
        var batch = db.batch();
        let certRef = db
            .collection("users")
            .doc(needAccess.docs[selectedIndex].id);
        batch.set(certRef, { cert: id });

        let deletetRef = db
            .collection("needAccess")
            .doc(needAccess.docs[selectedIndex].id);
        batch.delete(deletetRef);

        // Commit the batch
        batch.commit().then(() => {
            setDisabled(false);
            setID("");
        });
    }

    const UsersList = (
        <>
            <Box
                flexDirection="column"
                display="flex"
                alignItems="center"
                p={3}
            >
                <Typography variant="h5"> Users {value.docs.length}</Typography>
                {value.docs.map((doc) => (
                    <React.Fragment key={doc.id}>
                        <Box
                            display="flex"
                            width="100%"
                            justifyContent="space-between"
                        >
                            <Typography style={{ wordBreak: "break-all" }}>
                                {doc.id}
                            </Typography>
                            <Typography>{doc.data().cert}</Typography>
                        </Box>
                    </React.Fragment>
                ))}
            </Box>
            ;
        </>
    );

    const AccessApprovalList = needAccess.docs.length > 0 && (
        <span>
            <Typography variant="h5">
                {" "}
                need Access {needAccess.docs.length}
            </Typography>
            <List component="nav" aria-label="main mailbox folders">
                {needAccess.docs.map((doc, indx) => (
                    <React.Fragment key={doc.id}>
                        <ListItem
                            button
                            selected={selectedIndex === indx}
                            onClick={(event) =>
                                handleListItemClick(event, indx)
                            }
                        >
                            <Box
                                display="flex"
                                width="100%"
                                justifyContent="space-between"
                            >
                                <Typography
                                    style={{
                                        wordBreak: "break-all",
                                    }}
                                >
                                    {doc.id}
                                </Typography>
                            </Box>
                        </ListItem>

                        <Divider />
                    </React.Fragment>
                ))}
            </List>
            <TextField
                onChange={(e) => setID(e.target.value)}
                value={id}
                className={classes.input}
                label="new id"
                placeholder="AA"
            />
            <Button
                disabled={disabled}
                onClick={handleRequestApproval}
                color="primary"
                variant="contained"
            >
                submit
            </Button>
        </span>
    );

    const NoAccessWarning = (
        <>
            <Typography style={{ color: "white" }}>
                {`You Don't have Ahmed's rights`}
                <br />
                {`Contact Ahmed Hany, Your Email : `}
                <br />
                {`${user.email}`}
            </Typography>
            <Button
                onClick={() => {
                    firebase.auth().signOut();
                }}
            >
                Log out
            </Button>
        </>
    );

    return (
        <>
            {loading ? (
                <>Loading...</>
            ) : value ? (
                <>
                    <Paper style={{ margin: "50px" }} elevation={10}>
                        {UsersList}
                        {loadingNeedAccess ? (
                            <>Loading...</>
                        ) : (
                            AccessApprovalList
                        )}
                    </Paper>
                </>
            ) : (
                NoAccessWarning
            )}
        </>
    );
}
