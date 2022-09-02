import create from "zustand"




const useCbtForm =  create((set) => ({

    cbtForm:{
        feelBefore:"",
        situation:""
    },
    //addToForm:(formField:string,value:string|object)=>set(()=>{['cbtForm'][formField]=value})
  }))

export default useCbtForm