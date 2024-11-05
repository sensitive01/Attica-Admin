import requests from './httpService';

const SupplierServices = {
  addSupplier: async (body) => {
    return requests.post('/supplier/add', body);
  },
  getAllSuppliers: async () => {
    return requests.get('/supplier');
  },
  getSupplierById: async (id) => {
    return requests.get(`/supplier/${id}`);
  },
  updateSupplier: async (id, body) => {
    return requests.put(`/supplier/${id}`, body);
  },
  deleteSupplier: async (id) => {
    return requests.delete(`/supplier/${id}`);
  },
};

export default SupplierServices;
