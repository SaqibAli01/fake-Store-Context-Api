import React, { useContext, useState } from "react";
import "./newStyles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const AddProduct = () => {
  const { AddNewData } = useContext(GlobalContext);

  const routes = useNavigate();

  const [formData, setFormData] = useState({
    id: Date.now(),
    title: "",
    category: "",
    description: "",
    price: 0,
    image: "",
  });

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


  
  const addDataHandler = (e) => {
    e.preventDefault();
    AddNewData(formData);
    routes("/");
  };


  return (
    <>
      <div className="AddMain">
        <h1>Add Product</h1>

        <section id="contact09">
          <div className="contact-box">
            <div className="contact-links">
              <h2 className="animate-charcter"> Image URL </h2>
              <div className="links">
               
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
                {/* <h4>{filterData[0]?.category}</h4> */}
                <div className="form-item">
                  <input
                    type="text"
                    required
                    name="title"
                    //   placeholder="Enter Title"
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
                    //   placeholder="Enter Price"
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
                    // placeholder="Enter category"
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
                    // placeholder="Enter description"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                  <label>description:</label>
                </div>

                <a
                  className="custom-btn btn-11 btn-12"
                  onClick={(e) => addDataHandler(e)}
                >
                  Update
                </a>
                <Link to="/">Back</Link>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddProduct;
