// useFetch.ts
import apiClientConfig from '@/configs/apiClientConfig'

interface IGetData<T> {
    id?: string
    params?: T
}

export const useFetch = (url: string) => {
    const getData = async <T>({ id, params }: IGetData<T>) => {
        let endpoint = id ? `${url}/${id}` : url

        if (params) {
            const filteredParams = Object.entries(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                params as Record<string, any>
            ).reduce((acc, [key, value]) => {
                if (
                    value !== null &&
                    value !== undefined &&
                    value !== '' &&
                    !(Array.isArray(value) && value.length === 0)
                ) {
                    if (Array.isArray(value)) {
                        value.forEach((val) => {
                            acc.push([key, val.toString()])
                        })
                    } else {
                        acc.push([key, value.toString()])
                    }
                }
                return acc
            }, [] as [string, string][])
            const queryString = new URLSearchParams(filteredParams).toString()
            endpoint = `${endpoint}?${queryString}`
        }
        const response = await apiClientConfig.get(endpoint)
        return response
    }

    return {
        getData,
    }
}
