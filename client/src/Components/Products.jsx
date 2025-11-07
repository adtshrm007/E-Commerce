import { getProducts } from "../utils/GETProducts";
import { useEffect, useState } from "react";
import { addItemsToCart } from "../utils/POSTItemsToCart";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function showProducts() {
      const res = await getProducts();
      setProducts(res);
    }
    showProducts();
  }, []);

  async function handleAddToCart(p) {
    try {
      const res = await addItemsToCart(p._id,1);

      console.log("Added to cart:", res);
      alert("Added to cart")
      window.location.reload();
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  }

  return (
    <>
      <div className="w-full max-w-[1100px] mx-auto h-fit mt-10 mb-12 flex flex-wrap justify-center p-5 gap-4 rounded-[20px]">
        {products.map((p) => (
          <div
            key={p._id || p.productID} // Use MongoDB _id if available
            className="w-[240px] sm:w-[220px] md:w-[240px] h-[350px] bg-slate-400 rounded-[10px] p-2 flex flex-col justify-between
                 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="w-full">
              <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center w-full h-[290px]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-32 h-32 object-cover mb-3"
                />
                <h3 className="text-gray-800 font-semibold text-sm text-center line-clamp-2">
                  {p.name}
                </h3>
                <p className="text-gray-500 text-sm mb-2">${p.price}</p>
              </div>
            </div>

            <div className="w-full h-[10%] flex items-center justify-center">
              <button
                className="bg-slate-600 text-white px-3 py-1 rounded hover:bg-blue-700 rounded-[10px] cursor-pointer w-[90%] text-sm"
                onClick={() => handleAddToCart(p)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
