/**
 * I'm creating this reducer because I don't want to mess with the others
 * and the login info one doesn't have a structure that make sense to handle session store
 */
import produce from 'immer';

const scope = '[Session]';

export const SET_USER = `${scope} SET USER`;
export const UNSET_USER = `${scope} UNSET USER`;

export const SET_TOKEN = `${scope} SET TOKEN`;

const defaultState = {
  user: null,
  pushToken: null,
};

const sessionReducer = (state = defaultState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_USER: {
        draft.user = action.payload;
        break;
      }
      case UNSET_USER: {
        draft.user = null;
        break;
      }
      case SET_TOKEN: {
        draft.pushToken = action.payload;
        break;
      }
      default:
        return draft;
    }
  });

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const unsetUser = () => {
  return {
    type: UNSET_USER,
  };
};

export const setPushToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export default sessionReducer;
