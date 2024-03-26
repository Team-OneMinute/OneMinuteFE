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
