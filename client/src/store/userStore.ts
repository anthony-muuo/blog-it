import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  isDeleted: boolean;
  id: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  logOut: () => void;
};

const userStore: StateCreator<UserStore> = (set) => {
  return {
    user: null,
    setUser: (user: User) => {
      set(function () {
        return { user };
      });
    },
    logOut: () => {
      set(function () {
        return { user: null };
      });
    },
  };
};

const userUser = create(persist(userStore, { name: "blogit-user" }));

export default userUser;
