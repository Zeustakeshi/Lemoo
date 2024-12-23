import AppWrapper from "@/components/wrapper/AppWrapper";
import { Slot } from "expo-router";
import React from "react";

type Props = {};

const _layout = (props: Props) => {
    return (
        <AppWrapper>
            <Slot></Slot>
        </AppWrapper>
    );
};

export default _layout;
