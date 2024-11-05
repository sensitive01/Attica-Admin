import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Uploader from 'components/image-uploader/Uploader';
const AddStore = () => {
  const history = useHistory();
  const [store, setStore] = useState({
    storeId: '',
    storeName: '',
    addressLine: '',
    area: '',
    city: '',
    state: '',
    pinCode: '',
    landmark: '',
    storeOpenTime: '',
    storeCloseTime: '',
    radius: '',
    status: '',
    manager: '',
    user: '',
    landline: '',
    latitude: '',
    longitude: '',
    storeImage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore((prevStore) => ({ ...prevStore, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('storeId', store.storeId);
    formData.append('storeName', store.storeName);
    formData.append('addressLine', store.addressLine);
    formData.append('area', store.area);
    formData.append('city', store.city);
    formData.append('state', store.state);
    formData.append('pinCode', store.pinCode);
    formData.append('landmark', store.landmark);
    formData.append('storeOpenTime', store.storeOpenTime);
    formData.append('storeCloseTime', store.storeCloseTime);
    formData.append('radius', store.radius);
    formData.append('status', store.status);
    formData.append('manager', store.manager);
    formData.append('user', store.user);
    formData.append('landline', store.landline);
    formData.append('latitude', store.latitude);
    formData.append('longitude', store.longitude);
    formData.append('storeImage', store.storeImage);
    axios.post('http://127.0.0.1:5055/api/Supplier/add', formData)
      .then((response) => {
        console.log(response);
        setStore({});
        alert("Store dded Successfully")
        // redirect to the list of stores
        history.push('/stores');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-2xl font-bold mb-4">Add Store</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-bold">Store ID</label>
            <input
              type="text"
              name="storeId"
              value={store.storeId}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Store Name</label>
            <input
              type="text"
              name="storeName"
              value={store.storeName}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Address Line</label>
            <input
              type="text"
              name="addressLine"
              value={store.addressLine}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Area</label>
            <input
              type="text"
              name="area"
              value={store.area}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">City</label>
            <input
              type="text"
              name="city"
              value={store.city}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">State</label>
            <input
              type="text"
              name="state"
              value={store.state}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Pin Code</label>
            <input
              type="text"
              name="pinCode"
              value={store.pinCode}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Landmark</label>
            <input
              type="text"
              name="landmark"
              value={store.landmark}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Store Open Time</label>
            <input
              type="time"
              name="storeOpenTime"
              value={store.storeOpenTime}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Store Close Time</label>
            <input
              type="time"
              name="storeCloseTime"
              value={store.storeCloseTime}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Radius</label>
            <input
              type="number"
              name="radius"
              value={store.radius}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Status</label>
            <select
              name="status"
              value={store.status}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Manager</label>
            <input
              type="text"
              name="manager"
              value={store.manager}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">User</label>
            <input
              type="text"
              name="user"
              value={store.user}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Landline</label>
            <input
              type="text"
              name="landline"
              value={store.landline}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Latitude</label>
            <input
              type="text"
              name="latitude"
              value={store.latitude}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Longitude</label>
            <input
              type="text"
              name="longitude"
              value={store.longitude}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Store Image</label>
            <Uploader
              onImageChange={(image) => {
                setStore((prevStore) => ({ ...prevStore, storeImage: image }));
              }}
            />
          </div>
        </div>
        <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Add Store
        </button>
      </form>
    </div>
  );
 
};

export default AddStore;
