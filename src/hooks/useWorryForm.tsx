import create from "zustand"

let initialState={
  user_id: "",
  currentWorry:"",
  historical: "",
  ifNotTrueThen:"",
  ifTrueThen:"",
  future:""
}

export interface WorryFormType {
    id?: string;
    created_at?: string;
    user_id: string | undefined;
    currentWorry: string;
    historical: string;
    ifNotTrueThen: string;
    ifTrueThen?: string;
    future?: string;
}
interface WorryStoreType {
    worryForm: WorryFormType;
    setWorryForm: < k extends keyof WorryFormType > (field: k, formData: WorryFormType[k]) => void;
    resetWorryForm: () => void

}


const useWorryForm = create<WorryStoreType>((set) => ({
  worryForm: { ...initialState },
  setWorryForm: (field, formData) => set((state) => ({ worryForm: { ...state.worryForm, [field]: formData } })),
  resetWorryForm: () => set(() => ({ worryForm: { ...initialState } }))

}))

export default useWorryForm