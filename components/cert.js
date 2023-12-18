import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import GDSCCoreTeamCertification2021 from "./cert/GDSCCoreTeamCertification2021";
import Head from "next/head";
const saveSvgAsPng = require("save-svg-as-png");

export default function Cert(params) {
  const [width, setWidth] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  }, []);

  console.log("stage 3"); // debugging purposes

  return width ? (
    <Box
      pt={3}
      style={{
        width: width - 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Head>
        <meta name="color-scheme" content="normal" />
        <style>
          {
            'body { background-color: #9e9e9e; background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWU5ZTllIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4="); }'
          }
        </style>
      </Head>
      <GDSCCoreTeamCertification2021
        {...params}
        style={{ width: width * 0.9 }}
      />
      <Box m={5}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            saveSvgAsPng.saveSvgAsPng(
              document.getElementById("certificate"),
              "certificate.png",
              {
                scale: 2,
                encoderOptions: 1,
                backgroundColor: "white",
              }
            );
          }}
        >
          Download
        </Button>
      </Box>
    </Box>
  ) : (
    <>
      <h1>
        Please use a browser that supports SVGs, like Chrome, Firefox, or
        Safari.
      </h1>
    </>
  );
}
