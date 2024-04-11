// utils
import { emailUrlEncode } from '@/app/utils/emailUrlEncode';

const apiKey = process.env.CROSSMINT_CLIENT_API_KEY;

export const getMyNft = (mailAddress: string) => {
    if (!apiKey) {
        throw new Error('failed to load env in getMyNft');
    }
    const chain = 'zkatana';
    const baseHeadURL = 'https://staging.crossmint.com/api/2022-06-09/wallets/';
    const baseTailURL = '/nfts?page=1&perPage=20';
    const encodedColon = '%3A';
    const encodedMailAddress = emailUrlEncode(mailAddress);

    const encodedPath = `${baseHeadURL}email${encodedColon}${encodedMailAddress}${encodedColon}${chain}${baseTailURL}`;

    const options = {
        method: 'GET',
        headers: {
            'X-API-KEY': apiKey,
        },
    };

    fetch(encodedPath, options)
        .then((response) => response.json())
        .then((response) => {
            return response;
        })
        .catch((err) => console.error(err));
};
