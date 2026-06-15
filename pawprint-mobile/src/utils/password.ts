export function isValidPassword(password: string) {
    return (
        password.length >= 8 &&
        /\d/.test(password)
    );
}