import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminProductSlice = createSlice({
  name: "admin-products",
  initialState: {
    products: [],
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  setProducts,
  updateProduct,
  addProduct,
  setCurrentPage,
  setTotalPages,
} = adminProductSlice.actions;

export default adminProductSlice.reducer;

export function fetchAdminProducts(page = 1) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admins/products/?page=${page}`
      );
      const { products, totalPages } = response.data;
      dispatch(setProducts(products));
      dispatch(setCurrentPage(page));
      // Add the following line to update the total pages
      dispatch(setTotalPages(totalPages));
    } catch (error) {
      console.log(error);
    }
  };
}

export function editProduct(id, productData) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    console.log(productData, "productdata");
    try {
      const response = await axios.put(
        `http://localhost:8000/api/admins/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            ContentType: "multipart/form-data",
          },
        }
      );
      dispatch(updateProduct(response.data));
      console.log(response);
      dispatch(fetchAdminProducts());
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };
}

export function deleteProducts(id_product) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      await axios.delete(
        `http://localhost:8000/api/admins/products/${id_product}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      dispatch(fetchAdminProducts());
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    }
  };
}
export function addNewProduct(productData) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admins/products/",
        productData,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      dispatch(addProduct(response.data));
      console.log(response);
    } catch (error) {
      console.error("Error adding new product:", error);
      console.log(error, "test");
    }
  };
}
