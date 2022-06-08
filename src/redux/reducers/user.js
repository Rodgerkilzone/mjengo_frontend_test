const user=(state=null,action)=>{
    if(action.type==="UPDATE_USER"){
        state = action.user
        return state
    }else{
          return state
    }
  
}
export default user