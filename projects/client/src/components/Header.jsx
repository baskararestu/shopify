import React from "react";
import ProductCategories from "./CardProductCategory";
import Carousel from "./Carousel";

function Header() {
  return (
    <div className="mx-auto">
      <div className=" flex flex-col justify-center pb-5 gap-5">
        <div>
          <Carousel />
        </div>
        <div>
          <ProductCategories />
        </div>
      </div>
    </div>
  );
}

export default Header;
