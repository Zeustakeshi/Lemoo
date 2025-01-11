import Button from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

type Props = {};

const Notification = (props: Props) => {
    return (
        <Button variant="ghost" size="icon">
            <Ionicons name="notifications-outline" size={24} color="black" />
        </Button>
    );
};

export default Notification;
