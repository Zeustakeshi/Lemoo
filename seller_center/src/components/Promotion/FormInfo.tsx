
interface InfoItem {
    name: string;
    subname1: string;
    subname2: string;
    color: string;
  }
  
  interface FormInfoProps {
    item: InfoItem;
  }
  

  const FormInfo: React.FC<FormInfoProps> = ({ item }) => {
    return (
      <div className='bg-white w-[29%] h-[120px] flex p-4 items-center justify-between gap-3 rounded-2xl border-2 border-gray-300'>
         <div className="w-10 h-10 ">
            <div className="w-10 h-10 rounded-full bg-blue-500"></div>
         </div>
         <div className="flex flex-col gap-1 w-full h-full justify-center ">
            <p className="font-bold text-[16px]">{item.name}</p>
            <p className="text-[12px]">{item.subname1}</p>
            <p className={`bg-[${item.color}] rounded-md p-1 text-[12px] w-max`}>{item.subname2}</p>
         </div>
      </div>
    );
  };
  export default FormInfo;
