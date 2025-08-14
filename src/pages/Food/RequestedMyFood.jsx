import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Loading from "../../components/Loading";

const RequestedMyFood = () => {
  const { user } = useContext(AuthContext);
//   console.log(user.accessToken);
// console.log(user);
// console.log(user?.accessToken);

  const [myRequestedFoods, setMyRequestedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://food-hub-server-green.vercel.app/requested-foods?email=${user.email}`, )
        .then((res) => {
          setMyRequestedFoods(res.data);
        //   console.log(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching requested foods:", error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className="p-4 max-w-6xl mx-auto h-screen mt-20">
      <h2 className="text-2xl font-bold mb-4">My Food Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Donor Name</th>
              <th>Pickup Location</th>
              <th>Expire Date</th>
              <th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {myRequestedFoods.map((food, index) => (
              <tr key={food._id} className="hover">
                <td>{index + 1}</td>
                <td>{food.donorName}</td>
                <td>{food.location}</td>
                <td>{new Date(food.expireDate).toLocaleDateString()}</td>
                <td>{new Date(food.addedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedMyFood;
