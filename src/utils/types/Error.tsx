export default interface Error {
    response: any,
    message: string,
    status: number,
    originalErrObj: any,
}