import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Admin from "../components/admin";
import Login from "../components/login";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box } from "@material-ui/core";
import Particles from "react-particles-js";

import SuperAdmin from "../components/superAdmin";

const auth = firebase.auth();

export default function App() {
	const [user, loading] = useAuthState(auth);

    const background_style = {
        background:
            "radial-gradient(at 50% 100%, rgba(123, 22, 255, 0.75), rgb(15, 1, 94))",
        minHeight: "100vh",
    };

    const particles_background = (
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
    );

	return (
		<div suppressHydrationWarning>
            {typeof window === "undefined" ? null : (
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    style={background_style}
                >
                    {typeof window !== "undefined" && particles_background}

                    {loading ? (
                        <>Loading</>
                    ) : (
                        <SuperAdmin user={user} />
                    )}
                </Box>
            )}
        </div>
	);
}
