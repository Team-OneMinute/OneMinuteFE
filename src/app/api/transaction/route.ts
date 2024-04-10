import { NextRequest, NextResponse } from 'next/server';
import ethers, { Contract, Interface, JsonRpcProvider } from 'ethers';
//import abi from "./abi";
import abi from './abi.json' assert { type: 'json' };
import { getUserData } from '../infrastructure/user';
import { setCharacterNftTokenId } from '../services/user';

interface PostParameters {
    uid: string;
}

export const POST = async (req: NextRequest) => {
    // get uid from request
    const request = await req.json();
    const requestObj = {
        uid: request.uid,
    } as PostParameters;
    console.log(requestObj.uid);
    const uid = requestObj.uid;
    console.log(uid);

    // get user document by uid
    const userData = await getUserData(uid);
    console.log(userData);
    const characterNftTokenId = userData.characterNftTokenId;
    console.log(characterNftTokenId);

    let tokenId = -1;
    if (characterNftTokenId >= 0) {
        // if (tokenId) -> return response
        tokenId = characterNftTokenId;
    } else {
        // else (!tokenId) -> get tokenId from blockchain (fetch loop all)
        // characterNftTokenId < 0
        try {
            const walletAddress = '0x18aEFe337E68f5Bd3e18Ba09960f9136754590a6';
            const characterNftContractAddress = '0x093d8549D8cBcF5844B23f508ac2c1687E92862D';

            const zKyotoProvider = new JsonRpcProvider('https://rpc.startale.com/zkyoto');

            const smartWalletContract = new Contract(characterNftContractAddress, abi, zKyotoProvider);

            const totalNftSupply = await smartWalletContract.totalSupply();
            const totalNftSupplyInt = Number(totalNftSupply);
            console.log(totalNftSupply);

            let expectAddress;
            // let tokenId;
            for (let i = totalNftSupplyInt - 1; i >= 0; i--) {
                let response = await smartWalletContract.ownerOf(i);
                if (walletAddress == response) {
                    tokenId = i;
                    expectAddress = response;
                    break;
                }
            }
            console.log(tokenId);
            console.log(expectAddress);
        } catch (err) {
            console.log(err);
            return NextResponse.json('111');
        }

        if (tokenId >= 0) {
            // if (tokenId) -> update user collection tokenId
            setCharacterNftTokenId(uid, tokenId);
        } else {
            // else (!tokenId) -> mint is not finish or error
            // tokenId < 0
            return NextResponse.json('111');
        }

        return NextResponse.json(tokenId);
    }
};
