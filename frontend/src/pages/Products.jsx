import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Products() {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [addedProductId, setAddedProductId] =
    useState(null);

  const { token } = useContext(AuthContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

useEffect(() => {
  const loadProducts = async () => {
    try {
      const res = await api.get("/products/");
      setProducts(res.data);
    } catch {
      console.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  loadProducts();
}, []);

const handleAddToCart = async (product) => {
  try {
    await api.post(
      "/cart/",
      {
        product_id: product.id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSnackbarMessage(`${product.name} added to cart`);
    setOpenSnackbar(true);

    setAddedProductId(product.id);

    setTimeout(() => {
      setAddedProductId(null);
    }, 3000);
  } catch {
    console.error("Failed to add product.");
    alert("Failed to add product");
  }
};
  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "transparent",
        padding: "40px"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "40px"
        }}
      >

        <h1
          style={{
            color: "white",
            fontSize: "42px",
            marginBottom: "10px"
          }}
        >
          Explore Products
        </h1>

        <p
          style={{
            color: "#94a3b8"
          }}
        >
          Discover the latest gadgets,
          fashion and accessories
        </p>

      </div>

      {/* SEARCH */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px"
        }}
      >

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            width: "500px",
            padding: "15px",
            borderRadius: "12px",
            border: "none",
            background: "#1e293b",
            color: "white",
            fontSize: "16px"
          }}
        />

      </div>

      {/* LOADING */}

      {loading ? (

        <h2
          style={{
            color: "white",
            textAlign: "center"
          }}
        >
          Loading Products...
        </h2>

      ) : (

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fill,minmax(300px,1fr))",

            gap: "30px"
          }}
        >

          {filteredProducts.map(
            (product) => (

              <div
                key={product.id}
                style={{

                  background:
                    "#0f172a",

                  borderRadius:
                    "18px",

                  overflow:
                    "hidden",

                  border:
                    "1px solid rgba(245,158,11,.15)",

                  transition:
                    "0.3s",

                  boxShadow:
                    "0 8px 25px rgba(0,0,0,.4)"
                }}
              >

                {/* IMAGE */}


                <img
                  src={
                    product.image_url ||
                    "https://via.placeholder.com/400x300"
                  }
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                {/* CONTENT */}

                <div
                  style={{
                    padding: "20px"
                  }}
                >

                  <span
                    style={{
                      background: "#f59e0b",
                      color: "white",
                      padding: "5px 12px",
                      borderRadius: "30px",
                      fontSize: "12px"
                    }}
                  >
                    {product.category}
                  </span>

                  <p
                    style={{
                      color: "#94a3b8",
                      marginTop: "10px"
                    }}
                  >
                    {product.brand}
                  </p>

                  <h2
                    style={{
                      color: "white",
                      marginTop: "10px"
                    }}
                  >
                    {product.name}
                  </h2>

                  <p
                    style={{
                      color:
                        "#94a3b8",

                      minHeight:
                        "50px"
                    }}
                  >
                    {product.description}
                  </p>
                  <h2
                    style={{
                      color: "#f59e0b"
                    }}
                  >
                    ₹{product.price}
                  </h2>

                  <p
                    style={{
                      color: "#facc15",
                      fontWeight: "bold"
                    }}
                  >
                    ⭐ {product.rating}
                  </p>

                  <p
                    style={{
                      color: "#cbd5e1"
                    }}
                  >
                    Stock: {product.stock}
                  </p>


                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "20px"
                    }}
                  >
          
                    <button
                      onClick={() => handleAddToCart(product)}
                      style={{
                        flex: 1,
                        padding: "12px",
                        border: "none",
                        borderRadius: "10px",

                        background:
                          addedProductId === product.id
                            ? "#22c55e"
                            : "#f59e0b",

                        color: "white",
                        cursor: "pointer"
                      }}
                    >
                      {
                        addedProductId === product.id
                          ? "✓ Added"
                          : "Add To Cart"
                      }
                    </button>

                    <button
                      style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: "10px",
                        border:
                          "1px solid #f59e0b",
                        background:
                          "transparent",
                        color:
                          "#f59e0b",
                        cursor: "pointer"
                      }}
                    >
                      Buy Now
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
      >

        <Alert
          severity="success"
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMessage}
        </Alert>

      </Snackbar>
    </div>

  );
}

export default Products;
