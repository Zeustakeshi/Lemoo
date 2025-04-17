import { ChevronRight } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Category } from "../../../common/type/category/category.type";
import { api } from "../../../lib/api";

type CategoryMenuProps = {
    onSelectCategory: (selectedCategories: Category) => void;
};

const GetCategory = async () => {
    const response: any = await api.get("/categories?limit=100");
    const categories = response?.content || [];
    console.log("Danh mục từ API:", categories);
    return categories;
};
// Hàm gọi API lấy danh mục con
const GetChildCategories = async (categoryId: string) => {
    const response: any = await api.get(
        `/categories?parent=${categoryId}&limit=100`
    );
    const categoriesChil = response?.content || [];
    return categoriesChil;
};

const CategoryMenu: React.FC<CategoryMenuProps> = ({ onSelectCategory }) => {
    const [activeCategories, setActiveCategories] = useState<Category[]>([]); // Lưu các danh mục đang hoạt động
    const [categories, setCategories] = useState<Category[]>([]); // Lưu danh mục cha

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await GetCategory();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    // Khi click vào một danh mục, cập nhật danh sách danh mục đang hoạt động
    const handleCategoryClick = async (category: Category, level: number) => {
        const newActiveCategories = [...activeCategories];
        newActiveCategories[level] = category; // Cập nhật danh mục tại cấp độ hiện tại
        newActiveCategories.splice(level + 1); // Xóa các danh mục cấp sâu hơn (nếu có)
        if (!category.isLeaf) {
            const children = await GetChildCategories(category.id);
            category.children = children;
            newActiveCategories[level] = { ...category };
        } else {
            onSelectCategory(category);
        }

        setActiveCategories(newActiveCategories);
    };

    // Render danh mục tại một cấp độ cụ thể
    const renderCategoriesAtLevel = (categories: Category[], level: number) => (
        <div className="min-w-[200px] h-[270px] overflow-y-auto border-r border-gray-300 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <ul className="list-none p-0">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        onClick={() => handleCategoryClick(category, level)}
                        className={`p-2 cursor-pointer hover:bg-gray-200 ${
                            activeCategories[level]?.id === category.id
                                ? "bg-gray-200"
                                : ""
                        }`}
                    >
                        <button className="flex items-center space-x-2">
                            <span>{category.name}</span>
                            {category.isLeaf === false && (
                                <ChevronRight fontSize="small" />
                            )}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div>
            <div className="flex">
                {/* Sử dụng Đệ Quy */}
                {/* Hiển thị danh mục cha */}
                {renderCategoriesAtLevel(categories, 0)}

                {/* Hiển thị danh mục con dựa vào activeCategories */}
                {activeCategories.map(
                    (category, level) =>
                        category.children &&
                        renderCategoriesAtLevel(category.children, level + 1)
                )}
            </div>
            <div className="m-10 flex items-center space-x-5">
                <span className="font-semibold text-xl">Đã chọn: </span>
                {activeCategories.map((element, index) => (
                    <span key={index}>
                        {element.name}{" "}
                        {index < activeCategories.length - 1 && (
                            <span> → </span>
                        )}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default CategoryMenu;
