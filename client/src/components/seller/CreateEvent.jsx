import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "../../styles/style";
import { toast } from "react-toastify";
import { createEvent } from "../../redux/actions/event";
import ReactQuill from "react-quill";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { isLoading, isEvent, error } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [stock, setStock] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [originalPrice, setOriginalPrice] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 4 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 4 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isEvent) {
      toast.success(`Event created successfully!`);
      // dispatch(clearEventState()); // Reset isEvent state
      navigate(`/dashboard`); // Make sure this line is only executed on successful event creation
      window.location.reload(true);
    }

    // console.log(isEvent);
  }, [dispatch, error, isEvent]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(fileToBase64)).then((base64Images) => {
      setImages(base64Images);
    });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = (e) => {
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

    // Check if images are less than 1
    if (images.length < 1) {
      toast.error("Please select at least 1 image");
      return;
    }

    const form = {
      name: name,
      description: description,
      category: category,
      tags: tags,
      stock: stock,
      shopId: seller._id,
      start_date: startDate,
      finish_date: endDate,
      discountPrice: discountPrice,
      originalPrice: originalPrice,
      eventImages: images,
    };

    dispatch(createEvent(form));
  };

  function handleImageRemove(index) {
    // Filter out the image at the specified index
    const updatedImages = images.filter((img, i) => i !== index);
    // Update the state with the filtered images
    setImages(updatedImages);
  }

  return (
    <div className="w-[90%] sm:w-[50%] bg-white shadow p-3 overflow-y-scroll h-[90vh] rounded-[4px]">
      <h5 className="text-center font-Poppins text-[30px]">Create An Event</h5>
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
            placeholder="Enter your event name..."
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
        <div className="block sm:flex items-center gap-6 justify-between">
          <div>
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              id="category"
              className="w-full mt-2 h-[35px] rounded-[5px]  cursor-pointer"
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
        <div className="block sm:flex items-center justify-between">
          <div>
            <label className="pb-2">
              Event Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="stock"
              id="start-date"
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              className="appearance-none block cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleStartDateChange}
              min={today}
            />
          </div>
          <div>
            <label className="pb-2">
              Event End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="stock"
              id="end-date"
              placeholder="Enter your event stock..."
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              className="appearance-none cursor-pointer block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleEndDateChange}
              min={minEndDate}
            />
          </div>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="eventImages"
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
                    src={image ? image : URL.createObjectURL(image)}
                    alt={`Event image ${index}`}
                    className="w-20 h-20 object-cover rounded-lg"
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
        </div>
        <button
          type="submit"
          className={`${styles.button} !w-full !-h[42px] !rounded-[5px]`}
        >
          <span className="text-white">Create Event</span>
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
