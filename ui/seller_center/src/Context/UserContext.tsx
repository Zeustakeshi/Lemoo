import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserInfo {
  id: string;
  shortCode: string;
  name: string;
  companyName: string;
  verified: boolean;
  logo: string;
  email: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
}

interface UserContextProps {
  user: UserInfo | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
