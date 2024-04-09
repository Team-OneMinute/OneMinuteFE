export const LoginStatus = {
    Login: 0,
    Logout: 1,
    Connecting: 2,
} as const;

export type LoginStatus = (typeof LoginStatus)[keyof typeof LoginStatus];

export const displayLabel = (name: LoginStatus): string => {
    switch (name) {
        case 0:
            return 'Login';
        case 1:
            return 'Logout';
        case 2:
            return 'Connecting';
    }
};
