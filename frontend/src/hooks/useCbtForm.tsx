import create from "zustand"


export interface CbtFormType {
  id?:string;
  created_at?: string;
  user_id: string | undefined;
  feelBefore: string;
  emotions: (string | number)[];
  elaboration: string;
  formType:string;
  negativeThoughts?:string;
  gratitudeThoughts?:string;
  thoughtDistortions:(string | number)[];
  challengeNegative:string;
  reinterpretNegative:string;
  feelAfter:string
}
interface CbtStoreType {
  cbtForm: CbtFormType;
  setCbtForm: < k extends keyof CbtFormType > (field: k, formData: CbtFormType[k]) => void;
  clearFormTypes: () => void;
  resetCbtForm: () => void

}
let initialState = {
  feelBefore: "",
  emotions: [],
  elaboration: "",
  formType: "",
  negativeThoughts: "",
  gratitudeThoughts: "",
  thoughtDistortions: [],
  challengeNegative: "",
  reinterpretNegative: "",
  feelAfter: "",
  user_id: ""
}
const useCbtForm = create<CbtStoreType>((set) => ({
  cbtForm: { ...initialState },
  setCbtForm: (field, formData) => set((state) => ({ cbtForm: { ...state.cbtForm, [field]: formData } })),
  clearFormTypes: () => set((state) => ({ cbtForm: { ...state.cbtForm, negativeThoughts: "", gratitudeThoughts: "", thoughtDistortions: [], challengeNegative: "", reinterpretNegative: "", feelAfter: "" } })),
  resetCbtForm: () => set(() => ({ cbtForm: { ...initialState } }))

}))

export default useCbtForm