import React, { useContext, useState } from "react";
import "./newStyles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Cart = () => {
  const { data, updateData } = useContext(GlobalContext);
  // console.log("data.id", data[0]?.id)
  let { id } = useParams();

  const routes = useNavigate();

  // console.log("userId", id);
  const filterData = data.filter((item) => (item.id == id ? true : false));
  // console.log("filterData", filterData[0]);
  // console.log("filterData", filterData[0]?.id);
  // console.log("filterData", filterData[0]?.category);
  // console.log("filterData", filterData[0]?.description);
  // console.log("filterData", filterData[0]?.price);
  // console.log("filterData", filterData[0]?.image);
  // console.log("filterData", filterData[0]?.rating.rate);
  // console.log("filterData", filterData[0]?.title);
  // console.log("filterData", filterData[0]?.price);
  // console.log("filterData", filterData[0]?.title);

  const [formData, setFormData] = useState({
    id: filterData[0]?.id,
    title: filterData[0]?.title,
    category: filterData[0]?.category,
    description: filterData[0]?.description,
    price: filterData[0]?.price,
    image: filterData[0]?.image,
  });

  let name, value;
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleInputChange = (event) => {
    const { name, files } = event.target;

    if (files && files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFormData({ ...formData, [name]: e.target.result });
      };

      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: event.target.value });
    }
  };




  const updateHandler = (e) => {
    e.preventDefault();
    console.log("Working on");
    const { id, title, category, description, price, image } = formData;
    console.log("formData", formData);
    updateData(id, formData);
    routes("/");
  };

  return (
    <>
      <section id="contact09">
        <div className="contact-box">
          <div className="contact-links">
            <h2 className="animate-charcter">{filterData[0]?.title}</h2>
            <div className="links">
              <p>{filterData[0]?.description}</p>

              {/* <img src={filterData[0]?.image} alt="Image" className="CartImg" /> */}
              <div className="links">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Image preview"
                      className="CartImg"
                    />
                  )}
                </div>
            </div>
          </div>
          <div className="contact-form-wrapper">
            <form>
              <h4>{filterData[0]?.category}</h4>

              <div className="form-item">
                <input
                  type="text"
                  required
                  name="title"
                  placeholder="Enter Title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                <label>Title:</label>
              </div>

              <div className="form-item">
                <input
                  type="number"
                  required
                  name="price"
                  placeholder="Enter Price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                <label>Price:</label>
              </div>

              <div className="form-item">
                <input
                  type="text"
                  required
                  name="category"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
                <label> category:</label>
              </div>
              {/* <div className="form-item">
                <input type="text" name="email" required />
                <label>Email:</label>
              </div> */}

              <div className="form-item">
                <textarea
                  className=""
                  name="description"
                  required
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
                <label>description:</label>
              </div>

              <a
                className="custom-btn btn-11 btn-12"
                onClick={(e) => updateHandler(e)}
              >
                Update
              </a>
              <Link to="/">Back</Link>
            </form>
          </div>
        </div>
      </section>

      {/* <div id="container">
        <div className="product-details">
          <h1>{filterData[0]?.title}</h1>
          
          <span className="hint-star star">
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star-o" aria-hidden="true"></i>
          </span>

          <p className="information">{filterData[0]?.description}</p>

          <div className="control">
            <button className="btn">
              <span className="price">{filterData[0]?.price}</span>
              <span className="shopping-cart">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              </span>
              <span className="buy">Get now</span>
            </button>
          </div>
        </div>

        <div className="product-image">
          <img src={filterData[0]?.image} alt="" />

          <div className="info">
          <h2>{filterData[0]?.category}</h2>
            <ul>
              <li>
                <strong>ID : </strong>{filterData[0]?.id}{" "}
              </li>
              <li>
                <strong>Rating : </strong> {filterData[0]?.rating.rate}
              </li>
              <li>
                <strong>Price: </strong>{filterData[0]?.price}
              </li>
              <li>
              
                <strong>Category: </strong>{filterData[0]?.category}
              </li>
            </ul>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Cart;
