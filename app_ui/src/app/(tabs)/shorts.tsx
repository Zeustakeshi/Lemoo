import { Redirect } from "expo-router";
import React from "react";

type Props = {};

const shorts = (props: Props) => {
    return <Redirect href="/home" />;
};

export default shorts;
