"use client";

import IUser from "@/types/User";
import { createContext, useContext, useState } from "react";

const DefaultUser: IUser = { email: "", name: "", id: "" };
const UserContext = createContext({
  user: DefaultUser,
  updateUser: (user) => {},
});

export const UserProvider = ({
  children,
  _user,
}: Readonly<{
  children: React.ReactNode;
  _user: IUser;
}>) => {
  const [user, setUser] = useState<IUser>(_user);

  const updateUser = (user: IUser) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
