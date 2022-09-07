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
type UserType = {
    id?: string;
    user_metadata?: {
        name?: string
    }
}
export type AddUserType = (userData: UserType) => void
export type RemoveUserType=()=>void

interface UserInstanceType{
    user: UserType
    addUser:AddUserType;
    removeUser:RemoveUserType
}

const useUser =  create<UserInstanceType>((set) => ({


    user: { id: undefined, user_metadata: undefined },
    addUser: (userData) => set(() => ({ user: userData })),
    removeUser: () => set({ user: { id: undefined, user_metadata: undefined } }),
  }))

export default useUser