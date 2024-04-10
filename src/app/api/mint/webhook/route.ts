import { Contract, JsonRpcProvider } from 'ethers';
import { NextRequest, NextResponse } from 'next/server';
import { characterNftAbi, lifeNftAbi, smartWalletAbi } from './abis';
import { getSnapByQuery } from '../../infrastructure/firestore/firestore';
import { setUserLifeNftAndPurchaseFlg } from '../../services/user';

interface PostParameters {
    type: string;
    status: string;
    walletAddress: string;
    clientId: string;
    collectionId: string;
    txId: string;
    orderId: string;
    projectId: string;
    contractAddress: string;
    tokenIds: string[];
    timestamp: number;
}

export const POST = async (req: NextRequest) => {
    console.log('start webhook');
    const request = await req.json();
    console.log(request);
    const requestObj = {
        type: request.type,
        status: request.status,
        walletAddress: request.walletAddress,
        clientId: request.clientId,
        collectionId: request.collectionId,
        txId: request.txId,
        orderId: request.orderId,
        projectId: request.projectId,
        contractAddress: request.contractAddress,
        tokenIds: request.tokenIds,
        timestamp: request.timestamp,
    } as PostParameters;

    const zKyotoProvider = new JsonRpcProvider('https://rpc.startale.com/zkyoto');
    const lifeNftAddress = '0x95a7D162fe291A5217159665331e81F740013311';

    if (
        requestObj.type === 'purchase.succeeded' &&
        requestObj.status === 'success' &&
        requestObj.contractAddress === lifeNftAddress &&
        requestObj.tokenIds.length > 0
    ) {
        // life nft
        const lifeNftTokenId = Number(requestObj.tokenIds[0]);
        console.log(lifeNftTokenId);
        const lifeNftContract = new Contract(lifeNftAddress, lifeNftAbi, zKyotoProvider);

        // smart wallet
        const smartWalletAddress = await lifeNftContract.ownerOf(lifeNftTokenId);
        console.log(smartWalletAddress);
        const smartWalletContract = new Contract(smartWalletAddress, smartWalletAbi, zKyotoProvider);
        const smartWalletTokenRes = await smartWalletContract.token();

        // character nft
        const characterNftAddress = String(smartWalletTokenRes[1]);
        console.log(characterNftAddress);
        const characterNftTokenId = Number(smartWalletTokenRes[2]);
        console.log(characterNftTokenId);
        const characterNftContract = new Contract(characterNftAddress, characterNftAbi, zKyotoProvider);

        // user wallet
        const walletAddress = await characterNftContract.ownerOf(characterNftTokenId);
        console.log(walletAddress);

        // fetch firestore user collection
        const collectionId = 'users';
        const query = ['wallet_address', '==', String(walletAddress)];
        const userSnaps = await getSnapByQuery(collectionId, query);
        const userId = String(userSnaps[0].user_id);
        console.log(userId);

        // update firestore user purchased & life
        setUserLifeNftAndPurchaseFlg(userId, lifeNftTokenId);
    }

    return NextResponse.json('000');
};
