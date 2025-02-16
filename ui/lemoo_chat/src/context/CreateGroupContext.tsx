import { createContext, useContext } from "react";

export interface CreateGroupContext {}

const CreateGroupContext = createContext<CreateGroupContext | null>(null);

export function CreateGroupProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CreateGroupContext.Provider value={{}}>
            {children}
        </CreateGroupContext.Provider>
    );
}

export function useCreateGroup() {
    const context = useContext(CreateGroupContext);
    if (!context) {
        throw new Error(
            "useCreateGroup must be used within a CreateGroupProvider"
        );
    }
    return context;
}
