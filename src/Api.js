import axios from "axios";

export const fetchProductList = () => {
  return axios.get(
    `https://dummyjson.com/products/?skip=0&limit=80`
  );
};
export const fetchSingleProduct = (id) => {
  return axios.get(
    `https://dummyjson.com/products${id}`
  );
};