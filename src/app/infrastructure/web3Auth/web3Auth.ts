import { PrivateKeyProvider, Web3Auth, Web3AuthOptions } from '@web3auth/single-factor-auth';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { Web3AuthStore } from '@/app/store/StoreProvider';
import { Eip1193Provider, ethers } from 'ethers';
import { web3AuthChainConfig, web3AuthClientId } from './web3AuthConfig';

// Initializing Ethereum Provider
export const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig: web3AuthChainConfig },
});

export const web3AuthOptions: Web3AuthOptions = {
    clientId: web3AuthClientId,
    web3AuthNetwork: 'sapphire_devnet',
    usePnPKey: false,
};

export const init = async (web3Auth: Web3Auth) => {
    await web3Auth.init(privateKeyProvider as PrivateKeyProvider);
    return true;
};

export const connect = async (web3Auth: Web3Auth, uid: string, idToken: string) => {
    try {
        const res = await web3Auth.connect({
            verifier: 'OneMinute-firebase-dev',
            verifierId: uid,
            idToken: idToken,
        });
        return res;
    } catch (error) {
        console.log(error);
        throw new Error('wallet connect error');
    }
};

export const logoutWeb3Auth = async (web3AuthStore: Web3AuthStore) => {
    const web3Auth = web3AuthStore.state.web3Auth;
    if (!web3Auth) {
        return;
    }
    await web3Auth.logout();
    const web3AuthDispatch = web3AuthStore.dispatch;
    web3AuthDispatch({ type: 'LOGOUT' });
};

export const connectWeb3Auth = async (web3AuthStore: Web3AuthStore, uid: string, idToken: string) => {
    const dispatch = web3AuthStore.dispatch;
    dispatch({ type: 'REQUEST_CONNECT' });

    const web3Auth = new Web3Auth(web3AuthOptions);
    await init(web3Auth).then(async (doneInitWeb3Auth) => {
        await connect(web3Auth, uid, idToken).then((result) => {
            dispatch({ type: 'FINISH_CONNECT', payload: web3Auth });
        });
    });
};

export const getWalletAddress = async (web3AuthStore: Web3AuthStore): Promise<string> => {
    const web3Auth = web3AuthStore.state.web3Auth;
    if (!web3Auth) {
        return "";
    }
    const ethersProvider = new ethers.BrowserProvider(web3Auth.provider as Eip1193Provider);
    const signer = await ethersProvider.getSigner();
    // Get the user's Ethereum public address
    const userWalletAddress = await signer.getAddress();
    return userWalletAddress;
};
