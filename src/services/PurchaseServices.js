import requests from "./httpService";
const PurchasesServices = {
  getAllPurchases: async () => {
    return requests.get("/purchases/purchases");
  },
  getPurchasesById: async (id) => {
    return requests.get(`/purchases/purchases/${id}`);
  },
  addPurchases: async (body) => {
    return requests.post("purchases/addpurchases", body);
  },
  updatePurchase: async (id, body) => {
    return requests.put(`/purchases/purchases/${id}`, body);
  },
  deletePurchase: async (id, body) => {
    return requests.delete(`/purchases/purchases/${id}`);
  },
};
export default PurchasesServices;

