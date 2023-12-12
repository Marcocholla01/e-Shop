import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/style";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex py-10 bg-[#f5f5f5]`}>
        <div className="w-[330px]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>

        <ProfileContent active={active} />
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default ProfilePage;
