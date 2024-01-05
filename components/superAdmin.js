import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";
import styles from "../styles/SuperAdmin.module.css";

export default function SuperAdmin({ user }) {
    const [value, loading, error] = useCollection(
        firebase.firestore().collection("users").orderBy("cert")
    );

    useEffect(() => {
        if (!loading && value) {
          // The data is loaded, and you can perform actions with the 'value' here
          console.log("Data loaded:", value);
        }
    }, [loading, value]);

    const [disabled, setDisabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const [needAccess, loadingNeedAccess] = useCollection(
        firebase.firestore().collection("needAccess")
    );

    useEffect(() => {
        if (!loadingNeedAccess && needAccess) {
            // The data is loaded, and you can perform actions with the 'value' here
            console.log("Data loaded:", needAccess);
            }
    }, [loadingNeedAccess, needAccess]);

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

    const UsersList = (value) => (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h5> Users {value.docs.length}</h5>
                {value.docs.map((doc) => (
                    <div key={doc.id}>
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                            }}
                        >
                            <p style={{ wordBreak: "break-all" }}>
                                {doc.id}
                            </p>
                            <p>{doc.data().cert}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    const AccessApprovalList = (needAccess) => needAccess.docs.length > 0 && (
        <span>
            <h5>
                {" "}
                need Access {needAccess.docs.length}
            </h5>
            <List component="nav" aria-label="main mailbox folders">
                {needAccess.docs.map((doc, indx) => (
                    <div key={doc.id}>
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
                    </div>
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
                {`You Don't have SuperAdmin rights`}
                <br />
                {`Contact Ahmed Saed, Your Email : `}
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
                    <div style={{ margin: "50px" }}>
                        {UsersList(value)}
                        {loadingNeedAccess ? (
                            <>Loading...</>
                        ) : (
                            AccessApprovalList(needAccess)
                        )}
                    </div>
                </>
            ) : (
                NoAccessWarning
            )}
        </>
    );
}
