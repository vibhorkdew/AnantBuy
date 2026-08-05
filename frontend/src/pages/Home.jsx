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
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/800.css";

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
      {/* HERO SECTION */}
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
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Orbitron",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                textShadow: "0 0 20px rgba(56,189,248,.35)",
                color: "#29b6f6",
                lineHeight: 1.1,
                fontSize: {
                  xs: "3.2rem",
                  md: "5.2rem"
                }
              }}
            >
              ANANTBUY
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontFamily: "Orbitron",
                fontSize: { xs: "2rem", md: "4rem" },
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "1px",
                lineHeight: 1.2
              }}
            >
              Enterprise Commerce Platform
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              color: "#94a3b8",
              mb: 4
            }}
          >
            Enterprise-grade E-Commerce application secured, monitored and deployed using the AnantX DevSecOps Platform.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              mr: 2,
              px: 4,
              py: 1.5,
              borderRadius: "12px",
              fontWeight: 700,
              textTransform: "none",
              background: "linear-gradient(90deg,#29b6f6,#0288d1)",
              "&:hover": {
                background: "linear-gradient(90deg,#0288d1,#0277bd)"
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
              px: 4,
              py: 1.5,
              borderRadius: "12px",
              fontWeight: 700,
              textTransform: "none",
              border: "1px solid #29b6f6",
              color: "#29b6f6",
              "&:hover": {
                background: "rgba(41,182,246,0.1)",
                borderColor: "#29b6f6"
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
                  fontFamily: "Orbitron",
                  color: "#29b6f6",
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
                  fontFamily: "Orbitron",
                  color: "#29b6f6",
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
                  fontFamily: "Orbitron",
                  color: "#29b6f6",
                  fontWeight: 700
                }}
              >
                99.9%
              </Typography>
              <Typography color="white">Platform Uptime</Typography>
            </Box>
          </Box>
        </Box>

        {/* HERO IMAGE CONTAINER WITH BADGE */}
        <Box
          sx={{
            position: "relative",
            mt: {
              xs: 6,
              md: 0
            },
            ml: {
              md: 6
            }
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              background: "#0f172a",
              color: "#29b6f6",
              px: 2,
              py: 1,
              borderRadius: "20px",
              border: "1px solid #29b6f6",
              zIndex: 2,
              fontFamily: "Orbitron",
              fontSize: "0.8rem",
              fontWeight: 700
            }}
          >
            Powered by AnantX
          </Box>
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200"
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
              border: "1px solid rgba(41,182,246,.25)",
              boxShadow: "0 0 40px rgba(41,182,246,.18)",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.02)"
              }
            }}
          />
        </Box>
      </Box>

      {/* CATEGORIES */}
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontFamily: "Orbitron",
            color: "#29b6f6",
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
                    boxShadow: "0 20px 40px rgba(41,182,246,.25)"
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
                      fontFamily: "Orbitron",
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
            fontFamily: "Orbitron",
            color: "#29b6f6",
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
                    boxShadow: "0 20px 40px rgba(41,182,246,.25)"
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
            fontFamily: "Orbitron",
            color: "#29b6f6",
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