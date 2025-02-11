import { getAllContact } from "@/api/friend.api";
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
                    .flatMap(({ content }: any) => content ?? [])
                    .map((contact: any, index, content) => {
                        const lastIndex = content.length - 1;
                        if (index === Math.ceil(lastIndex * 0.8))
                            return <ContactItem key={index} />;
                        return <ContactItem key={index} />;
                    })}

            {!hasNextPage && status !== "pending" && <p>Hết rồi</p>}
        </div>
    );
};

export default ContactList;
