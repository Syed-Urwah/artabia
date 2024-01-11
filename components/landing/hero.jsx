"use client";

const Hero = () => {
  return (
    <>
      <div className="color_home mt-0.5">
        <div className="grid grid-cols-12 ">
          <div className=" box col-span-12 ml-5 mt-10 flex flex-col justify-center items-start lg:col-span-6  lg:ml-32 lg:-mt-6 md:col-span-6 ">
            <h2 className=" text-3xl lg:w-[590px]">
              CONTEMPORARY ART FROM EASTERN EUROPE
            </h2>
            <p className="font-bold mt-8 ">EXPLORE VICTORY ART</p>

            <a href="#exploreSection"
              style={{ background: "#C38EBF", color: "black" }}
              className="px-4 py-1 mt-8 rounded-full "
            >
              Explore Collections
            </a>
          </div>
          <div className="box col-span-12 lg:col-span-6 md:col-span-6 mt-12 flex flex-col items-center  mb-14">
            <img
              src="/img/first.png"
              className="mr-2 h-[333px] w-[332px]"
              alt="Search"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
