import axios from "axios"

class KnowledgeService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_BACKEND_URL}/knowledges`
        });

        this.api.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }
            return config;
        });
    };

    getKnowledges() {
        return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
    };

    getKnowledge(id) {
        return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
    };

    createKnowledge(body) {
        return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
    };

    editKnowledge(id, body) {
        return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
    };

    deleteKnowledge(id) {
        return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
    };

  // async getKnowledges2() {
  //   try {
  //     const response = await this.api.get('/');
  //     return response.data
  //   } catch (error) {
  //     console.error(err)
  //   }
  // }

};

const knowledgeService = new KnowledgeService();
export default knowledgeService;