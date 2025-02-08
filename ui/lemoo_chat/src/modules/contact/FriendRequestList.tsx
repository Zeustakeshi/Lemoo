import FriendRequestCard from "./FriendRequestCard";

type Props = {};

const FriendRequestList = (props: Props) => {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3 p-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <FriendRequestCard key={index}></FriendRequestCard>
            ))}
        </div>
    );
};

export default FriendRequestList;
