import { createStore } from 'redux';

const initialState = {
    refresh: false,
    bookmarks: []
};

const refreshBookmarkPage = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH':
            return {
                ...state,
                refresh: !state.refresh
            };
        default:
            return state;
    }
};

const store = createStore(refreshBookmarkPage);

export default store;