export const initialState = {
  user: "",
  selectedChatroom: null,
  messages: [],
  chatrooms: [],
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_CHATROOM: "SET_CHATROOM",
  SET_MESSAGES: "SET_MESSAGES",
  SET_CHATROOMS: "SET_CHATROOMS"
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
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      }
    case actionTypes.SET_CHATROOMS:
      return {
        ...state,
        chatrooms: action.chatrooms
      }
    default:
      return state;
  }
};

export default reducer;
