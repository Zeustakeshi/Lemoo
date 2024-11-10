import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import Button from "../ui/Button";

type Props = {};

const LineScan = (props: Props) => {
    return (
        <Button variant="ghost" size="icon">
            <MaterialCommunityIcons name="line-scan" size={24} color="black" />
        </Button>
    );
};

export default LineScan;
