import Carousel from "nuka-carousel"
import banner1 from "../../../../assets/images/banner/banner-1.png"
import banner2 from "../../../../assets/images/banner/banner-2.png"
import banner3 from "../../../../assets/images/banner/banner-3.png"
import banner4 from "../../../../assets/images/banner/banner4.jpg"
// import banner5 from "../../../../assets/images/banner/banner-1.png"
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom"

const HeroSlider = () => {

  const config = {

    nextButtonClassName: "rounded-full",
    nextButtonText: <IoIosArrowForward />,
    pagingDotsClassName: "me-2 w-7 h-7",
    pagingDotsContainerClassName: "",
    prevButtonClassName: "rounded-full",
    prevButtonText: <IoIosArrowBack />,
  }

  return (
    <Carousel defaultControlsConfig={config} autoplay className="rounded-md overflow-hidden" wrapAround >

      <Link ><img src={banner1} className="h-full w-full" width={2000} height={1125}/> </Link>
      <Link ><img src={banner2} className="h-full w-full" width={2000} height={1125}/> </Link>
      <Link ><img src={banner3} className="h-full w-full" width={2000} height={1125}/> </Link>
      <Link ><img src={banner4} className="h-full w-full" width={2000} height={1125}/> </Link>
      {/* <Link ><img src={banner1} className="h-full w-full" width={2000} height={1125}/> </Link> */}

     
    
      {/* <img src="/image5.png" /> */}
    </Carousel>
  )
}

export default HeroSlider;
