import { NextRequest, NextResponse } from 'next/server';

// fire store
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
//import serviceAccount from './firebase-stg-service-account.json';
const serviceAccount = require('./firebase-stg-service-account.json');

const ENV = 'staging';
const CHAIN = 'zkatana';
const API_KEY =
    'sk_staging_2552NTfz81CkBiSQs3exGvkQcxBXmKGSNy2S4DG6GHtDjZ334mTk59bwtCajbyeg9BBGiy8im6ApZCAV7QcoFWeENHB2EmER1MXvcdZCNQpcaumR4drkjRhvVYKBwkKFUkMKqtGBzVC2mYiWc4FiUdRgcwxaE4bFkMvicDRjXpysgW1nBUQSbefW2BEZeHTh1G4MKvm8eiUE3uL4M98shyd';
const COLLECTION_ID = '1b9cd598-90aa-4cdf-86b8-a0479c5a1ad2';
const NFT_CONTRACT_ADDRESS_CHARACTER = '0x0ba2e25364acf0543CFC22AFD00c429713FEa385';
const NFT_CONTRACT_ADDRESS_LIFE = '0x0FC4edC21C089714f5B8e5510D402865137f68e9';

interface PostParameters {
    uid: string;
}

enum ResponseCode {
    Playable = '0000',
    NotExistNFT = '0001',
    LifeIsZero = '0002',
}

initializeApp({
    credential: cert(serviceAccount),
});

export const POST = async (req: NextRequest) => {
    const { uid } = (await req.json()) as PostParameters;
    const userRef = await getFirestore().collection('users').doc(uid).get();
    const useSnap = await userRef.data();

    const userData: User = {
        docNo: String(useSnap!.user_id),
        userId: String(useSnap!.user_id),
        name: String(useSnap!.name),
        life: Number(useSnap!.life),
        claimableReward: Number(useSnap!.claimable_reward),
        totalClaimed: Number(useSnap!.total_claimed),
        mailAddress: String(useSnap!.mail_address),
        purchasedNftFlg: Boolean(useSnap!.purchased_nft_flg),
    };

    if (userData.purchasedNftFlg == false) {
        console.log("not exist nft data firebase");
        //fetch nft
        const nftData = await fetchNft(userData.mailAddress);
        // const nftData = await fetchNft('takeuma.com@example.com');
        if (hasLifeNft(nftData)) {
            // set user life & flg
            console.log('not exist nft data firebase, but exist crossmint');
            addTransaction();
            const responseCode = ResponseCode.Playable;
            return NextResponse.json(responseCode);
        } else {
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

const fetchNft = async (email: string) => {
    // fetch nft in wallet from email
    const baseHeadURL = 'https://staging.crossmint.com/api/2022-06-09/wallets/';
    const baseTailURL = '/nfts?page=1&perPage=20';
    const encodedColon = '%3A';
    const encodedMailAddress = emailUrlEncode(email);

    const encodedPath = `${baseHeadURL}email${encodedColon}${encodedMailAddress}${encodedColon}${CHAIN}${baseTailURL}`;
    //const fullPathBeforeEncode = `${baseHeadURL}email:${encodedMailAddress}:${chain}${baseTailURL}`;

    const options = {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
        },
    };

    const nfts = await fetch(encodedPath, options)
        .then((response) => response.json())
        .then((response) => {
            // console.log(response);
            return response;
        })
        .catch((err) => console.error(err));
    // console.log(nfts);
    return nfts;
}

const hasLifeNft = (nfts: any[]) => {
    return nfts.some((nftData) => nftData.contractAddress == NFT_CONTRACT_ADDRESS_LIFE);
}

const emailUrlEncode = (mail: string) => {
    const splitStr = mail.split('@');
    const encodedMailAddress = splitStr[0] + '%40' + splitStr[1];
    return encodedMailAddress;
};
