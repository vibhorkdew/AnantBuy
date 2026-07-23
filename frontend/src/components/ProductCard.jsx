import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions
} from "@mui/material";

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

function ProductCard({ product }) {

  const { token } = useContext(AuthContext);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {

    try {

      await api.post(
        "/api/cart/",
        {
          product_id: product.id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAdded(true);

      alert("Product added to cart!");

    } catch (error) {

      console.error(error);

      alert("Failed to add product");

    }

  };

  return (

    <Card>

      <CardMedia
        component="img"
        height="200"
        image={
          product.image_url ||
          "https://via.placeholder.com/400x300"
        }
      />

      <CardContent>

        <Typography variant="h6">
          {product.name}
        </Typography>

        <Typography>
          {product.brand}
        </Typography>

        <Typography>
          ⭐ {product.rating}
        </Typography>

        <Typography>
          ₹ {product.price}
        </Typography>

      </CardContent>

      <CardActions>

        <Button
          variant="contained"
          fullWidth
          onClick={handleAddToCart}
        >
          {
            added
              ? "Added ✓"
              : "Add To Cart"
          }
        </Button>

      </CardActions>

    </Card>

  );
}

export default ProductCard;