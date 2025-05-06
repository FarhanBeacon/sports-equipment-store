import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import swal from "sweetalert";

const AddEquipment = () => {
    const { user } = useContext(AuthContext);
  const handleAddEquipment = (event) => {
    event.preventDefault();
    const form = event.target;
    const itemName = form.itemName.value;
    const description = form.description.value;
    const photoUrl = form.photoUrl.value;
    const equipment = { itemName, description, photoUrl, userEmail: user.email };

    fetch("https://sports-equipment-store-server-xi.vercel.app/equipments",{
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(equipment),
    })
        .then((res)=> res.json())
        .then((data)=> {
            if(data.insertedId){
                swal("Equipment Added!", "Your equipment has been added successfully", "success");
                form.reset();
            }
        })
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleAddEquipment} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label">Item Name</label>
        <input
          type="text"
          className="input"
          placeholder="ItemName"
          name="itemName"
        />

        <label className="label">Description</label>
        <input
          type="text"
          className="input"
          placeholder="ItemName"
          name="description"
        />

        <label className="label">Photo URL</label>
        <input
          type="text"
          className="input"
          placeholder="Photo URL"
          name="photoUrl"
        />

        <input
          type="submit"
          className="btn btn-neutral mt-4"
          value="Add Items"
        />
      </form>
    </div>
  );
};

export default AddEquipment;
