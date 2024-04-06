'use client';

import { Web3Auth } from '@web3auth/single-factor-auth';
import { Auth as FirebaseAuth } from 'firebase/auth';
import { Dispatch, createContext, useReducer } from 'react';

interface Props {
    children: React.ReactNode;
}

// interface Store {
//     firebaseAuthState: FirebaseAuthState;
//     web3Auth: Web3Auth;
// }
export interface DataStore {
    firebaseAuthStore: FirebaseAuthStore;
    web3AuthStore: Web3AuthStore;
}
export interface FirebaseAuthStore {
    state: FirebaseAuthState;
    dispatch: Dispatch<FirebaseAuthAction>;
}
export interface Web3AuthStore {
    state: Web3AuthState;
    dispatch: Dispatch<Web3AuthAction>;
}

interface FirebaseAuthState {
    firebaseAuth: FirebaseAuth | null;
    isFetching: boolean;
}
interface Web3AuthState {
    web3Auth: Web3Auth | null;
    isConnecting: boolean;
}


// interface FirebaseAuthState {
//     firebaseAuth: FirebaseAuth;
//     setFirebaseAuth: (firebaseAuth: FirebaseAuth) => void;
// }

// const initialStore: Store = {
//     web3Auth: new Web3Auth(web3AuthOptions),
//     firebaseAuthState: {
//         firebaseAuth: getAuthentication(),
//         setFirebaseAuth: (value: FirebaseAuth) => false,
//     },
// };

// const initialFirebaseAuthState: FirebaseAuthState = {
//     firebaseAuth: null,
//     isFetching: false,
// }
// const initialWeb3AuthState: Web3AuthState = {
//     web3Auth: null,
//     isConnecting: false,
// }

type FirebaseAuthActionType = "REQUEST_FETCH" | "FINISH_FETCH";
type Web3AuthActionType = "REQUEST_CONNECT" | "FINISH_CONNECT";
export interface FirebaseAuthAction {
    type: FirebaseAuthActionType;
    payload?: FirebaseAuth;
}
export interface Web3AuthAction {
    type: Web3AuthActionType;
    payload?: Web3Auth;
}

const firebaseAuthReducer = (state: FirebaseAuthState, action: FirebaseAuthAction): FirebaseAuthState => {
    switch (action.type) {
        case "REQUEST_FETCH":
            return {
                ...state,
                isFetching: true,
            }
        case "FINISH_FETCH": {}
            const payload = action.payload || null;
            return {
                ...state,
                firebaseAuth: payload,
                isFetching: false,
            }
        default:
            return {
                ...state,
                firebaseAuth: null,
                isFetching: false,
            }
    }
}
const web3AuthReducer = (state: Web3AuthState, action: Web3AuthAction): Web3AuthState => {
    switch (action.type) {
        case "REQUEST_CONNECT":
            return {
                ...state,
                isConnecting: true,
            }
        case "FINISH_CONNECT":
            const payload = action.payload || null;
            return {
                ...state,
                web3Auth: payload,
                isConnecting: false,
            }
        default:
            return {
                ...state,
                web3Auth: null,
                isConnecting: false,
            }
    }
};

// const initialDataStore: DataStore = {
//     firebaseAuthStore: {
//         state: initialFirebaseAuthState,
//         dispatch: firebaseAuthReducer,
//     },
//     web3AuthStore: {
//         state: initialWeb3AuthState,
//         dispatch: web3AuthReducer,
//     },
// }

// export const StoreContext = createContext<DataStore>(initialDataStore);
export const StoreContext = createContext({} as DataStore);

const StoreProvider: React.FC<Props> = ({ children }) => {
    // const didLogRef = useRef<boolean>(false);
    // state
    // const [firebaseAuth, setFirebaseAuth] = useState<FirebaseAuth>(initialStore.firebaseAuthState.firebaseAuth);
    // const store: Store = {
    //     web3Auth: initialStore.web3Auth,
    //     firebaseAuthState: {
    //         firebaseAuth,
    //         setFirebaseAuth,
    //     },
    // };

    // useEffect(() => {
    //     if (didLogRef.current === false) {
    //         didLogRef.current = true;
    //     } else {
    //         // initialize web3Auth
    //         (async () => {
    //             await initWeb3Auth(store.web3Auth).then(async (doneInitWeb3Auth) => {
    //                 console.log('initWeb3Auth then start');
    //                 const firebaseAuthUser = store.firebaseAuthState.firebaseAuth.currentUser;
    //                 console.log(firebaseAuthUser);
    //                 if (!firebaseAuthUser) {
    //                     // if not have currentUser, that is not login. Because don't connect web3Auth
    //                     console.log('firebaseAuthUser is null');
    //                     return false;
    //                 }
    //                 const idToken = await getToken(firebaseAuthUser);
    //                 await connectWeb3Auth(store.web3Auth, firebaseAuthUser.uid, idToken);
    //             });
    //         })();
    //     }
    // }, []);

    const initialFirebaseAuthState: FirebaseAuthState = {
        firebaseAuth: null,
        isFetching: false,
    };
    const initialWeb3AuthState: Web3AuthState = {
        web3Auth: null,
        isConnecting: false,
    };

    const [firebaseAuthState, firebaseAuthDispatch] = useReducer(firebaseAuthReducer, initialFirebaseAuthState);
    const [web3AuthState, web3AuthDispatch] = useReducer(web3AuthReducer, initialWeb3AuthState);
    const dataStore: DataStore = {
        firebaseAuthStore: {
            state: firebaseAuthState,
            dispatch: firebaseAuthDispatch,
        },
        web3AuthStore: {
            state: web3AuthState,
            dispatch: web3AuthDispatch,
        },
    };

    return <StoreContext.Provider value={dataStore}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
