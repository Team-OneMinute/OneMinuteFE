export const mintNft = async (uid: string, walletAddress: string, imageUrl: string) => {
    const response = await fetch('/api/mint/nft', {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            walletAddress: walletAddress,
            imageURl: imageUrl,
        }),
    });
    return await response.json().then((value) => {
        return value;
    });
};
