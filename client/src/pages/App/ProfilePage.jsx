import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import styles from "../../styles/style";
import ProfileSidebar from "../../components/AppComponents/Profile/ProfileSidebar";
import ProfileContent from "../../components/AppComponents/Profile/ProfileContent";
import DownloadApp from "../../components/DownloadApp/DownloadApp";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex py-10 bg-[#f5f5f5]`}>
        <div className="w-[50px] sm:w-[335px] sticky sm:mt-0 mt-[15%]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>

        <ProfileContent active={active} />
      </div>
      {/* <DownloadApp />
      <Footer /> */}
    </div>
  );
};

export default ProfilePage;
