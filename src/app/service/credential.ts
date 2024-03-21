// TODO: change credential name
// 情報取得
export const getCredentialStorage = (): UserCredential | undefined => {
    const temp = sessionStorage.getItem('credential');
    if (temp != null) {
        return JSON.parse(temp) as UserCredential;
    }
    return;
};

// 編集・追加
export const setCredentialStorage = (credentialData: UserCredential) => {
    const temp = JSON.stringify(credentialData);
    sessionStorage.setItem('credential', temp);
};

// 削除
export const removeCredentialStorage = () => {
    sessionStorage.removeItem('credential');
};
