import { NextRequest, NextResponse } from 'next/server';

// service
import { mintCharacterNft } from '@/app/api/services/nft';
import { RelayResponse } from '@gelatonetwork/relay-sdk/dist/lib/types';

interface PostParameters {
    uid: string;
    walletAddress: string;
    imageUrl: string;
}

interface ResponseParameters {
    code: string;
    message: string;
    relayResponse: RelayResponse;
    baseUrl: string;
    // TODO: サードパーティのエラーコード追加
}

export const POST = async (req: NextRequest) => {
    const { uid, walletAddress, imageUrl } = (await req.json()) as PostParameters;
    // TODO: exist user check
    if (!existUser(uid)) return;
    try {
        const res = await mintCharacterNft(uid, walletAddress, imageUrl);
        console.log("es start");
        console.log(res);
        const response = {
            code: '000',
            message: 'success create gelato transaction',
            relayResponse: res,
            baseUrl: 'https://relay.gelato.digital/tasks/status/',
        } as ResponseParameters;
        return NextResponse.json(response);
    } catch (err) {
        const res = {
            code: '999',
            message: 'Mint nft is fail.',
        } as ResponseParameters;
        return NextResponse.json(res);
    }
};

const existUser = (uid: string) => {
    // TODO: exist user check
    return true;
};
