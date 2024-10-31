import { Ionicons } from "@expo/vector-icons";
import React from "react";
import Button from "../ui/Button";

type Props = {};

const Notification = (props: Props) => {
    return (
        <Button variant="ghost" size="icon">
            <Ionicons name="notifications-outline" size={24} color="black" />
        </Button>
    );
};

export default Notification;
