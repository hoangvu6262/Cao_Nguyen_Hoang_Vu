/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
    ema,
    discontinuousTimeScaleProviderBuilder,
    Chart,
    ChartCanvas,
    CurrentCoordinate,
    BarSeries,
    CandlestickSeries,
    LineSeries,
    MovingAverageTooltip,
    OHLCTooltip,
    lastVisibleItemBasedZoomAnchor,
    XAxis,
    YAxis,
    CrossHairCursor,
    EdgeIndicator,
    MouseCoordinateY,
    ZoomButtons,
} from 'react-financial-charts'
import { timeFormat } from 'd3-time-format'
import { format } from 'd3-format'

interface CandlestickData {
    date: Date
    open: number
    high: number
    low: number
    close: number
    volume: number
    ema12?: number // Will be calculated and assigned later
    ema26?: number
}

interface CandleStickChartProps {
    data: CandlestickData[]
}

const CandleStickChart: React.FC<CandleStickChartProps> = ({ data }) => {
    const ScaleProvider =
        discontinuousTimeScaleProviderBuilder().inputDateAccessor(
            (d) => new Date(d.date)
        )
    const height = 700
    const width = 1200
    const margin = { left: 0, right: 48, top: 0, bottom: 24 }

    const ema12 = ema()
        .id(1)
        .options({ windowSize: 12 })
        .merge((d: CandlestickData, c: number) => {
            d.ema12 = c
        })
        .accessor((d: CandlestickData) => d.ema12)

    const ema26 = ema()
        .id(2)
        .options({ windowSize: 26 })
        .merge((d: CandlestickData, c: number) => {
            d.ema26 = c
        })
        .accessor((d: CandlestickData) => d.ema26)

    const {
        data: chartData,
        xScale,
        xAccessor,
        displayXAccessor,
    } = ScaleProvider(data)
    const pricesDisplayFormat = format('.2f')
    const max = xAccessor(chartData[chartData.length - 1])
    const min = xAccessor(chartData[Math.max(0, chartData.length - 100)])
    const xExtents = [min, max + 5]

    const gridHeight = height - margin.top - margin.bottom

    const elderRayHeight = 100
    const barChartHeight = gridHeight / 4
    const barChartOrigin = (_: any, h: number) => [
        0,
        h - barChartHeight - elderRayHeight,
    ]
    const chartHeight = gridHeight - elderRayHeight

    const barChartExtents = (chartData: CandlestickData) => {
        return chartData.volume
    }

    const candleChartExtents = (chartData: CandlestickData) => {
        return [chartData.high, chartData.low]
    }

    const yEdgeIndicator = (chartData: CandlestickData) => {
        return chartData.close
    }

    const volumeColor = (chartData: CandlestickData) => {
        return chartData.close > chartData.open
            ? 'rgba(38, 166, 154, 0.3)'
            : 'rgba(239, 83, 80, 0.3)'
    }

    const volumeSeries = (chartData: CandlestickData) => {
        return chartData.volume
    }

    const openCloseColor = (chartData: CandlestickData) => {
        return chartData.close > chartData.open ? '#26a69a' : '#ef5350'
    }

    return (
        <ChartCanvas
            height={height}
            ratio={3}
            width={width}
            margin={margin}
            data={chartData}
            displayXAccessor={displayXAccessor}
            seriesName="IBM"
            xScale={xScale}
            xAccessor={xAccessor}
            xExtents={xExtents}
            zoomAnchor={lastVisibleItemBasedZoomAnchor}
        >
            <Chart id={1} yExtents={(d: CandlestickData) => [d.high, d.low]}>
                <XAxis
                    axisAt="bottom"
                    orient="bottom"
                    ticks={6}
                    tickFormat={timeFormat('%H:%M')}
                />
                <YAxis
                    axisAt="left"
                    orient="left"
                    ticks={5}
                    tickFormat={format('.2f')}
                />
                <CandlestickSeries />
            </Chart>
            <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
                <XAxis showGridLines showTickLabel={false} />
                <YAxis showGridLines tickFormat={pricesDisplayFormat} />
                <CandlestickSeries />
                <LineSeries
                    yAccessor={ema26.accessor()}
                    strokeStyle={ema26.stroke()}
                />
                <CurrentCoordinate
                    yAccessor={ema26.accessor()}
                    fillStyle={ema26.stroke()}
                />
                <LineSeries
                    yAccessor={ema12.accessor()}
                    strokeStyle={ema12.stroke()}
                />
                <CurrentCoordinate
                    yAccessor={ema12.accessor()}
                    fillStyle={ema12.stroke()}
                />
                <MouseCoordinateY
                    rectWidth={margin.right}
                    displayFormat={pricesDisplayFormat}
                />
                <EdgeIndicator
                    itemType="last"
                    rectWidth={margin.right}
                    fill={openCloseColor}
                    lineStroke={openCloseColor}
                    displayFormat={pricesDisplayFormat}
                    yAccessor={yEdgeIndicator}
                />
                <MovingAverageTooltip
                    origin={[8, 24]}
                    options={[
                        {
                            yAccessor: ema26.accessor(),
                            type: 'EMA',
                            stroke: ema26.stroke(),
                            windowSize: ema26.options().windowSize,
                        },
                        {
                            yAccessor: ema12.accessor(),
                            type: 'EMA',
                            stroke: ema12.stroke(),
                            windowSize: ema12.options().windowSize,
                        },
                    ]}
                />

                <ZoomButtons />
                <OHLCTooltip origin={[8, 16]} />
            </Chart>
            <Chart
                id={2}
                height={barChartHeight}
                origin={barChartOrigin}
                yExtents={barChartExtents}
            >
                <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
            </Chart>
            <CrossHairCursor />
        </ChartCanvas>
    )
}

export default CandleStickChart
