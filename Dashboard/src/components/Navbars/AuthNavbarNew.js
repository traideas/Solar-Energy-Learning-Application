import React from "react";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";

import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";

import Clear from "@material-ui/icons/Clear";
/* import Dashboard from "@material-ui/icons/Dashboard"; */
import MenuIcon from "@material-ui/icons/Menu";

export default function AuthNavbarNew() {
  const theme = useTheme();
  return (
    <>
      <Box
        component={Grid}
        container
        style={{ marginTop: "2rem", minHeight: "96.8vh" }}
      >
        <Grid item xs={11} lg={11} md={11} style={{ margin: "auto" }}>
          <Box>
            <img
              src={require("assets/img/brand/MyREL-White.png").default}
              alt="MyRELL"
              style={{
                width: "100px",
              }}
            />
          </Box>
          <Box
            style={{
              color: theme.palette.white.main,
            }}
          >
            <h1>Welcome to</h1>
            <Box style={{ fontSize: "24px", fontWeight: 700 }}>
              <h1>MyREL (Malaysian Renewable Energy Laboratory)</h1>
            </Box>
          </Box>
          <Box style={{ fontSize: "16px", marginBottom:"2rem", color: theme.palette.dark.dark, lineHeight: 1.8}}>
            <p>
              <b>MyREL (Malaysian Renewable Energy Laboratory)</b> is a
              web-based application system developed for the purpose of creating
              awareness and promoting interest for Secondary School students in
              renewable energy related field. This, system aims to use
              Interdisciplinary and blended/hybrid learning and teaching
              approach to develop holistic citizen of the future and also to
              monitor and sustain the students’ interest towards STEM education.
              This system is part of the project titled{" "}
              <b>
                “Effective Learning on Solar Energy Technologies through
                Mobile-Research-Laboratory for Secondary Schools in Urban and
                Rural Areas”
              </b>
              . A huge thank you to “Ministry of Education” and “Ministry of
              Higher Education” Malaysia and “Universiti Kebangsaan Malaysia”
              for their continuous support in developing and deploying this
              system.
            </p>
          </Box>
          <Box>
            <Box
              component={Grid}
              container
              style={{ width: "100%", margin: 0, marginBottom: "2rm" }}
            >
              <Grid item xs={12} lg={4} md={4}>
                <Box style={{ textAlign: "center" }}>
                  <img
                    src={require("assets/img/partner/1.png").default}
                    alt="MyRELL"
                    style={{
                      width: "100%",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <Box style={{ textAlign: "center" }}>
                  <img
                    src={require("assets/img/partner/3.png").default}
                    alt="MyRELL"
                    style={{
                      width: "100%",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <Box style={{ textAlign: "center" }}>
                  <img
                    src={require("assets/img/partner/2.png").default}
                    alt="MyRELL"
                    style={{
                      width: "100%",
                    }}
                  />
                </Box>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
