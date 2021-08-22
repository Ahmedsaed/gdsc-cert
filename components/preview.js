import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import {
  IconButton,
  TextField,
  Paper,
  Box,
  Typography,
  InputAdornment,
  Button,
} from "@material-ui/core";
import GDSCCoreTeamCertification2021 from "./cert/GDSCCoreTeamCertification2021";
import { Link } from "react-router-dom";

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
    marginLeft: theme.spacing(1),
    flex: 1,
    minWidth: "300px",
  },
  iconButton: {
    padding: 10,
  },
}));

export default function Preview({ location }) {
  const [certCode, setCertCode] = useState("B15AC268EE25");
  const [name, setName] = useState(
    location?.state?.name || "Firstname Lastname"
  );
  const [university, setUniversity] = useState(
    location?.state?.university || "[university]"
  );
  const [signature, setSignature] = useState(
    location?.state?.signature || "Signature Here"
  );
  const [date, setDate] = useState(location?.state?.date || "July 23, 2021");
  const [leadUniversity, setLeadUniversity] = useState(
    location?.state?.leadUniversity || "[GDSC Lead Name, University Name]"
  );
  const [error, setError] = useState("");

  const classes = useStyles();
  const handleChange = (event) => {
    const text = event.target.value.toUpperCase();
    setCertCode(text);
    setError(!/^[A-Z0-9]*$/.test(text));
  };
  const handleClick = () => {
    let text = "";
    const possible = "0123456789ABCDEFGHIJKLM0123456789NOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 12; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    setCertCode(text);
  };

  const [width, setWidth] = useState(300);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth * 0.9);
    }
  }, []);

  return (
    <>
      <Paper style={{ margin: "50px" }} elevation={10}>
        <Box flexDirection="column" display="flex" alignItems="center" p={3}>
          <Typography variant="h5"> Preview new certificate</Typography>
          <TextField
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            className={classes.input}
            placeholder="name"
          />
          <TextField
            onChange={(e) => {
              setUniversity(e.target.value);
            }}
            value={university}
            className={classes.input}
            placeholder="university"
          />
          <TextField
            onChange={(e) => {
              setSignature(e.target.value);
            }}
            value={signature}
            className={classes.input}
            placeholder="signature"
          />
          <TextField
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={date}
            className={classes.input}
            placeholder="date"
          />
          <TextField
            onChange={(e) => {
              setLeadUniversity(e.target.value);
            }}
            value={leadUniversity}
            className={classes.input}
            placeholder="leadUniversity"
          />
          <Paper className={classes.textBox}>
            <TextField
              onChange={handleChange}
              value={certCode}
              className={classes.input}
              error={error}
              helperText={error && "only Letters and Numbers"}
              placeholder="certificate ID "
              inputProps={{
                maxLength: "12",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={handleClick} color="primary">
                      <AutorenewIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
          <Link
            to={{
              pathname: "/admin",
            }}
          >
            <Button color="primary" variant="contained">
              Create
            </Button>
          </Link>
        </Box>
      </Paper>
      <Box mb={2} style={{width: width - 20}}>
        <GDSCCoreTeamCertification2021
          id={certCode}
          name={name}
          university={university}
          signature={signature}
          date={date}
          leadUniversity={leadUniversity}
          style={{ width }}
          />
      </Box>
    </>
  );
}
