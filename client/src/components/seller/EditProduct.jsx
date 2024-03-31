import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "../../styles/style";
import { toast } from "react-toastify";
import { getAllProductsShop } from "../../redux/actions/product";
import axios from "axios";
import { BASE_URL, backend_url } from "../../config";

const EditProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

  const [tags, setTags] = useState([]);

  function handleKeyDown(e) {
    // If user did not press space bar key, return
    if (e.key !== " ") return;
    // Get the value of the input
    const value = e.target.value;
    // If the value is empty, return
    if (!value.trim()) return;
    // Add the value to the tags array
    setTags([...tags, value]);
    // Clear the input
    e.target.value = "";
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${BASE_URL}/product/${id}`)
      .then((res) => {
        const productData = res.data.product;
        // console.log(productData);

        setData(productData);
        setName(productData.name);
        setDescription(productData.description);
        setCategory(productData.category);
        setTags(productData.tags);
        setOriginalPrice(productData.originalPrice);
        setDiscountPrice(productData.discountPrice);
        setStock(productData.stock);
        dispatch(getAllProductsShop(id));
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch, id]);

  // console.log(data);
  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any  field is empty
    if (!name) {
      toast.error("Please enter your product name!");
      return;
    }
    if (!description) {
      toast.error("Please enter your product description!");
      return;
    }
    if (!category) {
      toast.error("Please choose your product's category!");
      return;
    }
    if (!stock) {
      toast.error("Please enter how many products stock you have!");
      return;
    }
    if (!originalPrice) {
      toast.error("Please enter products original price!");
      return;
    }

    // Check if "Price (With Discount)" is less than "Price"
    if (discountPrice > originalPrice) {
      toast.error("Price must be more than Price (After Discount)");
      return; // Do not proceed with form submission
    }

    await axios
      .put(
        `${BASE_URL}/product/eidt-product/${id}`,
        {
          name,
          description,
          discountPrice,
          originalPrice,
          tags,
          stock,
          category,
        },

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        dispatch(getAllProductsShop(seller._id));
        navigate(`/dashboard-products`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-[90%] sm:w-[50%] bg-white shadow p-3 overflow-y-scroll h-[90vh] rounded-[4px]">
      <h5 className="text-center font-Poppins text-[30px]">Edit Product</h5>
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
            placeholder={name}
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
            value={description}
            placeholder="Enter your product's description..."
            className="appearance-none block w-full h-[200px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
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
              className="w-full mt-2 h-[35px] rounded-[5px] cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={`Choose a category`}>Choose a category</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option value={i.title} key={i.title}>
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
          {/* <Tags value={tags} onChange={(e) => setTags(e.target.value)} /> */}

          <div className="tags-input-container border border-gray-300 p-2 rounded-md w-min-40 mt-4 flex items-center flex-wrap gap-2">
            {tags &&
              tags.map((tag, index) => (
                <div
                  key={index}
                  className="tag-item bg-gray-200 rounded-full px-3 py-1 flex items-center w-auto"
                >
                  <span className="text-gray-700 mr-1">{tag}</span>
                  <button
                    onClick={() => removeTag(index)}
                    className="close w-5 h-5  text-white rounded-full flex justify-center items-center text-xs cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              ))}
            <input
              onKeyDown={handleKeyDown}
              type="text"
              // value={tags}
              // onChange={(e) => setTags(e.target.value)}
              className="tags-input flex-grow bg-gray-10 border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your product's tags..."
            />
          </div>

          {/* <input
            type="text"
            name="tags"
            id="tags"
            value={tags}
            placeholder="Enter your product's tags"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
          /> */}
        </div>
        <br />
        <div className="block sm:flex items-center justify-between">
          <div>
            <label className="pb-2">
              Original Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
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
            <label className="pb-2">Price (After Discount)</label>
            <input
              type="number"
              name="discountPrice"
              id="discountPrice"
              placeholder="Enter your product price + discount price..."
              value={discountPrice}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setDiscountPrice(e.target.value)}
            />
          </div>
        </div>
        <br />

        <br />

        {/* image upload */}
        {/* <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="productImages"
            id="upload"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="flex flex-wrap w-full items-center">
            <label htmlFor="upload">
              <AiOutlinePlusCircle
                size={30}
                className="mt-3 cursor-pointer"
                color="#555"
              />
            </label>
            {images &&
              images.map((image, index) => (
                <div
                  className="relative inline-block mr-4 mb-4 mt-4"
                  key={index}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`product image ${index}`}
                    className="h-[120px] w-[120px] object-cover rounded-[7px]"
                  />
                  <button
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-0 right-0 -mt-1 -mr-1 text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              ))}
          </div>
        </div> */}

        {/* Existing images */}
        {/* <div>
          {data?.images &&
            data?.images.map((image, index) => (
              <div key={index} className="relative m-2">
                <img
                  src={
                    image instanceof File
                      ? URL.createObjectURL(image)
                      : `${backend_url}/uploads/${image.filename}`
                  }
                  alt={`product image ${index}`}
                  className="h-[120px] w-[120px] object-cover rounded-[7px]"
                />
                <div className="absolute top-0 right-0 flex">
                  <button
                    className="p-1 bg-red-500 rounded-full text-white text-xs mr-1"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Remove
                  </button>
                  <label className="p-1 bg-blue-500 rounded-full text-white text-xs cursor-pointer">
                    Replace
                    {/* Trigger file input when clicked
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageReplace(e, index)}
                    />
                  </label>
                </div>
              </div>
            ))}
        </div> */}
        <button
          type="submit"
          className={`${styles.button} !w-full !-h[42px] !rounded-[5px]`}
        >
          <span className="text-white">Edit Product</span>
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
