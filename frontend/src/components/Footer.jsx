import {
  Box,
  Typography,
  Container,
  Grid
} from "@mui/material";

function Footer() {

  return (

    <Box
      sx={{
        background: "#0f172a",
        color: "white",
        mt: 8,
        py: 5,
        borderTop: "3px solid #f59e0b"
      }}
    >

      <Container>

        <Grid
          container
          spacing={4}
        >

          <Grid item xs={12} md={4}>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#f59e0b"
              }}
            >
              ANANTBUY
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Modern E-Commerce Platform
              built using React, FastAPI,
              PostgreSQL and Docker.
            </Typography>

          </Grid>

          <Grid item xs={12} md={4}>

            <Typography
              variant="h6"
              sx={{ mb: 2 }}
            >
              Quick Links
            </Typography>

            <Typography>
              Products
            </Typography>

            <Typography>
              Cart
            </Typography>

            <Typography>
              Login
            </Typography>

            <Typography>
              Register
            </Typography>

          </Grid>

          <Grid item xs={12} md={4}>

            <Typography
              variant="h6"
              sx={{ mb: 2 }}
            >
              Project Team
            </Typography>

            <Typography>
              Powered by AnantX Team
            </Typography>

            <Typography>
              CDAC Project 2026
            </Typography>

          </Grid>

        </Grid>

        <Typography
          align="center"
          sx={{
            mt: 5,
            pt: 3,
            borderTop:
              "1px solid rgba(255,255,255,0.2)"
          }}
        >
          © {new Date().getFullYear()}
          {" "}
          AnantBuy.
          All Rights Reserved.
        </Typography>

      </Container>

    </Box>

  );
}

export default Footer;
