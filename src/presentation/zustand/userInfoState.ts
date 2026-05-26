import { create } from "zustand";
import { EDocumentUser } from "../toolbox/enum/user";
import type { IUser } from "../toolbox/interface/User";
import type { IPlan } from "../toolbox/interface/Plan";

interface IUserInfoState {
  user: IUser;
  setUser: (newUser: IUser) => void;
  plan?: IPlan;
  setPlan: (newPlan: IPlan) => void;
}

const INITIAL_USER: IUser = {
  birthDay: "",
  info: { type: EDocumentUser.DNI, value: "", phone: 0 },
  name: "",
  lastName: "",
};

export const useUserInfoState = create<IUserInfoState>((set) => ({
  user: INITIAL_USER,
  setUser: (newUser) => set(() => ({ user: newUser })),
  setPlan: (newPlan) => set(() => ({ plan: newPlan })),
}));
