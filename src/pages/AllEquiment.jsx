import React from "react";
import { useLoaderData } from "react-router";

const AllEquiment = () => {
  const equipments = useLoaderData();
  return (
    <div className="w-[75%] mx-auto min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-8">
        {equipments.map((equipment) => (
          <div key={equipment._id} className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{equipment.itemName}</h2>
              <p>{equipment.description}</p>
            </div>
            <figure>
              <img src={equipment.photoUrl} alt="item-image" />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEquiment;
