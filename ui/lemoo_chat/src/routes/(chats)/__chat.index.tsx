import { randomIllustration } from "@/lib/randomIllustration";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(chats)/__chat/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="w-full h-full flex justify-center items-center flex-col">
            <h1 className="text-xl">
                Chào mừng đến với
                <span className="font-semibold text-2xl text-primary mx-3">
                    Lemoo chat
                </span>
            </h1>
            <img
                className="size-[50%] aspect-square"
                src={randomIllustration()}
                alt=""
            />
            <p className="max-w-[60%] text-sm text-muted-foreground text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                molestiae est molestias illum! Quidem asperiores praesentium
                doloribus eaque quas voluptate maiores nemo autem libero tempora
                quibusdam, iste fugit tempore? Perspiciatis.
            </p>
        </div>
    );
}
