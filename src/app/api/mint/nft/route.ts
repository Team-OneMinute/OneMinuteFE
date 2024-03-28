import { NextRequest, NextResponse } from 'next/server';

// service
import { mintCharacterNft } from '@/app/api/services/nft';

interface PostParameters {
    id: string;
    email: string;
    imageUrl: string;
}

// TODO: FailSafe 実装（NFTを持っている人が叩いたとしても大丈夫な実装にする）
export const POST = async (req: NextRequest) => {
    const { id, email, imageUrl } = (await req.json()) as PostParameters;
    // TODO: have NFT check & check Id to Image
    if (!hasCharacterNFT()) return;
    if (!checkIdImage()) return;

    mintCharacterNft(email, imageUrl);

    return NextResponse.json(email);
};

const hasCharacterNFT = () => {
    return true;
}

const checkIdImage = () => {
    return true;
}