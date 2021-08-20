import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import GDSCCoreTeamCertification2021 from "./cert/GDSCCoreTeamCertification2021";
const saveSvgAsPng = require("save-svg-as-png");

export default function Cert(params) {

  const [width] = useState(window.innerWidth * 0.9);

  return (
    <Box
      display="flex"
      flexDirection="column"
      pt={3}
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#9e9e9e",
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWU5ZTllIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=")`,
      }}
    >
        <>
          {/* <Helmet>
            <title>{`${value.name} - certificate`}</title>
            <meta
              name="description"
              content={`${value.name} - core team 2020-2021 certificate`}
            />
          </Helmet> */}
          <GDSCCoreTeamCertification2021
            {...params}
            style={{ width }}
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
        </>
    </Box>
  );
}
