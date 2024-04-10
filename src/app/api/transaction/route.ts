import { NextRequest, NextResponse } from 'next/server';
import ethers, { Contract, Interface, JsonRpcProvider } from 'ethers';
import abi from './abi.json' assert { type: 'json' };
import { getUser } from '@/app/service/user';

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('uid');

    if (uid === null || uid === "") {
        return NextResponse.json('001');
    }

    const userData = getUser(uid);
    // add walletaddress & btokenID from userdata

    try {
        const walletAddress = '0x18aEFe337E68f5Bd3e18Ba09960f9136754590a6';
        const characterNftContractAddress = '0x093d8549D8cBcF5844B23f508ac2c1687E92862D';

        const zKyotoProvider = new JsonRpcProvider('https://rpc.startale.com/zkyoto');

        const smartWalletContract = new Contract(characterNftContractAddress, abi, zKyotoProvider);

        const totalNftSupply = await smartWalletContract.totalSupply();
        const totalNftSupplyInt = Number(totalNftSupply);
        console.log(totalNftSupply);

        let expectAddress;
        let tokenId;
        for (let i = 0; i < totalNftSupplyInt; i++) {
            let response = await smartWalletContract.ownerOf(i);
            if (walletAddress == response) {
                tokenId = i;
                expectAddress = response;
                break;
            }
        }
        console.log(tokenId);
        console.log(expectAddress);

        return NextResponse.json(expectAddress);
    } catch (err) {
        console.log(err);
        return NextResponse.json('111');
    }
};
