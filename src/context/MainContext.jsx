import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

const productContext = createContext();
export const useProduct = () => useContext(productContext);

const API = "https://api-crud.elcho.dev/api/v1/09c70-a651e-ae5ce/zhenish";

const initialState = {
  products: [],
  product: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };

    case "GET_ONE_PRODUCT":
      return { ...state, product: action.payload };

    case "ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

const MainContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getProducts() {
    try {
      let { data } = await axios.get(API);
      dispatch({
        type: "GET_PRODUCTS",
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  }

  async function getOneProduct(id) {
    try {
      let { data } = await axios.get(`${API}/${id}`);
      dispatch({
        type: "GET_ONE_PRODUCT",
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  }

  async function createProduct(newProduct) {
    try {
      await axios.post(API, newProduct);
      getProducts();
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getProducts();
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  }

  const values = {
    getOneProduct,
    getProducts,
    createProduct,
    deleteProduct,
    products: state.products,
    product: state.product,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default MainContext;
