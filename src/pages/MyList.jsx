import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";

const MyList = () => {
  const loadedItems = useLoaderData();
  const [items, setItems] = useState(loadedItems);
  const [itemForEdit, setItemForEdit] = useState({});

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://sports-equipment-store-server-xi.vercel.app/equipments/id/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = items.filter((item) => item._id !== id);
              setItems(remaining);
              swal("Poof! The data has been deleted!", {
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleUpdateInfo = (event) => {
    event.preventDefault();
    const form = event.target;
    const itemName = form.itemName.value;
    const description = form.description.value;
    const photoUrl = form.photoUrl.value;
    const equipment = { itemName, description, photoUrl };
    console.log(equipment);

    // update item in the database
    fetch(`https://sports-equipment-store-server-xi.vercel.app/equipments/id/${itemForEdit._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(equipment),
    })
      .then((res)=> res.json())
      .then((data)=>{
        if(data.modifiedCount > 0){
          const remaining = items.filter(item => item._id !== itemForEdit._id);
          const updatedItem = { ...itemForEdit, itemName, description, photoUrl };
          setItems([...remaining, updatedItem]);
          swal("Updated!", "Your data has been updated successfully", "success");
          form.reset();
          // close the modal
          setItemForEdit(null);
          document.getElementById("my_modal_1").close();
        }
      })
  };
  return (
    <div className="w-[75%] mx-auto min-h-screen flex justify-center">
      <div className="m-6">
        {items && items.length > 0 ? (
          items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center gap-4 my-4 border p-4 rounded-lg shadow-md"
            >
              <img
                src={item.photoUrl}
                alt="image"
                className="w-[20px] md:w-[40px]"
              />
              <div className="md:w-[80%]">
                <h3 className="text-lg md:text-xl font-semibold">
                  {item.itemName}
                </h3>
                <p className="text-xs md:text-sm">{item.description}</p>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="md:w-[10%] flex flex-col md:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setItemForEdit(item);
                    document.getElementById("my_modal_1").showModal();
                  }}
                  className="btn btn-neutral btn-xs text-white text-lg"
                >
                  <FaUserEdit />
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box relative">
                    <h3 className="font-bold text-lg text-center mb-2">
                      Update Item
                    </h3>
                    <form
                      id="updateForm"
                      onSubmit={handleUpdateInfo}
                      className="fieldset bg-base-200 border-base-300 rounded-box border p-4"
                    >
                      <label className="label">Item Name</label>
                      <input
                        type="text"
                        className="input w-full"
                        defaultValue={itemForEdit?.itemName || ""}
                        name="itemName"
                      />

                      <label className="label">Description</label>
                      <input
                        type="text"
                        className="input w-full"
                        defaultValue={itemForEdit?.description || ""}
                        name="description"
                      />

                      <label className="label">Photo URL</label>
                      <input
                        type="text"
                        className="input w-full"
                        defaultValue={itemForEdit?.photoUrl || ""}
                        name="photoUrl"
                      />

                      <input
                        type="submit"
                        className="btn btn-neutral mt-4 w-fit absolute bottom-6 right-26"
                        value="Update"
                      />
                    </form>
                    <div className="modal-action mt-0">
                      <form method="dialog">
                        <button
                          onClick={() => setItemForEdit(null)}
                          className="btn btn-neutral mt-4"
                        >
                          Close
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-neutral btn-xs text-white text-lg"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-2xl font-semibold">No Item Found</p>
        )}
      </div>
    </div>
  );
};

export default MyList;
