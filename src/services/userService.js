import axios from "axios"

class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_BACKEND_URL}/users`
        });

        this.api.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken'); //'reviewToken' ??
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }
            return config;
        });
    };

    getUsers() {
        return this.api
            .get('/')
            .then(({ data }) => data)
            .catch(err => console.error(err))
    };

    getUser(id) {
        return this.api
        .get(`/${id}`)
        .then(({ data }) => data)
        .catch(err => console.error(err))
    };

    /*createReview(body) {
        return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
    }; 
    */

    editUser(id, body) { // Anteriormente (id, user) !!!!
        return this.api
        .put(`/${id}`, body) // Anteriormente (`/edit/${id}`, user) !!!!
        .then(({ data }) => data)
        .catch(err => console.error(err))
    };

    deleteUser(id, user) {
        return this.api
        .delete(`/${id}`, user)
        .then(({ data }) => data)
        .catch(err => console.error(err))
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

const userService = new UserService();
export default userService;