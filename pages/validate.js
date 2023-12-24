import React, { useEffect, useState } from "react";
import { Box, Link, TextField, Button, Paper } from "@material-ui/core";
import Particles from "react-particles-js";

export default function Validate() {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const id = window.location.pathname.split("/").pop();
            setValue(id === "validate" ? "" : id);
        }
    }, []);

    const background_style = {
        background:
            "radial-gradient(at 50% 100%, rgba(123, 22, 255, 0.75), rgb(15, 1, 94))",
        minHeight: "100vh",
    };

    const handle_id_change = (e) => {
        setValue(e.currentTarget.value);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={background_style}
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
                        onChange={handle_id_change}
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
