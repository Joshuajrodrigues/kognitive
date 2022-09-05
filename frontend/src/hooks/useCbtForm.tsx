import create from "zustand"


interface CbtFormType {
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
  clearFormTypes: () => void

}
const useCbtForm = create<CbtStoreType>((set) => ({
  cbtForm: {
    feelBefore: "",
    emotions: [],
    elaboration: "",
    formType:"",
    negativeThoughts:"",
    gratitudeThoughts:"",
    thoughtDistortions:[],
    challengeNegative:"",
    reinterpretNegative:"",
    feelAfter:""
  },
  setCbtForm: (field, formData) => set((state) => ({ cbtForm: { ...state.cbtForm, [field]: formData } })),
  clearFormTypes: () => set((state) => ({ cbtForm: { ...state.cbtForm, negativeThoughts: "", gratitudeThoughts: "", thoughtDistortions: [], challengeNegative: "", reinterpretNegative: "", feelAfter: "" } }))
}))

export default useCbtForm