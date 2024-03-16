import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";

const DropDown = ({ categoriesData, setDropDown }) => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const submitHandle = (i) => {
    dispatch(getAllProducts());
    setDropDown(false);
    navigate(`/products?category=${i.title}`);
    // window.location.reload();
  };
  return (
    <div className="pb-4 w-[260px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: "35px",
                height: "35px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
                paddingRight: "10px",
              }}
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
