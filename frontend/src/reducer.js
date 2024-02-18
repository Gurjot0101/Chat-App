export const initialState = {
  user: "",
  selectedChatroom: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_CHATROOM: "SET_CHATROOM",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_CHATROOM:
      return {
        ...state,
        selectedChatroom: action.selectedChatroom,
      };

    default:
      return state;
  }
};

export default reducer;
