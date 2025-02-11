import { getAllContact } from "@/api/friend.api";

import { UserContact } from "@/common/type/contact.type";

import { useInfiniteQuery } from "@tanstack/react-query";
import ContactItem from "./ContactItem";

type Props = {};

const ContactList = (props: Props) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ["contact-list"],
            queryFn: async ({ pageParam }) => await getAllContact(pageParam),
            getNextPageParam: (lastPage: any) => {
                if (lastPage.last) return undefined;
                return lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
        });

    console.log({ data });

    return (
        <div className="h-min bg-white p-4 rounded-xl space-y-2">
            {data &&
                data?.pages
                    .flatMap(({ content }) => content ?? [])
                    .map((contact: UserContact, index, content) => {
                        const lastIndex = content.length - 1;
                        if (index === Math.ceil(lastIndex * 0.8))
                            return (
                                <ContactItem contact={contact} key={index} />
                            );
                        return <ContactItem contact={contact} key={index} />;

                    })}

            {!hasNextPage && status !== "pending" && <p>Hết rồi</p>}
        </div>
    );
};

export default ContactList;
