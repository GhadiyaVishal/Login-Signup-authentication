import React from "react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { toast } from "react-hot-toast";
import { fetchProductList } from "../Api";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [search, setSearch] = useState("");

  const getProductList = async () => {
    try {
      const response = await fetchProductList();
      setProducts(response.data.products);
      setFilteredProduct(response.data.products);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    const result = products.filter(product => {
      return product.title.toLowerCase().match(search.toLowerCase());
    });
    setFilteredProduct(result);
  }, [products,search]);

  const navigate = useNavigate();

  const columns = [
    {
      name: "Product Image",
      selector: row => (
        <div style={{ maxHeight: "10vh" }}>
          <img
            src={row.thumbnail}
            style={{
              width: "100%",
              objectFit: "fill",
              objectPosition: "center",
            }}
            alt="productImg"
          />
        </div>
      ),
    },
    {
      name: "Title",
      selector: row => row.title,
    },

    {
      name: "Category",
      selector: row => row.category,
    },
    {
      name: "Brand Name",
      selector: row => row.brand,
    },
    {
      name: "Rate",
      selector: row => row.rating,
    },
    {
      name: "Price",
      selector: row => row.price,
    },
    {
      name: "Discount",
      selector: row => `${row.discountPercentage}%`,
    },
  ];

  return (
    <>
      <Header />
      <Container>
        <DataTable
          title="Product List"
          columns={columns}
          data={filteredProduct}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="600px"
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search Here"
              className="w-25 form-control"
              value={search}
              onChange={e => setSearch(e.target.value)}
            ></input>
          }
          // paginationRowsPerPageOptions={[8]}
          // paginationPerPage={8}
          onRowClicked={state => {
            navigate(`/products/${state.id}`);
          }}
        />
      </Container>
    </>
  );
}

export default ProductList;
