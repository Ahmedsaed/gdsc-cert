import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box } from "@material-ui/core";
import Particles from "react-particles-js";
import Preview from "../components/preview";
import { withRouter } from "next/router";

const auth = firebase.auth();

function App(props) {
    const [user, loading] = useAuthState(auth);
    const [state, setState] = React.useState(props.router.query);

	useEffect(() => {
		setState(props.router.query);
	}, [props.router.query]);

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
                        <Preview props={{ state: state }} />
                    )}
                </Box>
            )}
        </div>
    );
}

export default withRouter(App);
