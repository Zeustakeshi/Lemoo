import NotificationButton from "../notification/NotificationButton";

type Props = {};

const SidebarRight = (props: Props) => {
    return (
        <div className="px-3 py-2 bg-white shadow-md flex flex-col h-[100svh] sticky top-0">
            <NotificationButton></NotificationButton>
        </div>
    );
};

export default SidebarRight;
