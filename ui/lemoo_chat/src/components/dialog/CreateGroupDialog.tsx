import { UserContact } from "@/common/type/contact.type";
import { UserRoundPlus } from "lucide-react";
import ContactList from "../contact/ContactList";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

type Props = {};

const CreateGroupDialog = (props: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="size-[40px]">
                    <UserRoundPlus />
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[500px] w-min max-w-[60svw]">
                <ContactList>
                    {({ data, hasNextPage }) => (
                        <div className="h-min bg-white p-4 rounded-xl space-y-2">
                            {data &&
                                data?.pages
                                    .flatMap(({ content }) => content ?? [])
                                    .map(
                                        (
                                            contact: UserContact,
                                            index,
                                            content
                                        ) => {
                                            const lastIndex =
                                                content.length - 1;
                                            if (
                                                index ===
                                                Math.ceil(lastIndex * 0.8)
                                            )
                                                return (
                                                    <ContactItem
                                                        key={index}
                                                        contact={contact}
                                                    ></ContactItem>
                                                );
                                            return (
                                                <ContactItem
                                                    key={index}
                                                    contact={contact}
                                                ></ContactItem>
                                            );
                                        }
                                    )}

                            {!hasNextPage && status !== "pending" && (
                                <p>Hết rồi</p>
                            )}
                        </div>
                    )}
                </ContactList>
            </DialogContent>
        </Dialog>
    );
};

type ContactItemProps = {
    contact: UserContact;
};

const ContactItem = ({ contact }: ContactItemProps) => {
    return (
        <div className="rounded-md cursor-pointer  w-full px-5 py-4 hover:bg-stone-100 transition-all flex justify-between items-center">
            <div className="flex justify-start items-center gap-3">
                <Avatar>
                    <AvatarImage src={contact.avatar}></AvatarImage>
                </Avatar>
                <p>{contact.displayName}</p>
            </div>
            <Button>Thêm</Button>
        </div>
    );
};

export default CreateGroupDialog;
