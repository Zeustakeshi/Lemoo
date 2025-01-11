import Button from "@/components/ui/Button";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";

type Props = {
    title?: string;
    data: string[];
    headerComponent?: ReactNode;
};

const SearchSuggestion = ({ data, title, headerComponent }: Props) => {
    return (
        <View>
            {headerComponent}
            {title && (
                <Text className="mb-4 mt-2 text-xl font-semibold">{title}</Text>
            )}
            <View className="flex-row flex-wrap gap-2">
                {data.map((text, index) => (
                    <SearchSuggestionTag text={text} key={index} />
                ))}
            </View>
        </View>
    );
};

type SearchSuggestionTagProps = {
    text: string;
};

const SearchSuggestionTag = ({ text }: SearchSuggestionTagProps) => {
    return (
        <Button
            variant="secondary"
            size="icon"
            className="px-4 py-2 rounded-lg"
        >
            <Text className="text-black">{text}</Text>
        </Button>
    );
};
export default SearchSuggestion;
