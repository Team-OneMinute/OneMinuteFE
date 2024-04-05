'use client';

import { Web3Auth } from '@web3auth/single-factor-auth';
import { Auth as FirebaseAuth } from 'firebase/auth';
import { createContext, useEffect, useRef, useState } from 'react';
import { connectWeb3Auth, initWeb3Auth, web3AuthOptions } from '../infrastructure/web3Auth/web3AuthConfig';
import { getAuthentication, getToken } from '../service/authentication';

interface Props {
    children: React.ReactNode;
}

interface Store {
    firebaseAuthState: FirebaseAuthState;
    web3Auth: Web3Auth;
}

interface FirebaseAuthState {
    firebaseAuth: FirebaseAuth;
    setFirebaseAuth: (firebaseAuth: FirebaseAuth) => void;
}

const initialStore: Store = {
    web3Auth: new Web3Auth(web3AuthOptions),
    firebaseAuthState: {
        firebaseAuth: getAuthentication(),
        setFirebaseAuth: (value: FirebaseAuth) => false,
    },
};

export const StoreContext = createContext<Store>(initialStore);

const StoreProvider: React.FC<Props> = ({ children }) => {
    const didLogRef = useRef<boolean>(false);
    // state
    const [firebaseAuth, setFirebaseAuth] = useState<FirebaseAuth>(initialStore.firebaseAuthState.firebaseAuth);
    const store: Store = {
        web3Auth: initialStore.web3Auth,
        firebaseAuthState: {
            firebaseAuth,
            setFirebaseAuth,
        },
    };

    useEffect(() => {
        if (didLogRef.current === false) {
            didLogRef.current = true;
        } else {
            // initialize web3Auth
            (async () => {
                await initWeb3Auth(store.web3Auth).then(async (doneInitWeb3Auth) => {
                    console.log('initWeb3Auth then start');
                    const firebaseAuthUser = store.firebaseAuthState.firebaseAuth.currentUser;
                    console.log(firebaseAuthUser);
                    if (!firebaseAuthUser) {
                        // if not have currentUser, that is not login. Because don't connect web3Auth
                        console.log('firebaseAuthUser is null');
                        return false;
                    }
                    const idToken = await getToken(firebaseAuthUser);
                    await connectWeb3Auth(store.web3Auth, firebaseAuthUser.uid, idToken);
                });
            })();
        }
    }, []);

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
