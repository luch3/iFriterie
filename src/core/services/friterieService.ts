import axios from 'axios';
import IFriterie from '../models/iFriterie';

const API_URL = "https://fakedatatechnocitelucas.azurewebsites.net/api";

class FriterieService {
    public async getAll(): Promise<IFriterie[]> {
        return (await axios.request<IFriterie[]>({url: API_URL + "/GetFriteries"})).data;
    }
}

const friterieService = new FriterieService();
export default friterieService;