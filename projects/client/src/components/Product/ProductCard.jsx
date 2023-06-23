import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SeeDetailButton from "./SeeDetailButton";
import AddToCartButton from "./AddToCartButton";

function ProductCard(props) {
  const { product, openDeleteModal, openEditModal } = props;
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin-products";

  const formattedPrice = product.price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const imageSrc = `http://localhost:8000${product.image_url}`;

  return (
    <div className="card bg-white w-[200px] lg:w-auto h-auto m-2 rounded-lg shadow-lg">
      <div className="top">
        <img
          className="w-[300px] h-[200px] object-cover p-2"
          src={imageSrc}
          alt="img"
        />
      </div>
      <div className="bottom flex flex-col justify-center items-start p-3 bg-">
        <div className="title font-semibold text-sm my-1">
          {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
        </div>
        <div className="category text-xs font-light my-1">
          {product.description}
        </div>
        <div className="pricing flex items-center">
          <div className="price">{formattedPrice}</div>
        </div>
        <div className="text-md">Total Stock: {product.total_stock}</div>
        <div className="flex items-center my-2 gap-3">
          {isAdminRoute ? (
            <div className="flex items-center my-2 gap-3">
              <div className="gap-5 flex flex-row ">
                <a
                  className="btn btn-xs w-12 lg:w-2/4 btn-info"
                  href="#edit_modal_product"
                  onClick={() => openEditModal(product.id_product)}
                >
                  Edit
                </a>
                <a
                  className="btn btn-xs w-12 lg:w-2/4 btn-error"
                  href="#delete_modal"
                  onClick={() =>
                    openDeleteModal(product.id_product, product.name)
                  }
                >
                  Delete
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center my-2 gap-3">
              <div>
                <SeeDetailButton productId={product.id_product} />
              </div>
              <div>
                <AddToCartButton product={product} quantity={1} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
