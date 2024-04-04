import { GelatoRelay, SponsoredCallRequest } from '@gelatonetwork/relay-sdk';
import { ethers } from 'ethers';
import NFTDropABI from '@/app/assets/abi/NFTDrop.json';

export const gasLessCall = async (address: string, target: string, targetChainId: number) => {
    const relay = new GelatoRelay();
    console.log("gasless call method start");
    // target NFT contract
    //const target = '0x093d8549D8cBcF5844B23f508ac2c1687E92862D';
    // relay request parameters
    const feeToken = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    //const iface = new ethers.utils.Interface(NFTDropABI);
    const iface = new ethers.Interface(NFTDropABI);
    const allowListProof = [[ethers.ZeroHash], ethers.MaxUint256, 0, feeToken];
    const data = iface.encodeFunctionData('claim', [address, 1, feeToken, 0, allowListProof, ethers.ZeroHash]);

    if (!targetChainId || !data) throw new Error('chain or request data invalid err');

    // INPUT SPONSOR API KEY HERE TO MAKE SURE THAT YOU CAN GET GOING!
    // HEAD OVER TO https://relay.gelato.network TO GET STARTED!
    const sponsorAPIkey = '_kSxp9yI_MYMhZ93Ynpz_RQ_4WJd93RVkm45mNIWD8E_';

    const chainId = ethers.toBigInt(targetChainId);

    const request: SponsoredCallRequest = {
        chainId,
        target,
        data,
    };

    try {
        const relayResponse = await relay.sponsoredCall(request, sponsorAPIkey);
        console.log(relayResponse)
        return relayResponse;
    } catch (err) {
        throw new Error('failed to sponsoredCall');
    }
};
