import { fetchFirebaseAuth, signOutFirebaseAuth } from '@/app/infrastructure/firebase/firebaseAuth';
import { FirebaseAuthStore } from '../../store/StoreProvider';

import { Auth, getIdToken } from 'firebase/auth';

export const signOutUser = async (firebaseAuthStore: FirebaseAuthStore) => {
    await signOutFirebaseAuth(firebaseAuthStore);
};

export const getUserAuth = (firebaseAuthStore: FirebaseAuthStore): Auth | null => {
    return firebaseAuthStore.state.firebaseAuth;
};

export const getLoginUser = (auth: Auth) => {
    return auth.currentUser;
};

export const getToken = async (firebaseAuthStore: FirebaseAuthStore) => {
    const auth = getUserAuth(firebaseAuthStore);
    if (auth == null) return null;
    
    const user = getLoginUser(auth);
    if (user == null) return null;

    const token = await getIdToken(user, true);
    return token;
};

export const userAuthInit = (firebaseAuthStore: FirebaseAuthStore) => {
    fetchFirebaseAuth(firebaseAuthStore.dispatch);
};

export const getUid = (firebaseAuthStore: FirebaseAuthStore) => {
    const auth = getUserAuth(firebaseAuthStore);
    if (auth == null) return null;

    const user = getLoginUser(auth);
    if (user == null) return null;
    
    return user.uid;
};
