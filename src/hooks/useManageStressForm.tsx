import create from "zustand"

export interface StressFormType {
    id?: string;
    created_at?: string;
    user_id: string | undefined;
    cause: string;
    source: string;
    stressInfo: string;
    isWithinControl?: string;
    isOutOfControl?: string;
    canDoToReduce:string;
}

interface StressStoreType {
    stressForm: StressFormType;
    setStressForm: < k extends keyof StressFormType > (field: k, formData: StressFormType[k]) => void;
    resetStressForm: () => void

}

let initialState = {
    cause: "",
    source: "",
    stressInfo: "",
    isWithinControl: "",
    isOutOfControl: "",
    canDoToReduce:"",
    user_id:""
}

const useManageStressForm = create<StressStoreType>((set) => ({
    stressForm: { ...initialState },
    setStressForm: (field, formData) => set((state) => ({ stressForm: { ...state.stressForm, [field]: formData } })),
    resetStressForm: () => set(() => ({ stressForm: { ...initialState } }))

}))
export default useManageStressForm