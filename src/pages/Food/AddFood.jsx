import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    quantity: '',
    location: '',
    expireDate: '',
    notes: ''
  });

  function handleChange(e) {
  const fieldName = e.target.name;
  const fieldValue = e.target.value;

  const updatedFormData = { ...formData };
  updatedFormData[fieldName] = fieldValue;

  setFormData(updatedFormData);
}


  const handleSubmit = async e => {
    e.preventDefault();

    const foodItem = {
      ...formData,
      quantity: parseInt(formData.quantity),
      donorName: user?.displayName,
      donorEmail: user?.email,
      donorImage: user?.photoURL,
      status: 'available',
      addedAt: new Date()
    };

    try {
      const res = await axios.post('https://food-hub-server-green.vercel.app/foods', foodItem); // your backend endpoint
      if (res.data.insertedId) {
        Swal.fire('Success!', 'Food item added successfully.', 'success');
        setFormData({
          foodName: '',
          foodImage: '',
          quantity: '',
          location: '',
          expireDate: '',
          notes: ''
        });
      }
    } catch (err) {
      Swal.fire('Error', 'Something went wrong while adding food.', 'error');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a Food Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          value={formData.foodName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="foodImage"
          placeholder="Food Image URL"
          value={formData.foodImage}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Food Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Pickup Location"
          value={formData.location}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="datetime-local"
          name="expireDate"
          placeholder="Expired Date/Time"
          value={formData.expireDate}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        ></textarea>

        {/* Donor info display (readonly) */}
        <div className="text-sm text-gray-500">
          <p><strong>Donor:</strong> {user?.displayName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        <button type="submit" className="btn btn-primary w-full">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;
