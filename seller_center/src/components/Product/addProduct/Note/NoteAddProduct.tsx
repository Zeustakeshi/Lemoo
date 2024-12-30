import { ErrorOutlineOutlined } from "@mui/icons-material";

type PropItem = {
  content: string;
};

const NoteAddProduct: React.FC<PropItem> = (PropItem: PropItem) => {
  const { content } = PropItem;
  return (
    <div>
      <div className="relative group">
        <ErrorOutlineOutlined sx={{ color: "gray", fontSize: "20px" }} />
        <div className="absolute left-0 bottom-full mt-2 w-64 p-4 bg-gray-100 text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <p className="text-sm text-gray-500 font-normal leading-relaxed text-justify max-w-lg:">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteAddProduct;
