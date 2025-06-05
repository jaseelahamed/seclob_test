// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="font-semibold">{product.name}</h3>
      <ul className="mt-2 space-y-1 text-sm">
        {product.variants.map((v, i) => (
          <li key={i}>
            RAM: {v.ram}, Price: ₹{v.price}, Qty: {v.qty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCard;