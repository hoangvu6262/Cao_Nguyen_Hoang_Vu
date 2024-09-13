import axios from 'axios'
import { BASE_URL } from '@/constants/ApiEndpointConstant'
import { STATUS_CODE_RESPONE } from '@/constants/StatusResConstant'

const apiClientConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

apiClientConfig.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiClientConfig.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (
            error.response.status === STATUS_CODE_RESPONE.UNAUTHRIZED &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true
        }
        return Promise.reject(error)
    }
)

export default apiClientConfig
