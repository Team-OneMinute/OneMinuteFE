import { getAuth } from "firebase/auth";

export const getAuthUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    return user;
}
