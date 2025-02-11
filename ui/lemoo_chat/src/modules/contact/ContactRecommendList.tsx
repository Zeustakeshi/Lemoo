import { getContactSuggestions } from "@/api/friend.api";
import { UserContact } from "@/common/type/contact.type";
import ContactRecommendCard from "@/modules/contact/ContactRecommendCard";
import { useInfiniteQuery } from "@tanstack/react-query";

type Props = {};

const ContactRecommendList = (props: Props) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ["contact-recommend"],
            queryFn: async ({ pageParam }) =>
                await getContactSuggestions(pageParam),
            getNextPageParam: (lastPage: any) => {
                if (lastPage.last) return undefined;
                return lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
        });

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3 p-4">
            {data &&
                data?.pages
                    .flatMap(({ content }: any) => content ?? [])
                    .map((contact: UserContact, index, content) => {
                        const lastIndex = content.length - 1;
                        if (index === Math.ceil(lastIndex * 0.8))
                            return (
                                <ContactRecommendCard
                                    contact={contact}
                                    key={index}
                                />
                            );
                        return (
                            <ContactRecommendCard
                                contact={contact}
                                key={index}
                            />
                        );
                    })}

            {!hasNextPage && status !== "pending" && <p>Hết rồi</p>}
        </div>
    );
};

export default ContactRecommendList;
