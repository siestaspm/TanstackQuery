import { create } from "zustand";

export const useMemberStore = create((set) => ({
  memberData: null,
  setMemberData: (data) => set({ memberData: data }),
}));
