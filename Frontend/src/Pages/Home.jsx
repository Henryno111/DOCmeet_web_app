import React from "react";
import heroImg01 from "../assets/images/hero-img01.png";
import heroImg04 from "../assets/images/hero-img04.png";
import heroImg05 from "../assets/images/hero-img05.png";
import heroImg03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import featureImg from "../assets/images/feature-img.png";
import faqImg from "../assets/images/faq-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png"
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs"
import About from "../Components/About/About";
import ServiceList from "../Components/Services/ServicesList";
import DoctorList from "../Components/Doctors/DoctorList";
import FaqList from "../Components/Faq/FaqList"
import Testimonial from "../Components/Testimonial/testimonial";
const Home = () =>
{
  return (
    <>
      {/* ====== hero section ======== */}

      <section className="hero_section dark:border-b px-4 dark:border-b-[#061d39] dark:bg-[#011027]  pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* ====== hero content ======= */}
            <div>
              <div className="lg:w-[570px] flex flex-col gap-y-6 items-center justify-center">
                <h1 className="text-[28px]  dark:text-white text-justify leading-[33px] text-headingColor font-[800] md:text-[36px] md:leading-[45px]">
                  We prioritize your health for a brighter, healthier future.
                </h1>
                <p className="text_para  dark:text-[#fde3e3] text-justify">
                  Our platform connects you with experienced doctors, providing easy and
                  convenient appointment booking. Whether it's for routine check-ups or
                  specialized care, we ensure you receive the attention you deserve.
                  Your well-being is our mission, and we are committed to helping you
                  lead a healthier life.
                </p>

                <button className="btn md:w-[50%] !bg-teal-500">Request an Appointment</button>
              </div>
              {/* ====== hero counter ======= */}

              <div className="mt-[30px] lg:mt-[70px] flex flex-wrap justify-evenly items-center lg:flex-row sm:flex-row sm:items-center sm:justify-evenly lg:items-center gap-5 lg:gap-[30px]">

                <div>
                  <h2 className="text-[28px] leading-[36px] sm:text-[36px] sm:leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-teal-600" >30+</h2>
                  {/* <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span> */}
                  <p className="text_para  dark:text-white">
                    Years of Experience</p>
                </div>

                <div>
                  <h2 className="text-[28px] leading-[36px] sm:text-[36px] sm:leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-teal-600">15+</h2>
                  {/* <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span> */}
                  <p className="text_para  dark:text-white">
                    Clinic Locations</p>
                </div>

                <div>
                  <h2 className="text-[28px] leading-[36px] sm:text-[36px] sm:leading-[56px] lg:leading-[54px] font-[700] text-teal-600 " >100%</h2>
                  {/* <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span> */}
                  <p className="text_para dark:text-white">
                    Patients Satisfaction</p>
                </div>
              </div>

            </div>
            {/* ======== hero content ========= */}

            <div className="flex gap-[8px] justify-end">
              <div>
                <img className="w-full rounded-lg" src={heroImg04} alt="" />
              </div>
              <div className="mt-[3]">
                <img src={heroImg05} alt="" className="w-full mb-[8px] rounded-lg" />
                <img src={heroImg03} alt="" className="w-full" />
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ====== hero section end ======== */}

      {/* ====== Qualities ========== */}
      <section className="dark:border-b dark:border-b-[#061d39]">
        <div className="container">
          <div className="lg:w-[540px] lg:text-2xl mx-auto">
            <h2 className="heading text-center text-slate-900  dark:text-teal-600">
              Providing the best medical services
            </h2>
            <p className="text_para text-center dark:text-white">
              World-class care for everyone. Our health system offers unmatched,
              export health care. From the lab to the Clinic.
            </p>
          </div>

          {/* <div className="flex flex-wrap items-center flex-col md:flex-row gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]"></div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] mt[30px] lg:mt-[55px]">

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon01} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-teal-600 font-[700] text-center">
                  Find a Doctor
                </h2>
                <p className="text-[16px] leading-7 dark:text-white text-textColor font-[400] mt-4 text-center">
                  Connect with highly skilled and compassionate medical professionals. Browse our network of
                  experienced doctors across various specialties to find the right one for your specific needs.
                </p>

                <Link to='/doctors' className="w-[44px] h-[44px] rounded-full border border-teal-600 border-solid mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className="group-hover:text-white w-6 h-5 text-teal-400" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon02} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9  text-teal-600 font-[700] text-center">
                  Find a Location
                </h2>
                <p className="text-[16px] leading-7  dark:text-white text-textColor font-[400] mt-4 text-center">
                  Locate top-tier medical facilities near you. Our state-of-the-art clinics and hospitals are conveniently
                  situated to ensure you receive the best care, wherever you are.
                </p>

                <Link
                  to='/doctors' className="w-[44px] h-[44px] rounded-full border border-solid border-teal-600  mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className="group-hover:text-white w-6 h-5 text-teal-400" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9  text-teal-600  font-[700] text-center">
                  Book an Appointment
                </h2>
                <p className="text-[16px] leading-7  dark:text-white text-textColor font-[400] mt-4 text-center">
                  Schedule your appointments with ease. Our intuitive system allows you to book consultations
                  quickly, ensuring timely access to the care you need without the hassle.
                </p>

                <Link to='/doctors' className="w-[44px] h-[44px] rounded-full border border-solid border-teal-600 mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className="group-hover:text-white w-6 h-5 text-teal-400" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ====== Qualities end ========== */}

      {/* ========= */}
      <About />

      {/* ===== services section ====== */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center dark:text-primaryColor">Our medical services</h2>
            <p className="text_para text-center dark:text-[#fde3e3]">
              World-class care for everyone. Our health services offers unmatched
              expert health care.
            </p>
          </div>

          <ServiceList />
        </div>
      </section>
      {/* ====== services section end ========= */}

      {/* =========== feature section ==========*/}
      <section>
        <div className="container">
          <div className="flex item justify-between flex-col lg:flex-row">
            {/* ====== feature content ======= */}
            <div className="xl:w-[670px]">
              <h2 className="heading">
                Get virtual treatment <br /> anytime.
              </h2>
              <ul className="pl-4">
                <li className="text_para">
                  1. Schedule for your appointment directly.
                </li>
                <li className="text_para">
                  2. Search for your physician here, and contact their office.
                </li>
                <li className="text_para">
                  3. View our physicians who are accepting new patients, use the online scheduling tool to select and appointment time.
                </li>
              </ul>
              <Link to='/'>
                <button className="btn">Learn More </button>
              </Link>
            </div>

            {/* ========= feature img ======== */}
            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureImg} className="w-3/4" alt="" />

              <div className="w-[150px]  lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]">

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">
                      Tue, 24
                    </p>
                    <p className=" text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">
                      10:00AM
                    </p>
                  </div>
                  <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                    <img src={videoIcon} alt="" />
                  </span>
                </div>

                <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                  Consultation
                </div>

                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} alt="" />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                    Wayne Collins
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========= feature section end ========== */}
      {/* ======== our great doctors =========== */}
      <section>
        <div className="container">
          <div className="xl: w-[470] mx-auto">
            <h2 className="heading text-center">Our Great Doctors</h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health services offers unmatched expert health care.
            </p>
          </div>
          <DoctorList />
        </div>
      </section>

      {/* ======== our great doctors =========== */}

      {/* ========== faq section ========== */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="" />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="heading">
                Most questions by our beloved patients
              </h2>

              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* ========== faq section ========== */}

      {/* ========= testimonial ========= */}

      <section>
        <div className="container">
          <div className="xl: w-[470] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health services offers unmatched expert health care.
            </p>
          </div>

          <Testimonial />
        </div>
      </section>
      {/* ========= testimonial end ========= */}

    </>
  );
};

export default Home;