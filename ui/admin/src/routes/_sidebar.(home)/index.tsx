import { createFileRoute } from "@tanstack/react-router";
import { useDispatch } from "react-redux";

export const Route = createFileRoute("/_sidebar/(home)/")({
    component: RouteComponent,
});

function RouteComponent() {
    const dispatch = useDispatch();
    return <div></div>;
}
