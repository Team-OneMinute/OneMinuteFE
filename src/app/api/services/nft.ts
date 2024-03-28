// infrastructure
import { mintNft } from '@/app/api/infrastructure/nft';

export const mintCharacterNft = (email: string, imageUrl: string) => {
    // TODO: into const file
    const nftName = 'One Minute Character NFT';
    const description = 'One Minute Character NFT Description'; 
    const COLLECTION_ID = '1b9cd598-90aa-4cdf-86b8-a0479c5a1ad2';
    mintNft(email, imageUrl, nftName, description, COLLECTION_ID);
};