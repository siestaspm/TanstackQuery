import { create } from "zustand";

export const useMemberStore = create((set) => ({
  memberData: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJuYmYiOjE3NjQzMTk5MDksImV4cCI6MTc2NjkxMTkwOSwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.zSqZ5gIsy6Yy9dmU-6GmshUNKGrXQHeqIDKw-QqcLzI',
  setMemberData: (data) => set({ memberData: data }),
}));
