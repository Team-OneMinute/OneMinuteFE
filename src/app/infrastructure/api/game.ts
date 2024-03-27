export const play = async (uid: string) => {
    const response = await fetch('/api/game/play', {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
        }),
    });
    console.log(response);
    return response.json().then((value) => {
        //console.log(value);
        return value;
    });
};
