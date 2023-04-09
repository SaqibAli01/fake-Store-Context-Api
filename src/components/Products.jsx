import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

import "./styles.css";

import { useNavigate } from "react-router-dom";

//________________________________________________
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import Discount from "./Discount";
dayjs.extend(utc);
dayjs.extend(duration);

//_______________________________________________

const Products = () => {
  const navigate = useNavigate();
  const { data, deleteData } = useContext(GlobalContext);
  dayjs.locale("en");

  const addToCard = (id) => {
    navigate(`/card/${id}`);
    console.log(id);
  };

  const DeleteData = (id) => {
    console.log("id", id);
    alert("Delete");
    deleteData(id);
  };

  const AddProductHandlerRoutes = () =>{
    navigate(`/AddProduct`);

  }

  // const generateRandomDiscount = () => {
  //   return Math.floor(Math.random() * 50);
  // };

  // const generateRandomTime = () => {
  //   const randomDays = Math.floor(Math.random() * 10) + 1;
  //   const randomHours = Math.floor(Math.random() * 24);
  //   const randomMinutes = Math.floor(Math.random() * 60);
  //   const randomSeconds = Math.floor(Math.random() * 60);
  //   return `${randomDays}d ${randomHours}h ${randomMinutes}m ${randomSeconds}s`;
  // };

  //--------------------------------------------------
  const generateRandomTime = () => {
    const randomDays = Math.floor(Math.random() * 10) + 1;
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    const randomSeconds = Math.floor(Math.random() * 60);
    const duration = dayjs.duration({
      days: randomDays,
      hours: randomHours,
      minutes: randomMinutes,
      seconds: randomSeconds,
    });
    return duration;
  };

  const [timers, setTimers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = timers
        .map((timer) => ({
          ...timer,
          remainingTime: timer.remainingTime.subtract(1, "second"),
        }))
        .filter((timer) => timer.remainingTime.asSeconds() > 0);
      setTimers(newTimers);
    }, 1000);
    return () => clearInterval(interval);
  }, [timers]);

  useEffect(() => {
    const newTimers = data.map((product) => ({
      productId: product.id,
      remainingTime: generateRandomTime(),
    }));
    setTimers(newTimers);
  }, [data]);

  const getTimerString = (timer) => {
    const days = timer.remainingTime.days();
    const hours = timer.remainingTime.hours();
    const minutes = timer.remainingTime.minutes();
    const seconds = timer.remainingTime.seconds();
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // console.log("data", data)
  //-----------------Timer back -----------------------

  return (
    <>
      <h1 className="title">Products</h1>
      <div className='AddIcon' onClick={AddProductHandlerRoutes}>
    <i className="fa-sharp fa-solid fa-plus"></i>
    </div>

      {data?.map((product, index) => {
        // const randomDiscount = generateRandomDiscount();
        // const randomTime = generateRandomTime();
        const timer = timers.find((timer) => timer.productId === product.id);
        return (
          <div className="container" key={index}>
            <div
              className="column"
              style={{
                padding: "10px",
              }}
            >
              <div className="card">
                <div className="content">
                  <div className="desBox">
                    {/* <p className="timerBox">{randomTime}</p> */}
                    {timer && (
                      <p className="timerBox">{getTimerString(timer)}</p>
                    )}
                    {/* <p className="discount">-{randomDiscount}%</p> */}
                    <p className="discount">-{product.discount}%</p>

                    {/* <Discount /> */}
                  </div>
                  <div className="front">
                    <img
                      className="profile"
                      // width="100%"
                      style={{ width: "70%", height: "300px" }}
                      src={product.image}
                      alt="image"
                    />
                    <h2>{product.category}</h2>
                  </div>
                  <div className="back from-bottom">
                    <h2>{product.title}</h2>
                    <h3>{product.id}</h3>
                    <h3>Price | {product.price}</h3>
                    {/* <Link to="/cart"> */}
                    <img
                      className="tem-img"
                      style={{ width: "50px", height: "50px" }}
                      src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png"
                      alt="image"
                      onClick={(e) => DeleteData(index)}
                    />{" "}
                    {/* </Link> */}
                    &nbsp;
                    {/* <Link to="/cart"> */}
                    <img
                      className="tem-img"
                      style={{ width: "50px", height: "50px" }}
                      src="https://png.pngtree.com/png-vector/20190403/ourlarge/pngtree-vector-documentation-icon-png-image_908733.jpg"
                      alt=""
                      onClick={(e) => addToCard(product.id)}
                    />{" "}
                    {/* </Link> */}
                    <br />
                    <hr style={{ margin: "20px 10px" }} />
                    {/* <p className="des">{product.description}</p> */}
                    <ul className="social-icon">
                      <li>
                        <a href="">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      
    </>
  );
};

export default Products;
