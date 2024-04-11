// util
import { emailUrlEncode } from '@/app/utils/emailUrlEncode';

const apiKey = process.env.CROSSMINT_SERVER_API_KEY;

export const fetchNft = async (email: string) => {
    if (!apiKey) {
        throw new Error('failed to load env in fetchNft');
    }
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
            'X-API-KEY': apiKey,
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
