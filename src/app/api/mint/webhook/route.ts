import { NextRequest, NextResponse } from 'next/server';

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
    console.log('post method');
    let today = new Date();
    console.log(today);
    const identifier = await req.json();
    // TODO: add config file
    const nftContractAddress = '0x95a7D162fe291A5217159665331e81F740013311';

    let reqObj;
    try {
        reqObj = {
            type: identifier.type,
            status: identifier.status,
            walletAddress: identifier.walletAddress,
            clientId: identifier.clientId,
            collectionId: identifier.collectionId,
            txId: identifier.txId,
            orderId: identifier.orderId,
            projectId: identifier.projectId,
            contractAddress: identifier.contractAddress,
            tokenIds: identifier.tokenIds,
            timestamp: identifier.timestamp,
        } as PostParameters;
    } catch (err) {
        throw new Error('invalid request');
    }

    // NFT purchase is success and contract check
    if (
        reqObj.type === 'purchase.succeeded' &&
        reqObj.status === 'success' &&
        reqObj.contractAddress === nftContractAddress
    ) {
        try {
            console.log(reqObj.walletAddress);
            console.log(reqObj.tokenIds);

        } catch {
            // TODO: fatal alert
            throw new Error('invalid request');
        }
    }

    return NextResponse.json('000');
};
