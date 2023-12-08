import axios from "axios"

class ReviewService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_BACKEND_URL}/reviews`
        });

        this.api.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken'); //'reviewToken' ??
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }
            return config;
        });
    };

    getReviews() {
        return this.api.get('/').then(({ data }) => data).catch(err => console.error(err))
    };

    getReview(id) {
        return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
    };

    createReview(body) {
        return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
    };

    editReview(id, body) {
        return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
    };

    deleteReview(id) {
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

const reviewService = new ReviewService();
export default reviewService;