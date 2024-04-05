import { NextRequest, NextResponse } from 'next/server';
// service
import { checkPlay, initializeGame } from '@/app/api/services/gamePlay';
// entity
import { CheckGamePlayStatus } from '@/app/api/entity/serviceCode';
import { ResponseCodeGamePlay } from '@/app/api/entity/responseCode';

interface PostParameters {
    uid: string;
    gameId: string;
    walletAddress: string;
}

export const POST = async (req: NextRequest) => {
    const { uid, gameId, walletAddress } = (await req.json()) as PostParameters;

    const checkPlayStatus = await checkPlay(uid, walletAddress);

    switch (checkPlayStatus) {
        case CheckGamePlayStatus.OK:
            initializeGame(uid, gameId);
            return NextResponse.json(ResponseCodeGamePlay.Playable);
        case CheckGamePlayStatus.LIFE_IS_ZERO:
            return NextResponse.json(ResponseCodeGamePlay.LifeIsZero);
        case CheckGamePlayStatus.NFT_NOT_EXIST:
            return NextResponse.json(ResponseCodeGamePlay.NotExistNFT);
    }
};
