import Logo from "../../assets/LeMooEco.svg";
const Header = () => {
  return (
    <div className=" m-3 pr-6 w-[290px] h-[56px] flex items-center justify-start">
      <div className="w-[100px] h-auto object-cover">
        <img src={Logo} alt="Logo" />
      </div>
      <div className=" w-[120px]">
        <h1 className="w-[120px] text-[#000000a6] text-2xl font-semibold">
          Lemoo
        </h1>
        <h1 className=" w-[190px] text-blue-600 font-semibold text-3xl">
          Seller Center
        </h1>
      </div>
    </div>
  );
};

export default Header;
