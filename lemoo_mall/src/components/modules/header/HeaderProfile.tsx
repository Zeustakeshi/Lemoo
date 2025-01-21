import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = {};

const HeaderProfile = ({}: Props) => {
    return (
        <div className="flex justify-end items-center gap-2">
            <Avatar>
                <AvatarImage src="https://i.pravatar.cc/300"></AvatarImage>
            </Avatar>
        </div>
    );
};

export default HeaderProfile;
