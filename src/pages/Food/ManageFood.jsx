import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const ManageFood = () => {
  const { user,accessToken } = useContext(AuthContext);
 console.log(accessToken);
// console.log(user?.accessToken);

  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);

  // Load only user's foods
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/foods?email=${user.email}`,{
            headers:{
                authorization: `Bearer ${user?.accessToken}`,
            },
        })
        .then((res) => setFoods(res.data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This food will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axios.delete(`http://localhost:5000/foods/${id}`);
      setFoods((prev) => prev.filter((food) => food._id !== id));
      Swal.fire("Deleted!", "Your food has been deleted.", "success");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedFood = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      quantity: parseInt(form.quantity.value),
      location: form.location.value,
      expireDate: form.expireDate.value,
      notes: form.notes.value,
      status: form.status.value,
    };

    await axios.put(`http://localhost:5000/foods/${editingFood._id}`, updatedFood);
    Swal.fire("Updated!", "Food info updated successfully.", "success");

    setFoods((prev) =>
      prev.map((food) =>
        food._id === editingFood._id ? { ...food, ...updatedFood } : food
      )
    );
    setEditingFood(null);
  };

  return (
    <div className="overflow-x-auto container mx-auto h-screen mt-28">
      <h2 className="text-2xl font-bold mb-4">Manage Your Foods</h2>
      <table className="table w-full bg-[#EFEFEF]">
        <thead>
          <tr className="">
            <th>#</th>
            <th>Food Name</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, index) => (
            <tr key={food._id}>
              <td>{index + 1}</td>
              <td>{food.foodName}</td>
              <td>{food.quantity}</td>
              <td>{food.location}</td>
              <td>{food.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-info mr-2"
                  onClick={() => setEditingFood(food)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(food._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {editingFood && (
        <div className="fixed inset-0 backdrop-blur-[1.9px] bg-opacity-40 flex justify-center items-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
          >
            <h3 className="text-xl font-bold">Update Food</h3>
            <input
              name="foodName"
              defaultValue={editingFood.foodName}
              className="input input-bordered w-full"
              placeholder="Food Name"
            />
            <input
              name="foodImage"
              defaultValue={editingFood.foodImage}
              className="input input-bordered w-full"
              placeholder="Food Image URL"
            />
            <input
              name="quantity"
              type="number"
              defaultValue={editingFood.quantity}
              className="input input-bordered w-full"
              placeholder="Quantity"
            />
            <input
              name="location"
              defaultValue={editingFood.location}
              className="input input-bordered w-full"
              placeholder="Location"
            />
            <input
              name="expireDate"
              type="datetime-local"
              defaultValue={editingFood.expireDate?.slice(0, 16)}
              className="input input-bordered w-full"
            />
            <textarea
              name="notes"
              defaultValue={editingFood.notes}
              className="textarea textarea-bordered w-full"
              placeholder="Notes"
            />
            <select
              name="status"
              defaultValue={editingFood.status}
              className="select select-bordered w-full"
            >
              <option value="available">Available</option>
             
            </select>

            <div className="flex justify-end gap-2">
              <button type="submit" className="btn btn-success">
                Save
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setEditingFood(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageFood;
