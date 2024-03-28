// utils
import { emailUrlEncode } from '@/app/utils/emailUrlEncode';

export const mintNft = async (id: string, email: string, imageUrl: string) => {
    const response = await fetch('/api/mint/nft', {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            email: email,
            imageUrl: imageUrl,
        }),
    });
    // const data = response.json().then((value) => {
    //     console.log(value);
    // });
};

export const getMyNft = (mailAddress: string) => {
    const apiKey =
        'ck_staging_5ixm3ij57utqcHuAKtiWyJEbFgZUnbd91xHKbB7cEVX5CpPz7dF6H6xGvxbjpX7Tn1yAB67fdEev2fEfRhzBRPWtuVAKLtbvBkH9d9rgv7ChKf8QM6dHsQuw1CTUfsByUEi4Zh6cfm76GCxVJHM23pSxHFp7Dv7QoqwVSn8EMAWPi1CZ5kHdcBitUHxUunHzpv5v32oKenHxfzpw7jk8s8jc';
    const chain = 'zkatana';
    const baseHeadURL = 'https://staging.crossmint.com/api/2022-06-09/wallets/';
    const baseTailURL = '/nfts?page=1&perPage=20';
    const encodedColon = '%3A';
    const encodedMailAddress = emailUrlEncode(mailAddress);

    const encodedPath = `${baseHeadURL}email${encodedColon}${encodedMailAddress}${encodedColon}${chain}${baseTailURL}`;
    //const fullPathBeforeEncode = `${baseHeadURL}email:${encodedMailAddress}:${chain}${baseTailURL}`;

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
