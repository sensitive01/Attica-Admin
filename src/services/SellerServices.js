import requests from './httpService';

const SellerServices = {
  addSeller: async (body) => {
    return requests.post('/Seller/add', body);
  },
  getAllSellers: async () => {
    return requests.get('/Seller');
  },
  getSellerById: async (id) => {
    return requests.get(`/Seller/${id}`);
  },
  updateSeller: async (id, body) => {
    return requests.patch(`/Seller/${id}`, body);
  },
  deleteSeller: async (id) => {
    return requests.delete(`/Seller/${id}`);
  },
};

export default SellerServices;
