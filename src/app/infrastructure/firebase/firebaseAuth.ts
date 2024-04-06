import { Auth, getAuth, signOut } from "firebase/auth";

export const getAuthUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    return user;
}

export const signOutFirebaseAuth = async (firebaseAuth: Auth) => {
    await signOut(firebaseAuth);
}
