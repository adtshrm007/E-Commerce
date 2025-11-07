import { useState, useEffect } from "react";
import cart from "../assets/cart (2).svg";
import { showCart } from "../utils/GETCartItems";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCounter, setCartCounter] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    async function loadCart() {
      const data = await showCart();
      setCartCounter(data.items.length);
    }
    loadCart();
  }, []);

  const hamburgerIconClass = isMenuOpen ? "hidden h-6 w-6" : "block h-6 w-6";
  const closeIconClass = isMenuOpen ? "block h-6 w-6" : "hidden h-6 w-6";
  const mobileMenuClass = isMenuOpen ? "block md:hidden" : "hidden md:hidden";

  return (
    <>
      <header className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center font-radonregular">
              <p className="text-white text-xl font-bold">E-Commerce</p>
            </div>

            <nav className="hidden md:flex items-center space-x-4 sm:space-x-8 font-radonregular text-slate-500">
              <Link to="/">
                <p className="text-gray-300 hover:text-white transition-colors">
                  Home
                </p>
              </Link>
              <Link to="/cart">
                <p className="text-gray-300 hover:text-white transition-colors">
                  Cart
                </p>
              </Link>
              <Link to="/order">
                <p
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Order
                </p>
              </Link>
            </nav>

            <div className="w-[5%] h-[100%] flex items-center justify-center gap-[2px] text-slate-200 font-radonregular">
              <p>{cartCounter}</p>
              <img src={cart} alt="cart" className="w-[100%] h-[60%]" />
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={hamburgerIconClass}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={closeIconClass}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={mobileMenuClass}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              About
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Services
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Contact
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
