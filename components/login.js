import React from "react";
import { Box, Button } from "@material-ui/core";
import Particles from "react-particles-js";
import firebase from "firebase/app";

export default function Login() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .catch((e) => {
                if (e.code === "auth/popup-blocked") {
                    firebase.auth().signInWithRedirect(provider);
                }
            });
    };

    return (
        <>
            <Button
                variant="contained"
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                    border: "rgba(0,125,255,0.5) solid 1px",
                    color: "#007DFF",
                    textTransform: "capitalize",
                    width: "210px",
                }}
                startIcon={
                    <img
                        src="google-logo.png"
                        alt="Google Logo"
                        style={{ height: "24px", marginRight: "-4px" }}
                    />
                }
                onClick={signInWithGoogle}
            >
                <h4
                    style={{
                        fontWeight: 500,
                        fontSize: "15px",
                        lineHeight: "26px",
                        letterSpacing: "0.46px",
                        margin: "2px 0px",
                    }}
                >
                    Sign In With Google
                </h4>
            </Button>
        </>
    );
}
