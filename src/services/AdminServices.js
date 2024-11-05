import requests from "./httpService";
const AdminServices = {
  registerAdmin: async (body) => {
    return requests.post("/admin/register", body);
  },
  // loginAdmin: async (body) => {
  //   return requests.post(`/admin/login`, body);
  // },
  loginAdmin: async (body) => {
    try {
      const response = await requests.post(`/admin/login`, body);
      
      // Check the response data and set redirection properties accordingly
      if (response.data && response.data.redirectToDashboard && response.data.redirectURL) {
        return { ...response, redirectToDashboard: response.data.redirectToDashboard, redirectURL: response.data.redirectURL };
      } else {
        // If the necessary redirection information is not provided in the response data,
        // you can set default values or handle it as needed
        return { ...response, redirectToDashboard: false, redirectURL: '/' }; // Default redirection
      }
    } catch (error) {
      // Handle any error that occurs during the API request
      throw error;
    }
  },
  
  forgetPassword: async (body) => {
    return requests.put("/admin/forget-password", body);
  },
  resetPassword: async (body) => {
    return requests.put("/admin/reset-password", body);
  },
  signUpWithProvider: async (body) => {
    return requests.post("/admin/signup", body);
  },
  addStaff: async (body) => {
    return requests.post("/admin/add", body);
  },
  getAllStaff: async (body) => {
    return requests.get("/admin", body);
  },
  getStaffById: async (id, body) => {
    return requests.post(`/admin/${id}`, body);
  },
  updateStaff: async (id, body) => {
    return requests.put(`/admin/${id}`, body);
  },
  updateStaffStatus: async (id, body) => {
    return requests.put(`/admin/update-status/${id}`, body);
  },
  deleteStaff: async (id) => {
    return requests.delete(`/admin/${id}`);
  },
};
export default AdminServices;
