import React, { useEffect, useRef, useState } from "react";
import { getAllEventsShop } from "../../redux/actions/event";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "../../styles/style";
import { BASE_URL } from "../../config";
import ReactQuill from "react-quill";

const EditEvent = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${BASE_URL}/event/${id}`)
      .then((res) => {
        const eventData = res.data.event;
        // console.log(eventData);

        setData(eventData);
        setName(eventData.name);
        setDescription(eventData.description);
        setCategory(eventData.category);
        setOriginalPrice(eventData.originalPrice);
        setDiscountPrice(eventData.discountPrice);
        setStock(eventData.stock);
        dispatch(getAllEventsShop(id));
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
      toast.error("Please enter your event name!");
      return;
    }
    if (!description) {
      toast.error("Please enter your event description!");
      return;
    }
    if (!category) {
      toast.error("Please choose your event's category!");
      return;
    }
    if (!stock) {
      toast.error("Please enter how many events stock you have!");
      return;
    }
    if (!originalPrice) {
      toast.error("Please enter events original price!");
      return;
    }

    // Check if "Price (With Discount)" is less than "Price"
    if (discountPrice > originalPrice) {
      toast.error("Price must be more than Price (After Discount)");
      return; // Do not proceed with form submission
    }

    await axios
      .put(
        `${BASE_URL}/event/eidt-event/${id}`,
        {
          name,
          description,
          discountPrice,
          originalPrice,
          stock,
          category,
        },

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        dispatch(getAllEventsShop(seller._id));
        navigate(`/dashboard-all-events`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-[90%] sm:w-[50%] bg-white shadow p-3 overflow-y-scroll h-[90vh] rounded-[4px]">
      <h5 className="text-center font-Poppins text-[30px]">Edit Event</h5>
      {/* craete event form */}

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
        <div className="h-[400px]">
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <div className="overflow-auto">
            <ReactQuill
              value={description}
              onChange={setDescription}
              placeholder="Enter your event's description..."
              className="appearance-none block w-full h-[350px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
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
              Event Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              placeholder="Enter your event stock..."
              value={stock}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
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
              placeholder="Enter your event price..."
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
              placeholder="Enter your event price + discount price..."
              value={discountPrice}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setDiscountPrice(e.target.value)}
            />
          </div>
        </div>
        <br />

        <br />

        {/* image upload */}

        <button
          type="submit"
          className={`${styles.button} !w-full !-h[42px] !rounded-[5px]`}
        >
          <span className="text-white">Edit Event</span>
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
