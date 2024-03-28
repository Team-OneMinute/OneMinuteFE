export const play = async (uid: string, gameId: string) => {
    const response = await fetch('/api/game/play', {
        method: 'POST',
        body: JSON.stringify({
            uid: uid,
            gameId: gameId,
        }),
    });
    console.log(response);
    return await response.json().then((value) => {
        //console.log(value);
        return value;
    });
};
