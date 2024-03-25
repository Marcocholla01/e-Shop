import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteShopProduct,
  getAllProductsShop,
} from "../../redux/actions/product";
import {
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { categoriesData } from "../../static/data";
import axios from "axios";
import { BASE_URL } from "../../config";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();

  const [productData, setProductData] = useState("");
  const [images, setImages] = useState([]);
  const [name, setName] = useState(productData.name);
  const [description, setDescrtiption] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);
  // console.log(products && products);

  const handledelete = (id) => {
    // console.log(id);
    dispatch(deleteShopProduct(id));
    // dispatch(clearProductState())
    toast.success("Product deleted successfully");
    window.location.reload(true);
  };

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

    // dispatch(editProduct(newForm));

    await axios
      .put(`${BASE_URL}/product/edit-product/${productData.id}`, newForm, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        dispatch(getAllProductsShop(seller._id));
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 70,
      flex: 0.6,
    },
    {
      field: "originalPrice",
      headerName: "Original Price",
      minWidth: 70,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.5,
      minWidth: 40,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Edit",
      flex: 0.5,
      minWidth: 40,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard-edit-product/${params.id}`}>
              <Button
              // onClick={() => setOpen(true) || setProductData(params.row)}
              >
                <BiEdit size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.5,
      minWidth: 40,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handledelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        category: item.category,
        price: "KSHS " + item.discountPrice,
        originalPrice: "KSHS " + item.originalPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}

      {/* {open && (
        <>
          <div className="w-full fixed top-0 left-0 items-center flex bg-[#0000004e] h-screen z-[9999] justify-center">
            <div
              className={`sm:w-[40%] w-[95%] bg-white shadow rounded min-h-[25vh] p-3 overflow-y-scroll`}
            >
              <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer mr-3"
                  onClick={() => setOpen(false)}
                />
              </div>
              {/* <div className="w-[90%] sm:w-[50%] bg-white shadow p-3 overflow-y-scroll h-[70vh] rounded-[4px]"> */}
      {/* <h5 className="text-center font-Poppins text-[30px]">
                Edit Product
              </h5> */}
      {/* craete product form */}

      {/* <form action="" 
              // onSubmit={handleSubmit}
              >
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
                    value={productData?.description}
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
                      value={productData.category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value={`Choose a category`}>
                        Choose a category
                      </option>
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
                      value={productData.Stock}
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
                      // type="number"
                      // type="tel"
                      // pattern="[0-9]"
                      name="originalPrice"
                      id="originalPrice"
                      placeholder="Enter your product price..."
                      value={productData.originalPrice}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Price (After Discount)</label>
                    <input
                      // type="number"
                      name="discountPrice"
                      id="discountPrice"
                      placeholder="Enter your product price + discount price..."
                      value={productData.originalPrice}
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
                      <AiOutlinePlusCircle
                        size={30}
                        className="mt-3 cursor-pointer"
                        color="#555"
                      />
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
                  <span className="text-white">Edit Product</span>
                </button>
              </form>
            </div>
          </div> */}
      {/* </div> */}
      {/* </> */}
      {/* )} */}
    </>
  );
};

export default AllProducts;
