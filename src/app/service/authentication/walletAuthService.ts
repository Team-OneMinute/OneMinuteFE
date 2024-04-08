import { logoutWeb3Auth } from '@/app/infrastructure/web3Auth/web3Auth';
import { Web3AuthStore } from '../../store/StoreProvider';

export const logoutWallet = async (web3AuthStore: Web3AuthStore) => {
    await logoutWeb3Auth(web3AuthStore);
};