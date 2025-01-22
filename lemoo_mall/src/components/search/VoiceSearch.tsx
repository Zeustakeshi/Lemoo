import { Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

type Props = {
    handleSearch?: (value: string) => void;
};

const VoiceSearch = ({ handleSearch }: Props) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [isListening, setIsListening] = useState<boolean>(false);
    const [recognition, setRecognition] = useState<any>(null);
    const [openModel, setOpenModel] = useState<boolean>(false);

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = false;
            recognitionInstance.lang = "vi-VN";
            recognitionInstance.interimResults = false;
            recognitionInstance.maxAlternatives = 1;

            recognitionInstance.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;

                setSearchValue(transcript);

                handleSearch?.(transcript);

                setOpenModel(false);

                setIsListening(false);
            };

            recognitionInstance.onerror = (event: any) => {
                console.error("Error with SpeechRecognition:", event.error);
                setIsListening(false);
            };

            setRecognition(recognitionInstance);
        } else {
            console.warn("Trình duyệt không hỗ trợ SpeechRecognition.");
        }
    }, []);

    const requestMicrophonePermission = async () => {
        try {
            const permission = await navigator.permissions.query({
                name: "microphone" as PermissionName,
            });
            if (permission.state === "granted") {
                return true;
            } else if (permission.state === "prompt") {
                return true;
            } else {
                alert(
                    "Microphone access is denied. Please enable it in your browser settings."
                );
                return false;
            }
        } catch (error) {
            console.error("Permission API not supported:", error);
            return false;
        }
    };

    const handleVoiceSearch = async () => {
        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) return;
        if (recognition) {
            if (isListening) {
                recognition.stop();
                setIsListening(false);
            } else {
                recognition.start();
                setIsListening(true);
            }
        }
    };

    return (
        <Dialog
            onOpenChange={(open) => {
                recognition.stop();
                setSearchValue("");
                setOpenModel(open);
            }}
            open={openModel}
        >
            <DialogTrigger asChild>
                <Button variant="secondary" className="" size="icon">
                    <Mic size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent className="min-h-[400px] flex flex-col justify-center items-center">
                <div
                    onClick={handleVoiceSearch}
                    className="relative flex justify-center items-center rounded-full flex-1"
                >
                    {isListening && (
                        <div className=" bg-primary/20 animate-ping  w-[120px] h-[120px]  rounded-full duration-1000"></div>
                    )}
                    <div className="abs-center bg-primary p-5 rounded-full text-white">
                        <Mic size={60} />
                    </div>
                </div>

                <p className="text-lg text-muted-foreground mb-5 text-center line-clamp-4">
                    {isListening ? "Đang nghe....." : searchValue}
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default VoiceSearch;
