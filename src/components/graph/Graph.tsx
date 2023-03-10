import './graph.scss'
import { getColor } from '../../utils/graph'
import { FC } from 'react'

export const ColumnGraph: FC<GraphFC> = ({data}) => {
    const graphHeight: number = 224
    const maxColumnHeigth: number = 200
    const yLegendDivider: number = 5
    if (!data.length)
    return (
        <></>
    )
    const maxValue: number = Math.max(...data.map(row => row.totalAppearances))
    const numRecords: number = maxValue < yLegendDivider ? maxValue : yLegendDivider
    const portion: number = maxValue / numRecords

    const range = Array.from(Array(numRecords + 1).keys()).map(num => Math.floor(portion * num)).sort((a, b) => b - a)

    const yLegend = range.map((num, index) => {
        return (
            <div className="y-legend-item" key={index + '-y-legend'}>
                <div className="y-value">{num}</div>
                <div className="line"></div>
            </div>
        )
    })

    const graphColumns = data.map((row, index) => {
        const columnHeight = Math.floor((row.totalAppearances * maxColumnHeigth) / maxValue)
        return (
            <div className='x-legend-wrapper' key={index + row.name}>
                <div className="column" style={{ height: columnHeight + 'px', backgroundColor: getColor(index) }}>
                </div>
                <div className="x-legend-item">{row.name}</div>
            </div>
        )
    })
    return (
        <div className="wrapper" >
            <div className="title">Popularity Graph</div>
            <div className="graph" >
                <div className="x-graph-wrapper"  >
                    <div className="columns-wrapper" style={{ height: graphHeight + 'px' }}>
                        {graphColumns}
                    </div>
                </div>
                <div className="y-graph-wrapper" style={{ height: graphHeight + 'px' }}>
                    <div className="y-legend-wrapper">
                        {yLegend}
                    </div>
                </div>
            </div>
        </div>
    )
}