export const getSmartWalletAddress = async (uid: string) => {
    const response = await fetch(`/api/wallet/smartwallet?uid=${uid}`);
    return await response.json().then((value) => {
        return value;
    });
};
