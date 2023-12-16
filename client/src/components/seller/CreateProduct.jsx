import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "../../styles/style";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescrtiption] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  return (
    <div className="w-[90%] sm:w-[50%] bg-white shadow p-3 overflow-y-scroll h-[70vh] rounded-[4px]">
      <h5 className="text-center font-Poppins text-[30px]">Create Product</h5>
      {/* craete product form */}

      <form action="" onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Enter your product name..."
            value={name}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={description}
            placeholder="Enter your product's description..."
            className="appearance-none block w-full h-[200px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescrtiption(e.target.value)}
          />
        </div>
        <br />
        <div className="block sm:flex items-center justify-between">
          <div>
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              id="category"
              required
              className="w-full mt-2 h-[35px] rounded-[5px] cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={`Choose a category`}>Choose a category</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option value={i.title} key={i.title} required>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div>
            <label className="pb-2">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              min="10"
              step="1"
              required
              placeholder="Enter your product stock..."
              value={stock}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={tags}
            placeholder="Enter your product's tags"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <br />
        <div className="block sm:flex items-center justify-between">
          <div>
            <label className="pb-2">Price</label>
            <input
              type="number"
              min="50"
              step="10"
              // type="tel"
              // pattern="[0-9]"
              name="originalPrice"
              id="originalPrice"
              placeholder="Enter your product price..."
              value={originalPrice}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Price (With Discount)
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="10"
              name="discountPrice"
              id="discountPrice"
              required
              placeholder="Enter your product discount price..."
              value={discountPrice}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setDiscountPrice(e.target.value)}
            />
          </div>
        </div>
        <br />

        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            required
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="flex flex-wrap w-full items-center">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt="product image"
                  className="h-[120px] w-[120px] object-cover m-2 rounded-[7px]"
                />
              ))}
          </div>
        </div>
        <button
          type="submit"
          className={`${styles.button} !w-full !-h[42px] !rounded-[5px]`}
        >
          <span className="text-white">Create Product</span>
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
