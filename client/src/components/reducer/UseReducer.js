export const initialState = null;

export const reducer = (state, action) => {
    console.log("reducer");
    if (action.type === 'USER') {
        console.log(action.payload);
        return action.payload;
    }
    return state;
}