import React from "react";
import Welcome from "../../assets/images/welcome.jpg";

function WelcomePopup({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }  bg-[#0000003b]`}
      style={{ zIndex: 999 }}
    >
      {/* <div className="fixed inset-0 bg-gray-900 opacity-50"></div> */}
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl w-full">
        <div className="flex justify-between  p-4 flex-col">
          {/* <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none flex itemes-end justify-end r-0"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button> */}
          <div className="flex">
            <div className="flex flex-row">
              <div className="p-4">
                {/* <img
                  src="https://media.istockphoto.com/id/1292561966/vector/welcome-banner-speech-bubble-label-ribbon-template-vector-stock-illustration.jpg?s=612x612&w=0&k=20&c=0qHYdRFQ65JQKWrcztwrzJE6-7ITGw4arq-RqhIM0-U="
                  alt="Welcome Image"
                  className="w-full h-auto"
                />

🎉 Welcome to ShopO! Your Ultimate Shopping Destination! 🎉 */}
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                🎉 Welcome to ShopO! 🎉
                </h2>
                <p className="text-gray-600 text-center">
                  Your Ultimate Shopping Destination!
                </p>
                <div className="p-4">
                  <p className="text-gray-700 mb-4">
                    At <strong>ShopO</strong>, we're dedicated to providing you with an
                    exceptional shopping experience like no other. Whether
                    you're on the hunt for trendy fashion pieces, cutting-edge
                    gadgets, or home essentials, we've got you covered! <br /> <br />
                    Explore our vast collection of products sourced from top
                    brands and trusted sellers worldwide. From fashion-forward
                    apparel to the latest tech gadgets, you'll find everything
                    you need to elevate your lifestyle right here at <strong>ShopO</strong>.{" "}
                    <br /> <br />
                    But that's not all! Enjoy hassle-free shopping with our
                    secure payment options and lightning-fast delivery service.
                    Plus, our friendly customer support team is always here to
                    assist you every step of the way. <br /> <br />
                    Join the ShopO family today and embark on a journey of
                    endless discoveries and unbeatable deals. Start shopping now
                    and experience the joy of finding exactly what you're
                    looking for, only at <strong>ShopO</strong>!
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 text-center p-4">
                  🛍️ Happy Shopping! 🛍️
                </h2>
                  <button
                    onClick={onClose}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  >
                    continue shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePopup;
