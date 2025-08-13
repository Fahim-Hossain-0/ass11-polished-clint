import React from 'react';
import { Link } from 'react-router';

const FoodCard = ({ food }) => {
  const {
    _id,
    foodName,
    foodImage,
    quantity,
    location,
    expireDate,
    notes,
    donorName,
    donorEmail,
    donorImage,
    status,
  } = food;

  return (
    <div className="card mt-8 shadow-xl p-4 bg-[#EFEFEF]">
      <figure>
        <img src={foodImage} alt={foodName} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{foodName}</h2>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Expire Date:</strong> {new Date(expireDate).toLocaleDateString()}</p>
        <p><strong>Notes:</strong> {notes}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <img
            src={donorImage}
            alt={donorName}
            className="w-8 h-8 rounded-full border"
          />
          <div>
            <p className="font-medium">
              Donor: {donorName}
              {status === 'available' && (
                <span className="ml-2 text-green-600 text-sm font-semibold">(Available)</span>
              )}
            </p>
            <p className="text-sm text-gray-500">{donorEmail}</p>
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link to={`/foodDetails/${_id}`}>
            <button className="btn btn-sm btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
