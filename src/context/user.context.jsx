import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    user: null,
    setUser: () => null
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const value = { user, setUser };

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