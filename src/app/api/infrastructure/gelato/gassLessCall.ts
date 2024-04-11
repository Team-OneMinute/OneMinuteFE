import { GelatoRelay, SponsoredCallRequest } from '@gelatonetwork/relay-sdk';
import { ethers } from 'ethers';
import NFTDropABI from '@/app/assets/abi/NFTDrop.json';

// INPUT SPONSOR API KEY HERE TO MAKE SURE THAT YOU CAN GET GOING!
// HEAD OVER TO https://relay.gelato.network TO GET STARTED!
const sponsorAPIkey = process.env.GELATO_SPONSOR_API_KEY;
// relay request parameters
const feeToken = process.env.GELATO_FEE_TOKEN;

export const gasLessCall = async (address: string, target: string, targetChainId: number) => {

    if (!sponsorAPIkey || !feeToken) {
        throw new Error('failed to load env in gasLessCall');
    }
    const relay = new GelatoRelay();

    //const iface = new ethers.utils.Interface(NFTDropABI);
    const iface = new ethers.Interface(NFTDropABI);
    const allowListProof = [[ethers.ZeroHash], ethers.MaxUint256, 0, feeToken];
    const data = iface.encodeFunctionData('claim', [address, 1, feeToken, 0, allowListProof, ethers.ZeroHash]);

    if (!targetChainId || !data) throw new Error('chain or request data invalid err');

    const chainId = ethers.toBigInt(targetChainId);

    const request: SponsoredCallRequest = {
        chainId,
        target,
        data,
    };

    try {
        const relayResponse = await relay.sponsoredCall(request, sponsorAPIkey);
        console.log(relayResponse);
        return relayResponse;
    } catch (err) {
        throw new Error('failed to sponsoredCall');
    }
};
