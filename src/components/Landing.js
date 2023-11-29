import React from "react";
import "../public/assets/css/App.css"
import VideoCarousel from "./VideoCarousel";
import styles from "./jsmaster";
import {
  Clients,
  Testimonials,
} from "./components";
const Landing = (props) => {
  <div className="bg-primary w-full overflow-hidden">
    <div
      className={`${styles1.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}
    >
      <section
        id="landingPage"
        className={`${styles1.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}
      >
        <div id="description" className={`w-3/4 mx-auto`}>
          <h3 className="font-poppins font-semibold xs:text-[40.45px] text-[30.45px] xs:leading-[56.58px] leading-[38.58px] text-gradient uppercase ml-3">
            Welcome to the Crafter Bazaar!
          </h3>
          <h5 className="font-poppins font-semibold xs:text-[18.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient sentencase ml-3">
            A place where handicrafts can create their own inventory,
            update it, and sell  products to everyone who is
            interested in unique products. Shoppers can search for the
            products they are interested in and find the appropriate seller who sell those products.
          </h5>
        </div>
        {/* <ShoppersSearch /> */}
      </section>
    </div>
    <br></br>
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Testimonials />
        <Clients />
      </div>
    </div>
    <VideoCarousel />
  </div>
}
export default Landing;
