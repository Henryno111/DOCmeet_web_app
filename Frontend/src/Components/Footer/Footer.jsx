import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logos/Color logo - no background.svg";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from "react-icons/ai";

const socialLinks = [
  {
    path: "https://www.youtube.com/c/codingWithMuhib",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />
  },
  {
    path: "https://github.com/codingWithMuhib",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />
  },
  {
    path: "https://www.instagram.com/muhib160.official/",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />
  },
  {
    path: "https://www.linkedin.com/in/codingWithhuhib",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />
  },
];

const quickLinks01 = [
  {
    path: "/home",
    display: "Home"
  },
  {
    path: "/",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services"
  },
  {
    path: "/",
    display: "Blog",
  },
];

const quickLinks02 = [
  {
    path: "/find-a-doctor",
    display: "Find a Doctor",
  },
  {
    path: "/",
    display: "Request an Appointment",
  },
  {
    path: "/",
    display: "Find a Location",
  },
  {
    path: "/",
    display: "Get an Opinion",
  },
];

const quickLinks03 = [
  {
    path: "/",
    display: "Donate",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];

const Footer = () =>
{

  const year = new Date().getFullYear();

  return (
    <footer className="pb-16 px-8 pt-10">
      <div className="container border-2">

        <div className="flex lg:justify-between justify-center  px-4 mb-6  flex-wrap">
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] text-teal-700 mb-6">
              Quick Links
            </h2>

            <ul>
              {quickLinks01.map((item, index) => (

                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] hover:text-teal-700 dark:hover:text-teal-700 dark:text-[#fde3e3] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px]   text-teal-700 font-[700] mb-6 ">
              I want to:
            </h2>

            <ul>
              {quickLinks02.map((item, index) => (

                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 dark:text-[#fde3e3] dark:hover:text-teal-700 hover:text-teal-700  font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-teal-700">
              Support
            </h2>

            <ul>
              {quickLinks03.map((item, index) => (

                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 hover:text-teal-700 dark:hover:text-teal-700 font-[400] dark:text-[#fde3e3] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap  md:justify-between justify-center items-center gap-x-[70px]">
          <img src={logo} alt="" className="w-[50%] sm:w-[200px] text-green" />

          <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
            Copyright {year} developed by henry and Theophilus all right reserved.
          </p>

          <div className="flex items-center gap-3 mt-4">
            {socialLinks.map((link, index) => (
              <Link
                to={Link.path}
                key={index}
                className="w-9 h-9 border-solid border-[#181A1E]  rounded-full flex items-center justify-center group dark:hover:bg-teal-700 hover:bg-primaryColor hover:border-none"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
};

export default Footer 