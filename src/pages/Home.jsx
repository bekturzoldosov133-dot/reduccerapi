import React, { useEffect, useState } from "react";
import { useProduct } from "../context/MainContext";
import scss from "./Home.module.scss";

const Home = () => {
  const { getProducts, createProduct, deleteProduct, products } = useProduct();
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    getProducts();
  }, []);

  function hundleSubmit(e) {
    e.preventDefault();

    createProduct(form);
    setForm({
      title: "",
      price: "",
      image: "",
    });
  }

  function hundlChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div id={scss.home}>
        <div className="container">
          <div className={scss.home}>
            <form onSubmit={hundleSubmit}>
              <input
                name="title"
                value={form.title}
                onChange={hundlChange}
                type="text"
                placeholder="Product Title"
              />
              <input
                name="price"
                onChange={hundlChange}
                value={form.price}
                type="number"
                placeholder="Price"
              />
              <input
                name="image"
                value={form.image}
                onChange={hundlChange}
                type="text"
                placeholder="URL  "
              />
              <button onClick={() => hundleSubmit}>create</button>
            </form>
            <div>
              <div className={scss.products}>
                {products.length === 0 ? (
                  <div className={scss.info}>
                    <h1>No product...</h1>
                  </div>
                ) : (
                  products.map((item, index) => (
                    <div key={index} className={scss.blog}>
                      <h1>{item.title}</h1>
                      <h2>{item.price}</h2>
                      {item.image && <img src={item.image} alt="" />}
                      <button onClick={() => deleteProduct(item._id)}>
                        delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
