import React, { useState, useEffect } from 'react'
import CandleStickChart from '@/components/Chart/CandleStickChart/CandleStickChart'
import { useFetch } from '@/hooks/useFetch'
import { STOCK_ENDPOINT } from '@/constants/ApiEndpointConstant'

interface CandlestickData {
    date: Date
    open: number
    high: number
    low: number
    close: number
    volume: number
}

const ChartPage: React.FC = () => {
    const [data, setData] = useState<CandlestickData[]>([])
    const { getData } = useFetch(STOCK_ENDPOINT.INTRADAY)

    useEffect(() => {
        const fetchData = async () => {
            // const url =
            //     'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo'

            try {
                const response = await getData({
                    params: {
                        function: 'TIME_SERIES_INTRADAY',
                        symbol: 'IBM',
                        interval: '5min',
                        apikey: import.meta.env.VITE_ALPHA_API_KEY,
                    },
                })
                const timeSeries = response.data['Time Series (5min)']

                const chartData: CandlestickData[] = Object.keys(
                    timeSeries
                ).map((date) => ({
                    date: new Date(date),
                    open: parseFloat(timeSeries[date]['1. open']),
                    high: parseFloat(timeSeries[date]['2. high']),
                    low: parseFloat(timeSeries[date]['3. low']),
                    close: parseFloat(timeSeries[date]['4. close']),
                    volume: parseFloat(timeSeries[date]['5. volume']),
                }))

                setData(chartData)
            } catch (error) {
                console.error('Error fetching the data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="App">
            <h1>IBM Intraday Candlestick Chart</h1>
            {data.length > 0 ? (
                <CandleStickChart data={data} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default ChartPage
