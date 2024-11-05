import requests from "./httpService";
const ProductionServices = {
    getProductions: async () => {
    return requests.get("/productions/");
  },
  getProductionById: async (id) => {
    return requests.get(`/productions/${id}`);
  },
  createProduction: async (body) => {
    return requests.post("productions/add", body);
  },
  updateProduction: async (id, body) => {
    return requests.put(`/productions/${id}`, body);
  },
  deleteProduction: async (id, body) => {
    return requests.delete(`/productions/${id}`);
  },
};
export default ProductionServices;

