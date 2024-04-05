// infrastructure
import { getMyNft } from '@/app/infrastructure/crossmint/nft';
import { mintNft } from '@/app/infrastructure/api/nft';

export const selectCharacter = async (uid: string, walletAddress: string, id: string) => {
    const imageUrl = getCharacterImageUrl(id);
    const result = await mintNft(uid, walletAddress, imageUrl);
    return result;
};

const getCharacterImageUrl = (id: string) => {
    switch (id) {
        case '0':
            return 'https://firebasestorage.googleapis.com/v0/b/oneminutes-53fb9.appspot.com/o/NFT%2FBlueGirl.png?alt=media&token=5579fd31-709d-4e36-b205-87f622f35e37';
        case '1':
            return 'https://firebasestorage.googleapis.com/v0/b/oneminutes-53fb9.appspot.com/o/NFT%2FGreenGirl.png?alt=media&token=01403467-c40a-4a39-825c-5e12018e1fac';
        case '2':
            return 'https://firebasestorage.googleapis.com/v0/b/oneminutes-53fb9.appspot.com/o/NFT%2FOrangeGirl.png?alt=media&token=84c76195-f5d0-4284-8136-2a5be55acfca';
        case '3':
            return 'https://firebasestorage.googleapis.com/v0/b/oneminutes-53fb9.appspot.com/o/NFT%2FPinkGirl.png?alt=media&token=4cf81153-07c3-4010-9ca0-97a9a4e5303f';
        default:
            return 'https://picsum.photos/400'; // TODO: 通常あり得ないルートなので、厳密性チェックを入れる
    }
};

export const getMyCharacter = (mailAddress: string) => {    
    return getMyNft(mailAddress);
};
