import { NextRequest, NextResponse } from 'next/server';
import ethers, { Contract, Interface, JsonRpcProvider } from 'ethers';

import abi from './abi.json' assert { type: 'json' };

export const GET = async (req: NextRequest) => {
    //const { uid } = await req.json();
    // TODO: exist user check
    const uid = "";
    if (!existUser(uid)) return;

    // get firebase

    try {
        const tokenId = '0';
        const zKyotoProvider = new JsonRpcProvider('https://rpc.startale.com/zkyoto');
        const chianId = '6038361';
        const salt = 0;

        const implementationContractAddress = '0xC54A066c970f6E43a2A9A355885F30109f4e5861';
        const registerContractAddress = '0x52cdC8Bd0cE8DD3Cd32e27bdE2ACbc85db6AE29a';
        const nftContractAddress = '0x093d8549d8cbcf5844b23f508ac2c1687e92862d';

        const registryContract = new Contract(registerContractAddress, abi, zKyotoProvider);
        const smartWalletAddress = await registryContract.account(
            implementationContractAddress,
            chianId,
            nftContractAddress,
            tokenId,
            salt
        );
        if (!smartWalletAddress || smartWalletAddress == "") {
            return NextResponse.json(""); 
        }
            return NextResponse.json(smartWalletAddress);
    } catch (err) {
        console.log(err);
        return NextResponse.json(err);
    }
};

const existUser = (uid: string) => {
    // TODO: exist user check
    return true;
};
