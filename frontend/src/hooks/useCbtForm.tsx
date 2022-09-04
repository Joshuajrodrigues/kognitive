import create from "zustand"


interface CbtFormType {
  feelBefore: string;
  emotions: (string | number)[];
  elaboration: string;
  formType:string;
  negativeThoughts?:string;
  gratitudeThoughts?:string;
  thoughtDistortions:string[];
  challengeNegative:string;
  reinterpretNegative:string;
  feelAfter:string
}
interface CbtStoreType {
  cbtForm: CbtFormType,
  setCbtForm: (field: string, formData: string | (string | number)[]) => void
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
  setCbtForm: (field, formData) => set((state) => ({ cbtForm: { ...state.cbtForm, [field]: formData } }))
}))

export default useCbtForm