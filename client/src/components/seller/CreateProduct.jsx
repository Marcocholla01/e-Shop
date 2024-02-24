import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "../../styles/style";
import { toast } from "react-toastify";
import { createProduct } from "../../redux/actions/product";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { isLoading, isProduct, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescrtiption] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isProduct) {
      toast.success(`Product created successfully!`);
      // dispatch(clearProductState()); // Reset isProduct state
      navigate(`/dashboard`); // Make sure this line is only executed on successful product creation
      window.location.reload(true);
    }

    // console.log(isProduct);
  }, [dispatch, error, isProduct]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
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

    // Check if images are less than 3
    if (images.length < 2) {
      toast.error("Please select at least 2 images");
      return;
    }
    // Check if images are less than 3
    if (images.length > 4) {
      toast.error("You can only upload 4 images");
      return;
    }

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    dispatch(createProduct(newForm));
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
        <div>
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
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((image) => (
                <img
                  src={URL.createObjectURL(image)}
                  key={image.name}
                  alt={`product image ${image.name}`}
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
