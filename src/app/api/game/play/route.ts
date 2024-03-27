import { NextRequest, NextResponse } from 'next/server';

interface PostParameters {
    uid: string;
}

export const POST = async (req: NextRequest) => {
    const { uid } = (await req.json()) as PostParameters;
    const responseCode = "01";

    return NextResponse.json(responseCode);
};

    // const url = `https://${ENV}.crossmint.com/api/2022-06-09/collections/${COLLECTION_ID}/nfts`;
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         accept: 'application/json',
    //         'content-type': 'application/json',
    //         'x-api-key': API_KEY,
    //     },
    //     body: JSON.stringify({
    //         recipient: recipientAddress,
    //         metadata: {
    //             name: `Crossmint Test NFT ${id}`,
    //             image: imageUrl,
    //             description: 'My first NFT using Crossmint',
    //         },
    //     }),
    // };
    // fetch(url, options)
    //     .then((res) => res.json())
    //     .then((json) => console.log(json))
    //     .catch((err) => console.error('error:' + err));