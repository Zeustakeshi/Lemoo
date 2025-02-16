import { UserRoundPlus } from "lucide-react";
import { Button } from "../ui/button";

type Props = {};

const AddGroupButton = (props: Props) => {
    return (
        <Button variant="ghost" className="size-[40px]">
            <UserRoundPlus />
        </Button>
    );
};

export default AddGroupButton;
