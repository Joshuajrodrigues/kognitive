import create from 'zustand'
import * as Yup from "yup";
import { Session, User } from '@supabase/supabase-js';


export type UserDataType = {
    user: User | null;
    session: Session | null;
} | {
    user: null;
    session: null;
};
export type AddUserType=(userData:UserDataType)=>void
export type RemoveUserType=()=>void

interface UserInstanceType{
    user:UserDataType
    addUser:AddUserType;
    removeUser:RemoveUserType
}

const useUser =  create<UserInstanceType>((set) => ({


    user:{user:null,session:null},
    addUser: (userData) => set(() => ({ user: userData })),
    removeUser: () => set({ user: {user:null,session:null} }),
  }))

export default useUser