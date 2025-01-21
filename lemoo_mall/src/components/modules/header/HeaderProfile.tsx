import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

type Props = {};

const HeaderProfile = ({}: Props) => {
    const navigation = useNavigate();

    return (
        <div className="flex justify-end items-center gap-2">
            {/* <Avatar>
                <AvatarImage src="https://i.pravatar.cc/300"></AvatarImage>
            </Avatar> */}
            <Button
                onClick={() =>
                    navigation({
                        to: "/auth/login",
                    })
                }
            >
                Đăng nhập
            </Button>
        </div>
    );
};

export default HeaderProfile;
