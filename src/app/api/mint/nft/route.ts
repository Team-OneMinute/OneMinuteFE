import { NextRequest, NextResponse } from 'next/server';

// service
import { mintCharacterNft } from '@/app/api/services/nft';

interface PostParameters {
    uid: string;
    walletAddress: string;
    imageUrl: string;
}

interface ResponseParameters {
    code: string;
    message: string;
    // TODO: サードパーティのエラーコード追加
}

// TODO: FailSafe 実装（NFTを持っている人が叩いたとしても大丈夫な実装にする）
export const POST = async (req: NextRequest) => {
    const { uid, walletAddress, imageUrl } = (await req.json()) as PostParameters;
    // TODO: have NFT check & check Id to Image
    if (!existUser(uid)) return;
    console.log("mint start");
    try {
        const res = mintCharacterNft(walletAddress, imageUrl);
        return NextResponse.json(res);
    } catch (err) {
        const responseCode = {
            code: '999',
            message: "Mint nft is fail."
        } as ResponseParameters;
        return NextResponse.json(responseCode);
    }
};

const existUser = (uid: string) => {
    // TODO: exist user check
    return true;
};