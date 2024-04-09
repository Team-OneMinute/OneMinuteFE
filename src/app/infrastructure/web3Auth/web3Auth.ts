import { PrivateKeyProvider, Web3Auth, Web3AuthOptions } from '@web3auth/single-factor-auth';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { Web3AuthStore } from '@/app/store/StoreProvider';

// TODO: add env file
const clientId = 'BDvwsfMRP29PwNqUbOStvQiLlCeJrGYfxxzbbJ7CwW1IeVp37nISy9NGIrWwM_yuUgXm5yWvvHednxBEPxoGguQ';

// TODO: add env file
const chainConfig = {
    chainId: '0x5c2359',
    displayName: 'zKyoto testnet',
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    tickerName: 'Ethereum',
    ticker: 'ETH',
    decimals: 18,
    rpcTarget: 'https://rpc.startale.com/zkyoto',
    blockExplorer: 'https://zkyoto.explorer.startale.com/',
};

// Initializing Ethereum Provider
export const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
});

export const web3AuthOptions: Web3AuthOptions = {
    clientId: clientId, 
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
