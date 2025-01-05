import Button from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

type Props = {};

const Setting = (props: Props) => {
    return (
        <Button variant="ghost" size="icon">
            <Ionicons name="settings-outline" size={24} color="black" />
        </Button>
    );
};

export default Setting;
