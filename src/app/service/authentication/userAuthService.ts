import { signOutFirebaseAuth } from "@/app/infrastructure/firebase/firebaseAuth";
import { FirebaseAuthStore } from '../../store/StoreProvider';

export const signOutUser = async (firebaseAuthStore: FirebaseAuthStore) => {
    await signOutFirebaseAuth(firebaseAuthStore);
};
