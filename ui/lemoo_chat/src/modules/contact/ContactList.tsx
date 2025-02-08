import ContactItem from "./ContactItem";

type Props = {};

const ContactList = (props: Props) => {
    return (
        <div className="h-min bg-white p-4 rounded-xl space-y-2">
            {Array.from({ length: 40 }).map((_, index) => (
                <ContactItem key={index}></ContactItem>
            ))}
        </div>
    );
};

export default ContactList;
