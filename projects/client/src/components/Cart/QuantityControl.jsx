import React from "react";

function QuantityControl({
  quantity,
  handleDecrease,
  handleIncrease,
  handleQuantityChange,
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded"
        onClick={handleDecrease}
      >
        -
      </button>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={handleQuantityChange}
        readOnly
        className="w-12 text-center"
      />
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;
