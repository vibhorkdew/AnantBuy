import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const categories = [
    { name: "Electronics", image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg" },
    { name: "Laptops", image: "https://images.pexels.com/photos/18105/pexels-photo.jpg" },
    { name: "Audio", image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg" },
    { name: "Watches", image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" },
    { name: "Gaming", image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg" },
    { name: "Fashion", image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg" }
  ];

  const featuredProducts = [
    { name: "iPhone 16 Pro", price: "₹1,29,999", image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg" },
    { name: "MacBook Air", price: "₹89,999", image: "https://images.pexels.com/photos/18105/pexels-photo.jpg" },
    { name: "Sony Headphones", price: "₹12,999", image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg" },
    { name: "Gaming Controller", price: "₹5,999", image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg" }
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg,#020617,#0f172a,#111827)",
        minHeight: "100vh"
      }}
    >
      {/* HERO */}
      <Box
        sx={{
          minHeight: "85vh",
          background: `radial-gradient(
            circle at top left,
            rgba(37,99,235,.25),
            transparent 35%
          ),
          radial-gradient(
            circle at top right,
            rgba(245,158,11,.15),
            transparent 30%
          ),
          linear-gradient(
            135deg,
            #020617,
            #081028,
            #0f172a
          )`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 4, md: 12 },
          flexWrap: "wrap"
        }}
      >
        <Box sx={{ maxWidth: "600px" }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 800,
              lineHeight: 1.1,
              fontSize: {
                xs: "3rem",
                md: "4.4rem"
              },
              mb: 2
            }}
          >
            <span style={{ color: "#38bdf8" }}>AnantBuy</span>
            <br />
            <span style={{ color: "white" }}>
              Enterprise Shopping Platform
            </span>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "#94a3b8",
              mb: 4
            }}
          >
            Secure, scalable and containerized e-commerce platform powered by AnantX DevSecOps.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              mr: 2,
              background: "#f59e0b",
              "&:hover": {
                background: "#d97706"
              }
            }}
            onClick={() => navigate("/products")}
          >
            Shop Now
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              color: "#f59e0b",
              borderColor: "#f59e0b",
              "&:hover": {
                background: "#f59e0b",
                color: "#fff"
              }
            }}
            onClick={() => navigate("/register")}
          >
            Join Now
          </Button>

          {/* CHIPS */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 4,
              flexWrap: "wrap"
            }}
          >
            <Chip label="🔒 Secure Login" color="warning" />
            <Chip label="⚡ Fast Checkout" color="warning" />
            <Chip label="🛡 JWT Authentication" color="warning" />
            <Chip label="📦 Live Inventory" color="warning" />
          </Box>

          {/* STATS */}
          <Box
            sx={{
              display: "flex",
              gap: 6,
              mt: 6
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: "#f59e0b",
                  fontWeight: 700
                }}
              >
                150+
              </Typography>
              <Typography color="white">Products</Typography>
            </Box>

            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: "#f59e0b",
                  fontWeight: 700
                }}
              >
                8
              </Typography>
              <Typography color="white">Categories</Typography>
            </Box>

            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: "#f59e0b",
                  fontWeight: 700
                }}
              >
                99.9%
              </Typography>
              <Typography color="white">Platform Uptime</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          component="img"
          src="https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=900"
          sx={{
            width: {
              xs: "100%",
              md: "580px"
            },
            height: {
              md: "420px"
            },
            objectFit: "cover",
            borderRadius: "30px",
            ml: {
              md: 6
            },
            mt: {
              xs: 6,
              md: 0
            },
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.02)"
            },
            boxShadow: "0 30px 60px rgba(0,0,0,.45)"
          }}
        />
      </Box>

      {/* CATEGORIES */}
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            color: "#38bdf8",
            fontWeight: 700,
            mb: 6
          }}
        >
          Shop By Category
        </Typography>

        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.name}>
              <Card
                onClick={() => navigate("/products")}
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 5,
                  transition: ".4s",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.02)",
                    boxShadow: "0 20px 40px rgba(56,189,248,.25)"
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={category.image}
                />
                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    background:
                      "linear-gradient(transparent, rgba(0,0,0,.95))"
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      fontWeight: 700
                    }}
                  >
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FEATURED PRODUCTS */}
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            color: "#38bdf8",
            fontWeight: 700,
            mb: 6
          }}
        >
          Featured Products
        </Typography>

        <Grid container spacing={4}>
          {featuredProducts.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.name}>
              <Card
                sx={{
                  background: "#1e293b",
                  color: "white",
                  borderRadius: 5,
                  transition: ".3s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.02)",
                    boxShadow: "0 20px 40px rgba(56,189,248,.25)"
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={item.image}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography
                    sx={{
                      color: "#f59e0b",
                      mt: 1,
                      fontWeight: 700
                    }}
                  >
                    {item.price}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      background: "#f59e0b",
                      "&:hover": {
                        background: "#d97706"
                      }
                    }}
                    onClick={() => navigate("/products")}
                  >
                    Explore Product
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FOOTER */}
      <Box
        sx={{
          textAlign: "center",
          py: 5,
          borderTop: "1px solid #334155",
          color: "#94a3b8"
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            color: "#38bdf8",
            fontWeight: 700
          }}
        >
          Powered by AnantX DevSecOps Platform
        </Typography>
        <Typography
          sx={{
            mt: 1,
            fontSize: 14
          }}
        >
          React • FastAPI • PostgreSQL • Docker • JWT
        </Typography>
        <Typography
          sx={{
            mt: 2,
            fontSize: 12,
            color: "#64748b"
          }}
        >
          © 2026 AnantBuy. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;