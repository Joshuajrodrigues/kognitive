import create from "zustand"

export interface ArgumentFormType {
    id?: string;
    created_at?: string;
    user_id: string | undefined;
    whatSaid: string;
    whatYouSaid: string;
    didYouAck: string;
    howDidOtherFeel?: string;
    howCanRevise?: string;
}
interface ArgumentStoreType {
    argumentForm: ArgumentFormType;
    setArgumentForm: < k extends keyof ArgumentFormType > (field: k, formData: ArgumentFormType[k]) => void;
    resetArgumentForm: () => void

}

let initialState ={
    whatSaid:"",
    whatYouSaid:"",
    didYouAck:"",
    howDidOtherFeel:"",
    howCanRevise:"",
    user_id:""
}

const useArgumentForm = create<ArgumentStoreType>((set)=>({
    argumentForm:{...initialState},
    setArgumentForm: (field, formData) => set((state) => ({ argumentForm: { ...state.argumentForm, [field]: formData } })),
    resetArgumentForm: () => set(() => ({ argumentForm: { ...initialState } }))
}))

export default useArgumentForm