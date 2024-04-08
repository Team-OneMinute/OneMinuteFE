import { Auth } from 'firebase/auth';

// service
import { getToken } from './authentication/authentication';

// infrastructure
import { connectWeb3Auth } from '@/app/infrastructure/web3Auth/web3Auth';

export const walletLogin = async (auth: Auth) => {
    if (auth.currentUser == null) return;
    const idToken = await getToken(auth.currentUser);
    // TODO:add event listener
    connectWeb3Auth(auth.currentUser.uid, idToken);
};
