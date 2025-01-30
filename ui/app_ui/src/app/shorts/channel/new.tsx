import CreateChannelForm from "@/components/form/CreateChannelForm";
import SceenHeaderBack from "@/components/ui/SceenHeaderBack";
import AppWrapper from "@/components/wrapper/AppWrapper";
import React from "react";
import { Text } from "react-native";

type Props = {};

const CreateChannel = (props: Props) => {
    return (
        <AppWrapper>
            <SceenHeaderBack>
                <Text className="text-xl font-semibold">Tạo mới kênh</Text>
            </SceenHeaderBack>
            <CreateChannelForm></CreateChannelForm>
        </AppWrapper>
    );
};

export default CreateChannel;
