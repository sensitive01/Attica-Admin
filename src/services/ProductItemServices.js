import requests from "./httpService";
const ProductItemServices = {
    getAllProductItems: async () => {
    return requests.get("/productItem/");
  },
  getProductItemById: async (id) => {
    return requests.get(`/productItem/${id}`);
  },
  createProductItem: async (body) => {
    return requests.post("productItem/add", body);
  },
  updateProductItem: async (id, body) => {
    return requests.put(`/productItem/${id}`, body);
  },
  deleteProductItem: async (id, body) => {
    return requests.delete(`/productItem/${id}`);
  },
};
export default ProductItemServices;

