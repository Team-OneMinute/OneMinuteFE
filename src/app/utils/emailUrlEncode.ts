export const emailUrlEncode = (mail: string) => {
    const splitStr = mail.split('@');
    const encodedMailAddress = splitStr[0] + '%40' + splitStr[1];
    return encodedMailAddress;
};
