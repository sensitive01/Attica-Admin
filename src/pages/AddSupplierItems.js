import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSupplier = () => {
  const [formData, setFormData] = useState({
    SupplierId: '',
    companyName: '',
    addressLine: '',
    area: '',
    city: '',
    state: '',
    pinCode: '',
    status: '',
    // products: [],
    gst: '',
  });
  const [products, setProducts] = useState([])


useEffect(() => {
  // Fetch the products data from the API
  fetch('https://attica.onrender.com/api/products')
    .then(response => response.json())
    .then(data => setProducts(data.products))
    .catch(error => console.error('Error fetching products:', error));
}, []);

  const handleChange = e => {
    if (e.target.name === 'products') {
      const selectedProducts = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({...formData, products: selectedProducts});
    } else {
      setFormData({...formData, [e.target.name]: e.target.value});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://attica.onrender.com/api/supplier/add', formData);
      alert('Supplier added successfully!');
      setFormData({
        SupplierId: '',
        companyName: '',
        addressLine: '',
        area: '',
        city: '',
        state: '',
        pinCode: '',
        status: '',
        products: [],
        gst: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Supplier</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="SupplierId" value={formData.SupplierId} onChange={handleChange} placeholder="SupplierId" required />

        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" required />

        <input type="text" name="addressLine" value={formData.addressLine} onChange={handleChange} placeholder="Address Line" required />

        <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder="Area" required />

        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />

        <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />

        <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pin Code" required />

        <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" required />
    <select name="products" multiple value={formData.products} onChange={handleChange}>
      {products.map(product => (
        <option key={product._id} value={product._id}>
          {product.title.en}
        </option>
      ))}
    </select>
        <input type="text" name="gst" value={formData.gst} onChange={handleChange} placeholder="GST" required />

        <button type="submit">Add Supplier</button>
      </form>
    </div>
  );
};

export default AddSupplier;



// import React, { useState, useEffect } from 'react';

// const ProductDropdown = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch the products data from the API
//     fetch('https://attica.onrender.com/api/products')
//       .then(response => response.json())
//       .then(data => setProducts(data.products))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   return (
//     <select multiple>
//       {products.map(product => (
//         <option key={product._id} value={product._id}>
//           {product.title.en}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default ProductDropdown;
// --------------------------------------------------AskCodi----------------------------

