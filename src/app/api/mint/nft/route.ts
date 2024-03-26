import { NextRequest, NextResponse } from 'next/server';

const ENV = 'staging';
const CHAIN = 'zkatana';
const API_KEY =
    'sk_staging_2552NTfz81CkBiSQs3exGvkQcxBXmKGSNy2S4DG6GHtDjZ334mTk59bwtCajbyeg9BBGiy8im6ApZCAV7QcoFWeENHB2EmER1MXvcdZCNQpcaumR4drkjRhvVYKBwkKFUkMKqtGBzVC2mYiWc4FiUdRgcwxaE4bFkMvicDRjXpysgW1nBUQSbefW2BEZeHTh1G4MKvm8eiUE3uL4M98shyd';
const COLLECTION_ID = '1b9cd598-90aa-4cdf-86b8-a0479c5a1ad2';

export const GET = (req: NextRequest) => {
    const res = NextResponse.json({ msg: 'hello,world!' });
    return res;
};

interface PostParameters {
    id: string;
    email: string;
    imageUrl: string;
}

// TODO: FailSafe 実装（NFTを持っている人が叩いたとしても大丈夫な実装にする）
export const POST = async (req: NextRequest) => {
    // get request params
    console.log('api');
    const { id, email, imageUrl } = (await req.json()) as PostParameters;
    console.log(email);

    const recipientAddress = `email:${email}:${CHAIN}`;

    const url = `https://${ENV}.crossmint.com/api/2022-06-09/collections/${COLLECTION_ID}/nfts`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify({
            recipient: recipientAddress,
            metadata: {
                name: `Crossmint Test NFT ${id}`,
                image: imageUrl,
                description: 'My first NFT using Crossmint',
            },
        }),
    };
    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error('error:' + err));

    return NextResponse.json(email);
};

// const mintNft = (email: string) => {
//     const recipientAddress = `email:${email}:${CHAIN}`;

//     const url = `https://${ENV}.crossmint.com/api/2022-06-09/collections/${COLLECTION_ID}/nfts`;
//     const options = {
//         method: 'POST',
//         headers: {
//             accept: 'application/json',
//             'content-type': 'application/json',
//             'x-api-key': API_KEY,
//         },
//         body: JSON.stringify({
//             recipient: recipientAddress,
//             metadata: {
//                 name: 'Crossmint Test NFT 1',
//                 image: 'https://picsum.photos/400',
//                 description: 'My first NFT using Crossmint',
//             },
//         }),
//     };

//     fetch(url, options)
//         .then((res) => res.json())
//         .then((json) => logger.info(json))
//         .catch((err) => logger.error('error:' + err));
// };