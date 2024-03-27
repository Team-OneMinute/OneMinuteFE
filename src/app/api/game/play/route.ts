import { NextRequest, NextResponse } from 'next/server';

// fire store
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
//import serviceAccount from './firebase-stg-service-account.json';
const serviceAccount = require('./firebase-stg-service-account.json');


interface PostParameters {
    uid: string;
}

enum ResponseCode {
    Playable = '0000',
    NotExistNFT = '0001',
    LifeIsZero = '0002',
}

export const POST = async (req: NextRequest) => {
        initializeApp({
            credential: cert(serviceAccount),
        });
    const { uid } = (await req.json()) as PostParameters;
    const userRef = await getFirestore().collection("users").doc(uid).get();
    const useSnap = await userRef.data();
    const userData = JSON.parse(String(useSnap));

    // const userData = useSnap!.map((data:
    //     {
    //         user_id: string;
    //         name: string;
    //         life: number;
    //         claimable_reward: number;
    //         total_claimed: number;
    //         mail_address: string;
    //         purchased_nft_flg: boolean;
    //     }) => {
    //     return {
    //         userId: String(data.user_id),
    //         name: String(data.name),
    //         life: Number(data.life),
    //         claimableReward: Number(data.claimable_reward),
    //         totalClaimed: Number(data.total_claimed),
    //         mailAddress: String(data.mail_address),
    //         purchasedNftFlg: Boolean(data.purchased_nft_flg),
    //     } as User;
    // });

    if (userData.purchasedNftFlg == false) {
        console.log("not exist nft data firebase");
        //fetch nft
        const nftData = true;
        if (nftData == true) {
            // set user life & flg
            console.log('not exist nft data firebase, but exist crossmint');
            addTransaction();
            const responseCode = ResponseCode.Playable;
            return NextResponse.json(responseCode);
        } else if (nftData == false) {
            console.log('not exist nft data firebase & crossmint');
            const responseCode = ResponseCode.NotExistNFT;
            return NextResponse.json(responseCode);
        }
    }
    if (userData.life <= 0) {
        console.log(`exist nft data, but life is low: ${userData.life}`);
        const responseCode = ResponseCode.LifeIsZero;
        return NextResponse.json(responseCode);
    }
    console.log("exist nft and life");
    const transactionId = '';
    addTransaction();

    const responseCode = ResponseCode.Playable;
    return NextResponse.json(responseCode);
};

const addTransaction = () => {
    console.log("add transaction");
};
