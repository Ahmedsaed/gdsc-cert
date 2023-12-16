import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Paper, Box, Typography, Button } from "@material-ui/core";
import firebase from "firebase/app";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { Link, useLocation } from "react-router-dom";
import Preview from "./preview";
import SuperAdmin from "./superAdmin";

const year = "2023 - 2024";

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
  input: {
    marginBottom: theme.spacing(1),
    flex: 1,
    minWidth: "415px",
  },
  iconButton: {
    padding: 10,
  },
}));

export default function Admin({ user }) {
  const location = useLocation();

  const [value, loading] = useDocumentDataOnce(
    firebase.firestore().collection("users").doc(user.email)
  );

  useEffect(() => {
    if (!loading && !value?.cert) {
      firebase.firestore().collection("needAccess").doc(user.email).set({
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  }, [loading, value, user.email]);
  const prefix = value?.cert;
  const [names, setNames] = useState("");
  const [result, setResult] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [line3, setLine3] = useState(
    `GDSC MUST for the ${year} academic year.`
  );
  const [title, setTitle] = useState(`${year} GDSC Core Team Member`);
  const [line2, setLine2] = useState(
    "serving as a Google Developer Student Club Core Team Member at"
  );
  const [signature, setSignature] = useState("Ahmed Saed");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  );
  const [leadUniversity, setLeadUniversity] = useState(
    "Google Developer Student Clubs Lead, Misr University For Science And Technology"
  );

  const classes = useStyles();

  const generateRandomID = (prefix) => {
    let text = prefix;
    const possible = "0123456789ABCDEFGHIJKLM0123456789NOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const timeLeft = (26 - new Date().getUTCHours()) % 24;

  return location.pathname === "/admin" ? (
    <>
      {loading ? (
        <>Loading...</>
      ) : prefix ? (
        <>
          <Paper style={{ margin: "50px" }} elevation={10}>
            <Box
              flexDirection="column"
              display="flex"
              alignItems="center"
              p={3}
            >
              <Typography variant="h5"> Create new certificates</Typography>
              {!result ? (
                <>
                  <TextField
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                    className={classes.input}
                    label="title"
                    placeholder={`${year} GDSC Core Team Member`}
                  />
                  <TextField
                    onChange={(e) => {
                      setLine2(e.target.value);
                    }}
                    value={line2}
                    className={classes.input}
                    label="Line2"
                    placeholder="serving as a Google Developer Student Club Core Team Member at"
                  />
                  <TextField
                    onChange={(e) => {
                      setLine3(e.target.value);
                    }}
                    value={line3}
                    className={classes.input}
                    label="Line 3"
                    placeholder={`Aswan University for the ${year} academic year.`}
                  />
                  <TextField
                    onChange={(e) => {
                      setSignature(e.target.value);
                    }}
                    value={signature}
                    label="Signature"
                    className={classes.input}
                    placeholder="Ahmed Hany"
                  />
                  <TextField
                    onChange={(e) => {
                      setLeadUniversity(e.target.value);
                    }}
                    value={leadUniversity}
                    className={classes.input}
                    label="Position"
                    placeholder="Google Developer Student Clubs Lead, Aswan University"
                  />
                  <TextField
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    value={date}
                    label="Date"
                    className={classes.input}
                    placeholder={new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  />
                  <TextField
                    onChange={(e) => {
                      setNames(e.target.value);
                    }}
                    label="members names"
                    value={names}
                    multiline
                    className={classes.input}
                    placeholder={"Core Member1\r\nCore Member2\r\nCore Member3"}
                  />
                  <Box
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                  >
                    <Link
                      style={{ textDecoration: "none" }}
                      to={{
                        pathname: "/preview",
                        state: {
                          name: names.split(/\r?\n/)[0],
                          line3,
                          signature,
                          date,
                          leadUniversity,
                        },
                      }}
                    >
                      <Button disabled={disabled} variant="contained">
                        Preview
                      </Button>
                    </Link>
                    <Button
                      disabled={disabled}
                      onClick={() => {
                        setDisabled(true);
                        const db = firebase.firestore();
                        names.split(/\r?\n/).forEach((name) => {
                          const id1 = generateRandomID(prefix);
                          let certRef = db
                            .collection("cert")
                            .doc(prefix)
                            .collection("core21")
                            .doc(id1);

                          db.runTransaction((transaction) => {
                            return transaction.get(certRef).then((cert) => {
                              if (cert.exists) {
                                throw new Error("Document does exist!");
                              }
                              transaction.set(certRef, {
                                title,
                                line2,
                                name,
                                line3,
                                signature,
                                date,
                                leadUniversity,
                                created:
                                  firebase.firestore.FieldValue.serverTimestamp(),
                              });
                              return { name, id1 };
                            });
                          })
                            .then(({ name, id1 }) => {
                              const finalResult = `${name}\r\nhttps://gdsc23-cert.web.app/c/${id1}\r\n`;
                              setResult((r) => r + finalResult);
                            })
                            .catch((err) => {
                              console.error(err);
                            });
                        });
                        // I have no idea of what is this cloudflare worker doing
                        // fetch(
                        //   "https://github.dev-ahmedhany.workers.dev/gdsc-cert"
                        // );
                      }}
                      color="primary"
                      variant="contained"
                    >
                      submit
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography>
                    <br />
                    Make Sure to copy these links
                    <br />
                    currently no way to get them back
                    <br />
                    <br />
                    Url Preview will work after 2 min
                    <br />
                    Please wait then send the certificates
                  </Typography>
                  <TextField
                    label="Results"
                    value={result}
                    multiline
                    className={classes.input}
                  />
                </>
              )}
            </Box>
          </Paper>
        </>
      ) : (
        <>
          <Typography style={{ color: "white" }}>
            {`You Don't have Admin rights`}
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
      )}
    </>
  ) : location.pathname === "/ahmed" ? (
    <SuperAdmin user={user} />
  ) : (
    <Preview location={location} />
  );
}
