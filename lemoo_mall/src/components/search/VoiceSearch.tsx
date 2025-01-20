import { Mic } from "lucide-react";
import { Button } from "../ui/button";

type Props = {};

const VoiceSearch = (props: Props) => {
    return (
        <div>
            <Button
                variant="secondary"
                className="rounded-full h-full !aspect-square"
            >
                <Mic />
            </Button>
        </div>
    );
};

export default VoiceSearch;
