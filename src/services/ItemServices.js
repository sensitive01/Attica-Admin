import requests from "./httpService";

const ItemServices = {
  getAllItems: async ({ page, limit, category, title, price }) => {
    const searchCategory = category !== null ? category : "";
    const searchTitle = title !== null ? title : "";
    const searchPrice = price !== null ? price : "";

    return requests.get(
      `/Items?page=${page}&limit=${limit}&category=${searchCategory}&title=${searchTitle}&price=${searchPrice}`
    );
  },

  getItemById: async (id) => {
    return requests.get(`/Items/${id}`);
  },
  addItem: async (body) => {
    return requests.post("/Items/add", body);
  },
  addAllItems: async (body) => {
    return requests.post("/Items/all", body);
  },
  updateItem: async (id, body) => {
    return requests.patch(`/Items/${id}`, body);
  },
  updateManyItems: async (body) => {
    return requests.patch("Items/update/many", body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/Items/status/${id}`, body);
  },

  deleteItem: async (id, body) => {
    return requests.delete(`/Items/${id}`);
  },
  deleteManyItems: async (body) => {
    return requests.patch("/Items/delete/many", body);
  },
};

export default ItemServices;
