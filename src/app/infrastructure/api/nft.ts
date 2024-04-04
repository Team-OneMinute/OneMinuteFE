export const mintNft = async (uid: string, walletAddress: string, imageUrl: string) => {
    const response = await fetch('/api/mint/nft', {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            walletAddress: walletAddress,
            imageURl: imageUrl,
        }),
    });
    console.log(response);
};
