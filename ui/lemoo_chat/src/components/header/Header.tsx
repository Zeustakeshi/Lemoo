import AddGroupButton from "./AddGroupButton";
import UserSearch from "./userSearch";

type Props = {};

const Header = (props: Props) => {
    return (
        <div className="px-3 py-4 flex w-full justify-between items-center gap-2 border-b">
            <UserSearch></UserSearch>
            <AddGroupButton></AddGroupButton>
        </div>
    );
};

export default Header;
