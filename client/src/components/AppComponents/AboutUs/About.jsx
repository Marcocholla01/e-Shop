import React from "react";
import styles from "../../../styles/style";
import { Link } from "react-router-dom";
import { TiThumbsUp } from "react-icons/ti";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import banner from "../../../assets/images/banner-1.jpg";

const About = () => {
  return (
    <div className="w-full sm:flex  justify-between sm:flex-col">
      <div
        className={`relative min-h-[20vh]  w-full bg-no-repeat ${styles.normalFlex}  bg-[#000] w-full bg-cover bg-center`}
        // style={{
        //   backgroundImage: `url(${banner})`,
        // }}

        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/silhouette-business-people-discussion-meeting-cityscape-team-concept_53876-146187.jpg?w=1380&t=st=1711827124~exp=1711827724~hmac=17ee4f1ea435835857bee1c7f1c2c9576544f60e1e1b32973ebc9bba8866739c)",
        }}
      >
        <div className={`w-full`}>
          <h1 className="text-[35px] leading-[1.2] sm:text-[40px] text-[#000] font-[600] capitalize text-center p-2 bg-[#00000011] w-full">
            ABOUT US
          </h1>
        </div>
      </div>
      <div
        className={`${styles.section} w-[90%] sm:w-[70%] flex flex-col justify-between items-center`}
      >
        {/* About us history */}
        <div className="sm:flex items-center mt-[50px] flex-col gap-[30px]">
          <div className="sm:flex flex-row justify-between  gap-[30px]">
            <div className="mr-[10px]">
              <p className="text-blue-600 text-lg font-semibold mt-3">
                OUR HISTORY
              </p>
              <h1 className="font-[600] text-[30px] text-[#000000c7]">
                CREATIVE AND NEW FASHION TRENDS COLLECTION
              </h1>
              <p className="mt-[20px] text-lg">
                Fashion is a potent visual marker of our times,” says Caroline
                Stevenson, head of cultural and ... “Trend analysis of any given
                era will reveal society's values and aspirations.” ... The urge
                to creative expression runs deep
              </p>
              <div className="flex mt-5 gap-3 justify-between">
                <div className="flex flex-col items-center">
                  <h1 className="font-bold text-[38px] text-left text-blue-600">
                    12
                  </h1>
                  <p>Years of Experince</p>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="font-bold text-[38px] text-left text-blue-600">
                    20k
                  </h1>
                  <p>Happy Customer</p>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="font-bold text-[38px] text-left text-blue-600">
                    100%
                  </h1>
                  <p>Clients Satisfacation</p>
                </div>
              </div>
            </div>
            <img
              src="https://themes.rslahmed.dev/rafcart/assets/images/about-img.jpg"
              alt=""
              srcset=""
              className="h-auto w-[400px] rounded-[10px] shadow object-cover sm:mt-0 mt-[50px]"
            />
          </div>
        </div>

        {/* About us Vision */}

        <div className="sm:flex items-center  sm:mt-[100px] flex-col  gap-[30px]">
          <div className="sm:flex sm:flex-row flex flex-col-reverse justify-between  gap-[30px]">
            <img
              src="https://themes.rslahmed.dev/rafcart/assets/images/about-img-2.jpg"
              alt=""
              srcset=""
              className="h-auto w-[400px] rounded-[10px] shadow object-cover"
            />
            <div className="mr-[10px] sm:mt-0 mt-[50px]">
              <p className="text-blue-600 text-lg font-semibold mt-3">
                OUR VISION
              </p>
              <h1 className="font-[600] text-[30px] text-[#000000c7]">
                OUR VISION IS SIMPLE - WE EXIST TO ACCELERATE OUR CUSTOMERS’
                PROGRESS
              </h1>
              <p className="mt-[20px] text-lg">
                we design and deliver our customers’ digital transformation by
                bringing together their vision with our industry knowledge and
                deep technological expertise. we design and deliver our
                customers’ digital transformation
              </p>
              <div className="flex flex-col mt-5 gap-3 justify-between">
                <div className="flex  items-center">
                  <TiThumbsUp className=" text-[20px] text-blue-600 mr-3" />

                  <p>We build strong relationships</p>
                </div>
                <div className="flex items-center">
                  <TiThumbsUp className="font- text-[20px]  text-blue-600 mr-3" />
                  <p>We encourage initiative and provide opportunity</p>
                </div>
                <div className="flex items-center">
                  <TiThumbsUp className=" text-[20px] text-blue-600 mr-3" />
                  <p>We embrace change and creativity</p>
                </div>
                <div className="flex items-center">
                  <TiThumbsUp className=" text-[20px] text-blue-600 mr-3" />
                  <p>We champion an environment of honesty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About us team */}
        {/* <div className="w-full items-center flex flex-col m-[20px]">
          <h1 className="uppercase mt-[20px] font-[600] text-[30px] text-[#000000c7]">
            Meet our team
          </h1>
          <div className="sm:flex items-center mt-[20px]  flex-row gap-10 justify-between ">
            <div className="items-center w-full flex">
              <div className="">
                <img
                  src="https://marcocholla001.onrender.com/static/media/me2.24fe524e008531584475.png"
                  alt=""
                  srcset=""
                  className="h-auto w-[400px] rounded-[10px] shadow object-cover"
                />
                <div className="items-center justify-center mt-[20px]">
                  <h1 className="text-center font-semibold text-[#000000c2] text-xl">
                    Paul Ocholla
                  </h1>
                  <p className="text-center text-[#000000c2] text-lg">
                    Founder
                  </p>
                  <p className="text-center text-[#000000c2] text-lg">
                    Founder
                  </p>
                  <p className="text-center text-[#000000c2] text-lg">
                    Founder
                  </p>
                </div>

                <div className="flex mt-[20px] m-4 items-center justify-center gap-[10px]">
                  <a href="#" target="_balnk">
                    <FaFacebookSquare size={30} className="text-blue-700" />
                  </a>

                  <a href="#" target="_balnk">
                    <FaXTwitter size={30} />
                  </a>
                  <a href="#" target="_balnk">
                    <FaLink size={20} />
                  </a>
                  <a href="#" target="_balnk">
                    <FaSquareGithub size={30} />
                  </a>
                  <a href="#" target="_balnk">
                    <FaLinkedin size={30} className="text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
            <div className="items-center w-full flex">
              <div className="">
                <img
                  src="https://marcocholla001.onrender.com/static/media/In.52f82c87c963f5cee914.png"
                  alt=""
                  srcset=""
                  className="h-auto w-[400px] rounded-[10px] shadow object-cover"
                />
                <div className="items-center justify-center mt-[20px]">
                  <h1 className="text-center font-semibold text-[#000000c2] text-xl">
                    Paul Ocholla
                  </h1>
                  <p className="text-center text-[#000000c2] text-lg">
                    Founder
                  </p>
                  <p className="text-center text-[#000000c2] text-lg">
                    Founder
                  </p>
                  <p className="text-center text-[#000000c2] text-lg">
                    Founder
                  </p>
                </div>

                <div className="flex mt-[20px] m-4 items-center justify-center gap-[10px]">
                  <a href="#" target="_balnk">
                    <FaFacebookSquare size={30} className="text-blue-700" />
                  </a>

                  <a href="#" target="_balnk">
                    <FaXTwitter size={30} />
                  </a>
                  <a href="#" target="_balnk">
                    <FaLink size={20} />
                  </a>
                  <a href="#" target="_balnk">
                    <FaSquareGithub size={30} />
                  </a>
                  <a href="#" target="_balnk">
                    <FaLinkedin size={30} className="text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default About;
