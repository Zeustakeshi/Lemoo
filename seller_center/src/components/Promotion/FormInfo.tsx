import { Link } from "@tanstack/react-router";


interface InfoItem {
    name: string;
    subname1: string;
    subname2: string;
    color: string;
    link: string;
    img: string
  }
  
  interface FormInfoProps {
    item: InfoItem;
  }
  

  const FormInfo: React.FC<FormInfoProps> = ({ item }) => {

  return (
    <div
         className="bg-white w-[29%] h-[150px] flex p-4 items-center justify-between gap-3 rounded-2xl border-2 border-gray-300 cursor-pointer"
      >
       <div className="w-16 h-16">
          <div className="w-15 h-15 rounded-full ">
               <img src={item.img} alt="" className="w-full h-full" />
          </div>
       </div>
       <div className="flex flex-col gap-1 w-full h-full justify-center">
          {/* <p className="font-bold text-[16px]">{item.name}</p> */}
          <Link className="font-bold text-[16px]" to={item.link}>
         {item.name}
      </Link>
          <p className="text-[12px]">{item.subname1}</p>
          <p className={`rounded-md p-1 text-[12px] w-max`} style={{ backgroundColor: item.color }}>
             {item.subname2}
          </p>
       </div>
    </div>
 );
  };
  export default FormInfo;
