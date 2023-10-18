import create from "zustand"
export interface SmartGoalFormType {
    id?: string;
    created_at?: string;
    user_id: string | undefined;
    goal: string;
    measure: string;
    specifics: string;
    archivable?: string;
    timebound?: string;

}

interface SmartStoreType {
    smartForm: SmartGoalFormType;
    setSmartForm: < k extends keyof SmartGoalFormType > (field: k, formData: SmartGoalFormType[k]) => void;
    resetSmartForm: () => void

}

let initialState = {
    goal: "",
    specifics: "",
    measure: "",
    archivable: "",
    timebound: "", user_id: ""
}

const useSMARTForm = create<SmartStoreType>((set) => ({
    smartForm: { ...initialState },
    setSmartForm: (field, formData) => set((state) => ({ smartForm: { ...state.smartForm, [field]: formData } })),
    resetSmartForm: () => set(() => ({ smartForm: { ...initialState } }))

}))
export default useSMARTForm