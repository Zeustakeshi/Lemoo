import { getCategories } from "@/api/category.api";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/category";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const HomeCategoryList = (props: Props) => {
    const { data } = useQuery({
        queryKey: ["get-all-category"],
        queryFn: async () => await getCategories({ page: 0, limit: 16 }),
    });

    return (
        <div>
            <div className="w-full flex justify-between items-center mb-3">
                <h4 className="text-xl font-semibold ">Danh mục ngành hàng</h4>
                <Button variant="link">Xem tất cả</Button>
            </div>
            <div className="grid grid-cols-8 w-full">
                {data?.content &&
                    categories.map((category) => (
                        <div className="p-3" key={category.id}>
                            <div className="min-size-[120px] size-[120px] border rounded-md overflow-hidden">
                                <img
                                    loading="lazy"
                                    className="size-full object-cover"
                                    src={category.image}
                                    alt=""
                                />
                            </div>
                            <p className="text-center font-semibold text-sm mt-2">
                                {category.name}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default HomeCategoryList;
