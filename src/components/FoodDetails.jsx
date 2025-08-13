import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from './Loading';
import { AuthContext } from '../Context/AuthContext';

const FoodDetails = () => {
  const { id } = useParams();
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`https://food-hub-server-green.vercel.app/foods/${id}`)
      .then(res => {
        setFoodData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`https://food-hub-server-green.vercel.app/foods/${id}`, {
        status: "requested",
         requesterEmail: user.email

      });

      if (res.data.modifiedCount > 0) {
        setFoodData(prev => ({ ...prev, status: "requested" }));
        setShowModal(false);
        alert("Food successfully requested!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-md rounded-lg mt-6 bg-[#EFEFEF]">
      <img src={foodData.foodImage} alt={foodData.foodName} className="w-full h-64 object-cover rounded-md" />
      <h2 className="text-3xl font-bold mt-4">{foodData.foodName}</h2>
      <p className="mt-2"><strong>Quantity:</strong> {foodData.quantity}</p>
      <p><strong>Location:</strong> {foodData.location}</p>
      <p><strong>Expire Date:</strong> {new Date(foodData.expireDate).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {foodData.status}</p>
      <p className="mt-2"><strong>Notes:</strong> {foodData.notes}</p>
      <div className="flex items-center mt-4 gap-4">
        <img src={foodData.donorImage} alt={foodData.donorName} className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-semibold">{foodData.donorName}</p>
          <p className="text-sm text-gray-600">{foodData.donorEmail}</p>
        </div>
      </div>

      {/* Request Button */}
      {foodData.status === "available" && (
        <button className="btn btn-primary mt-6" onClick={() => setShowModal(true)}>
          Request
        </button>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-[1.9px] bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleRequestSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
          >
            <h2 className="text-xl font-bold">Request This Food</h2>

            <input className="input input-bordered w-full" value={foodData.foodName} disabled />
            <input className="input input-bordered w-full" value={foodData.foodImage} disabled />
            <input className="input input-bordered w-full" value={foodData._id} disabled />
            <input className="input input-bordered w-full" value={foodData.donorEmail} disabled />
            <input className="input input-bordered w-full" value={foodData.donorName} disabled />
            <input className="input input-bordered w-full" value={user?.email} disabled />
            <input className="input input-bordered w-full" value={new Date().toLocaleString()} disabled />
            <input className="input input-bordered w-full" value={foodData.location} disabled />
            <input className="input input-bordered w-full" value={new Date(foodData.expireDate).toLocaleDateString()} disabled />
            <textarea className="textarea textarea-bordered w-full" placeholder="Additional Notes"></textarea>

            <div className="flex justify-end gap-2">
              <button type="submit" className="btn btn-success">Request</button>
              <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
