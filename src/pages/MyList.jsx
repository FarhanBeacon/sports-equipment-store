import React from "react";
import { useLoaderData } from "react-router";

const MyList = () => {
  const items = useLoaderData();
  return (
    <div className="w-[75%] mx-auto min-h-screen flex justify-center">
      <div className="m-6">
        {items && items.length > 0? items.map((item) => (
          <div key={item._id} className="flex items-center gap-4 my-4 border p-4 rounded-lg shadow-md">
            <img src={item.photoUrl} alt="image" width="40px" />
            <div>
              <h3 className="text-xl font-semibold">{item.itemName}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        )) : <p className="text-2xl font-semibold">No Items Found</p>}
      </div>
    </div>
  );
};

export default MyList;
