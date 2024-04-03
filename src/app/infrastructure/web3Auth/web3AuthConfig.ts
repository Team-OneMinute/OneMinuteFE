import { PrivateKeyProvider, Web3Auth } from '@web3auth/single-factor-auth';
import { CHAIN_NAMESPACES, IProvider } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { signInWithEmailLink, isSignInWithEmailLink, sendSignInLinkToEmail } from 'firebase/auth';
import { getAuthentication } from '@/app/service/authentication';
//import { useAuthState } from 'react-firebase-hooks/auth';
import { Contract, Eip1193Provider, ethers, getDefaultProvider } from 'ethers';

// TODO: add env file
const clientId = 'BDvwsfMRP29PwNqUbOStvQiLlCeJrGYfxxzbbJ7CwW1IeVp37nISy9NGIrWwM_yuUgXm5yWvvHednxBEPxoGguQ';

// TODO: add env file
// const chainConfig = {
//     chainId: '0x5c2359',
//     displayName: 'zKyoto testnet',
//     chainNamespace: CHAIN_NAMESPACES.EIP155,
//     tickerName: 'Ethereum',
//     ticker: 'ETH',
//     decimals: 18,
//     rpcTarget: 'https://rpc.startale.com/zkyoto',
//     blockExplorer: 'https://zkyoto.explorer.startale.com/',
// };

const chainConfig = {
    chainId: '0x1',
    displayName: 'Ethereum Mainnet',
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    tickerName: 'Ethereum',
    ticker: 'ETH',
    decimals: 18,
    rpcTarget: 'https://rpc.ankr.com/eth',
    blockExplorer: 'https://etherscan.io',
};

// Initialising Web3Auth Single Factor Auth SDK
const web3authSfa = new Web3Auth({
    clientId, // Get your Client ID from Web3Auth Dashboard
    web3AuthNetwork: 'sapphire_devnet', // Get your Network from Web3Auth Dashboard
    usePnPKey: false, // Setting this to true returns the same key as PnP Web SDK, By default, this SDK returns CoreKitKey.
});

// Initializing Ethereum Provider
export const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
});

web3authSfa.init(privateKeyProvider as PrivateKeyProvider);

export const connectWeb3Auth = async (uid: string, idToken: string) => {
    console.log('start connect web3 auth');
    console.log(web3authSfa);
    console.log(uid);
    console.log(idToken);
    const res = await web3authSfa
        .connect({
            verifier: 'OneMinute-firebase-dev',
            verifierId: uid,
            idToken: idToken,
        })
        .then(() => {
            getUserInfoOnChain(web3authSfa);
            getSymbol(web3authSfa);
        });
    console.log('Auth res');
    console.log(res);
};

export const logoutWeb3Auth = async () => {
    if (web3authSfa == null) return;
    await web3authSfa.logout();
};

export const getUserInfoOnChain = async (web3authSfa: Web3Auth) => {
    console.log('wallet check');
    const ethersProvider = new ethers.BrowserProvider(web3authSfa.provider as Eip1193Provider);
    const signer = await ethersProvider.getSigner();

    // Get the user's Ethereum public address
    const address = signer.getAddress();
    console.log(address);
};

const getSymbol = async (web3authSfa: Web3Auth) => {
    const abi = [
        'function decimals() view returns (uint8)',
        'function symbol() view returns (string)',
        'function balanceOf(address a) view returns (uint)',
    ];
    const ethersProvider = new ethers.BrowserProvider(web3authSfa.provider as Eip1193Provider);
    // Create a contract; connected to a Provider, so it may
    // only access read-only methods (like view and pure)
    const contract = new Contract('dai.tokens.ethers.eth', abi, ethersProvider);
    const sym = await contract.symbol();
    console.log(sym);
};
