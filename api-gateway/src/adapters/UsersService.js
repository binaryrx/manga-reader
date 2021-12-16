import Axios from 'axios';

const USERS_SERVICE_URI = "http://users-service:7102";

export default class UsersService {
    static async createUser({ email, password, name }) {
        const { data } = await Axios.post(`${USERS_SERVICE_URI}/users`, {
            email,
            password,
            name,
        })

        return data
    }

    static async fetchUser({ user_id }) {
        const { data } = await Axios.get(`${USERS_SERVICE_URI}/users/${user_id}`)

        return data
    }

    static async createUserSession({ email, password }) {
        const { data } = await Axios.post(`${USERS_SERVICE_URI}/sessions`, {
            email,
            password,
        })

        return data
    }

    static async deleteUserSession({ session_id }) {
        const { data } = await Axios.delete(`${USERS_SERVICE_URI}/sessions/${session_id}`)

        return data
    }

    static async fetchUserSession({ session_id }) {
        const { data } = await Axios.get(`${USERS_SERVICE_URI}/sessions/${session_id}`)

        return data
    }


    static async fetchUserFavorites({user_id}) {
        const { data } = await Axios.get(`${USERS_SERVICE_URI}/favorites/${user_id}`);

        return data
    }


    static async createUserFavorite({ user_id, manga_id}) {
        const { data } = await Axios.post(`${USERS_SERVICE_URI}/favorites/${user_id}/${manga_id}`);

        return data;
    }

    static async deleteUserFavorite({ user_id, manga_id }) {
        const { data } = await Axios.delete(`${USERS_SERVICE_URI}/favorites/${user_id}/${manga_id}`)
        
        return data;
    }

}