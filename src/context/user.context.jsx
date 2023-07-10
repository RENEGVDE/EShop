import { createContext, useState, useEffect, useReducer } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

export const UserContext = createContext({
    user: null,
    setUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_USER: 'SET_USER'
}

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_USER:
            return { user: payload };
        default:
            // return state;
            throw new Error(`Unknown action type: ${type}`);
    }
}

const INITIAL_STATE = {
    user: null
}

export const UserProvider = ({ children }) => {
    // const [user, setUser] = useState(null);
    const [{ user }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setUser = (user) => {
        dispatch(
            createAction(USER_ACTION_TYPES.SET_USER, user)
        )
    }

    const value = { user, dispatch };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((authUser) => {
            if (authUser) {
                createUserDocumentFromAuth(authUser)
            }
            setUser(authUser);
        });
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

// export const UserConsumer = UserContext.Consumer;