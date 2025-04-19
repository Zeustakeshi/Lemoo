import useClickOutSide from "@/hooks/useClickOutSide";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import ChatContainer from "./ChatContainer";

type Props = {};

const AIChatButton = (props: Props) => {
    const [openChat, setOpenChat] = useState<boolean>(false);
    const { nodeRef } = useClickOutSide(() => setOpenChat(false));
    return (
        <div ref={nodeRef} className="fixed bottom-2 right-10  ">
            <div>
                <DotLottieReact
                    onClick={() => setOpenChat(true)}
                    src="/ai-search.lottie"
                    loop
                    autoplay
                    className="cursor-pointer size-[150px]"
                />
            </div>
            {openChat && (
                <ChatContainer
                    open={openChat}
                    setOpen={(open) => setOpenChat(open)}
                ></ChatContainer>
            )}
        </div>
    );
};

export default AIChatButton;
