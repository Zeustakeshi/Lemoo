import SceenHeaderBack from "@/components/ui/SceenHeaderBack";
import AppWrapper from "@/components/wrapper/AppWrapper";
import React from "react";

type Props = {};

const CategoryLayout = (props: Props) => {
    return (
        <AppWrapper>
            <SceenHeaderBack>Danh mục sản phẩm</SceenHeaderBack>
        </AppWrapper>
    );
};

export default CategoryLayout;
