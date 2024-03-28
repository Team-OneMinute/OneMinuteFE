// util
import { emailUrlEncode } from '@/app/utils/emailUrlEncode';

const API_KEY =
    'sk_staging_2552NTfz81CkBiSQs3exGvkQcxBXmKGSNy2S4DG6GHtDjZ334mTk59bwtCajbyeg9BBGiy8im6ApZCAV7QcoFWeENHB2EmER1MXvcdZCNQpcaumR4drkjRhvVYKBwkKFUkMKqtGBzVC2mYiWc4FiUdRgcwxaE4bFkMvicDRjXpysgW1nBUQSbefW2BEZeHTh1G4MKvm8eiUE3uL4M98shyd';

export const fetchNft = async (email: string) => {
    // fetch nft in wallet from email
    // TODO: into env file
    const CHAIN = 'zkatana';
    const baseHeadURL = 'https://staging.crossmint.com/api/2022-06-09/wallets/';
    const baseTailURL = '/nfts?page=1&perPage=20';
    const encodedColon = '%3A';
    const encodedMailAddress = emailUrlEncode(email);

    const encodedPath = `${baseHeadURL}email${encodedColon}${encodedMailAddress}${encodedColon}${CHAIN}${baseTailURL}`;

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
};

export const mint = (recipientAddress: string, metaData: any, collectionId: string) => {
    const ENV = 'staging';
    const url = `https://${ENV}.crossmint.com/api/2022-06-09/collections/${collectionId}/nfts`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify({
            recipient: recipientAddress,
            metadata: metaData,
        }),
    };
    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error('error:' + err));
};