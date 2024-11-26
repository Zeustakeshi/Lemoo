import ShortVideoHeader from "@/components/shorts/ShortVideoHeader";
import AppWrapper from "@/components/wrapper/AppWrapper";
import { Slot } from "expo-router";
import React from "react";

type Props = {};

const _layout = (props: Props) => {
    return (
        <AppWrapper className="!p-0">
            <ShortVideoHeader></ShortVideoHeader>
            <Slot></Slot>
        </AppWrapper>
    );
};

export default _layout;
