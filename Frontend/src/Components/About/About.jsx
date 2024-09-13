
import React from "react";
import aboutImg from "../../assets/images/about.png";
import aboutCard from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () =>
{
  return( <section className="dark:border-b-[#061d39] dark:border-b px-4">
    <div className="container">
      <div className="flex justify-between gap-[50px] lg:gap-[80px] xl:gap-0 flex-col lg:flex-row">

        {/* ==========about img ========= */}
        <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
          <img src={aboutImg} alt="" />
          <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
            <img src={aboutCard} alt="" />
          </div>
        </div>
        {/* ===== about content ====== */}
        <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2 ">
          <h2 className="heading dark:text-primaryColor">Proud to be one of the nations best</h2>
          <p className="text_para dark:text-[#fde3e3]">For 30 years in a row, U.S. News & World Report has
            recognized us as one of the best public hospitals in the nation and #1 in
            Texas. We proudly extend our world-class medical services across the globe,
            with a special focus on improving healthcare access in Africa.
          </p>

          <p className="text_para dark:text-[#fde3e3] mt-[30px]">
            Our best is something we strive for each day, caring for our patients by looking
            forward to what we can achieve tomorrow rather than resting on past accomplishments.
            Providing the best care means continuously improving, innovating, and ensuring our
            patients receive the highest quality treatment at all times. We are dedicated to
            advancing healthcare for a healthier future.</p>

          <Link to="/">
            <button className="btn">Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  </section>
)
}

export default About;