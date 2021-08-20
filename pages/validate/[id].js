import { React, useState } from "react";
import { Box, Link, TextField, Button, Paper } from "@material-ui/core";
import Particles from "react-particles-js";

export default function Validate(context) {
  const [value, setValue] = useState(context?.params?.id);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        background:
          "radial-gradient(at 50% 100%, rgba(123, 22, 255, 0.75), rgb(15, 1, 94))",
        minHeight: "100vh",
      }}
    >
      <Particles
        params={{
          particles: {
            number: {
              value: 50,
            },
            size: {
              value: 3,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        }}
      />
      <Paper elevation={3}>
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          p={1}
          flexDirection="column"
        >
          <h1>Verify a certificate</h1>
          <TextField
            label="Enter Certificate ID"
            helperText="The Certificate ID can be found at the bottom of each certificate.."
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
          />

          <Box m={3} display="flex" justifyContent="flex-end">
            <Link href={`/c/${value}`}>
              <Button variant="contained" color="primary">
                Validate
              </Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
