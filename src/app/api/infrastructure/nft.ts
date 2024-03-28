import { mint } from '@/app/api/infrastructure/crossmint/nft/nft';
const CHAIN = 'zkatana';
export const mintNft = (email: string, imageUrl: string, nftName: string, description: string, collectionId: string) => {
    const recipientAddress = `email:${email}:${CHAIN}`;
    const metaData = {
        name: nftName,
        image: imageUrl,
        description: description,
    };
    mint(recipientAddress, metaData, collectionId);
};
