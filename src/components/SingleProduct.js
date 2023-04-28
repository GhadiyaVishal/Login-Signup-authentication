import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { fetchSingleProduct } from "../Api";

function SingleProduct() {
  const [product, setProducts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getProductList = async () => {
    try {
      const response = await fetchSingleProduct(`/${id}`);
      setProducts(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  const handleBack = () => {
    navigate("/products");
  };

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "4rem",
        justifyContent: "center",
      }}
    >
      <Card sx={{ maxWidth: "350px" }}>
        <CardMedia
          sx={{ height: 200, borderRadius: "1rem" }}
          image={product.thumbnail}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <CardContent>Description: {product.description}</CardContent>
            <CardContent>Category: {product.category}</CardContent>
            <CardContent>Rating: {product.rating}</CardContent>
            <CardContent>Brand Name: {product.brand}</CardContent>
            <CardContent> Price: {product.price}</CardContent>
            <CardContent>Discount: {product.discountPercentage}</CardContent>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleBack} variant="contained">
            Back
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default SingleProduct;
