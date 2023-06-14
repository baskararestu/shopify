import React from "react";

function ConfirmationDialog({ handleDelete, handleCancelDelete }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 shadow-md rounded-md">
        <p className="text-error">
          Are you sure you want to delete this product from the cart?
        </p>
        <div className="flex justify-end mt-3">
          <button
            className="px-2 py-1 bg-error text-white rounded"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded ml-2"
            onClick={handleCancelDelete}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
