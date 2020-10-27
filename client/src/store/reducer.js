const initialState = {
  loading: false,
  isShowModal: false,
  status: null,
  message: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_POST":
      return {
        loading: true,
        isShowModal: true,
        status: null,
        message: null,
      };
    case "DELETE_SUCCESS":
      return {
        loading: false,
        isShowModal: true,
        status: action.data.status,
        message: action.data.message,
      };
    case "DELETE_ERROR":
      return {
        loading: false,
        isShowModal: true,
        status: action.data.status,
        message: action.data.message,
      };
    case "CLOSE_MODAL":
      return {
        isShowModal: false,
        status: null,
        message: null,
      };
      default:
        return state;
  }
};
export default reducer;
