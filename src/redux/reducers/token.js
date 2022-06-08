const token = (state =null, action) => {
    // console.log(action)
    
    if (action.type === "UPDATE_TOKEN") {
        state=action.token;
        // console.log(state)
        return state
    } 
    else {
        return state
    }

}

export default token;