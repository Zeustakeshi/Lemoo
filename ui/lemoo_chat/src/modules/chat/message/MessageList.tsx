import Message from "./Message";

type Props = {};

const MessageList = (props: Props) => {
    return (
        <div className=" w-full h-full overflow-y-auto custom-scroll px-5 py-2">
            {Array.from({ length: 50 }).map((_, index) => (
                <Message
                    key={index}
                    isSelf={Math.floor(Math.random() * 2) === 1}
                ></Message>
            ))}
        </div>
    );
};

export default MessageList;
