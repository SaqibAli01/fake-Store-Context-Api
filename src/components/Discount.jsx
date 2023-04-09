import React from "react";

const Discount = () => {
  const generateRandomDiscount = () => {
    return Math.floor(Math.random() * 50);
  };
  const randomDiscount = generateRandomDiscount();

  return (
    <div>
      <p className="discount">-{randomDiscount}%</p>
    </div>
  );
};

export default Discount;
