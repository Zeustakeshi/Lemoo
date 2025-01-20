import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import VoiceSearch from "./VoiceSearch";

type Props = {
    className?: string;
};

const GlobalSearch = ({ className }: Props) => {
    return (
        <div
            className={cn("flex items-center justify-center gap-2", className)}
        >
            <div
                className={cn(
                    "flex-1 bg-color-1 flex justify-between items-center pr-2 rounded-md overflow-hidden"
                )}
            >
                <input
                    className="bg-transparent border-none outline-none flex-1 p-4 py-3"
                    placeholder="Bạn muốn tìm gì?"
                ></input>
                <Button className="" size="icon">
                    <Search />
                </Button>
            </div>
            <VoiceSearch></VoiceSearch>
        </div>
    );
};

export default GlobalSearch;
