export default interface IFriterie {
    id: string;
    name: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    distance?: number;
}