<template>
    <div class="line_chart"></div>
</template>

<script>
// 引入d3
import * as d3 from 'd3'
import util from '@/util.js'
export default {
    props: ['tooltipDateMode'],
    data () {
        return {
            data: this.initialData,
            width: 600,
            height: 400,
            scaleX: null,
            scaleY: null,
            path: null,
            line: null,
            svg: null,
            xAxis: null,
            gXAxis: null,
            yAxis: null,
            gYAxis: null,
            margin: { top: 20, right: 20, bottom: 30, left: 30 }
        }
    },
    methods: {
        draw () {
            if (this.svg != null) return

            this.svg = d3.select('div.line_chart').append('svg')
                .attr('viewBox', [0, 0, this.width, this.height])
                .style('overflow', 'visible')

            // 定义 X 轴比例尺
            this.scaleX = d3.scaleUtc()
                .domain(d3.extent(this.data.dates))
                .range([this.margin.left, this.width - this.margin.right])

            // 定义 y 轴比例尺
            this.scaleY = d3.scaleLinear()
                .domain([0, d3.max(this.data.series, d => d3.max(d.values))]).nice()
                .range([this.height - this.margin.bottom, this.margin.top])

            this.line = d3.line()
                .defined(d => !isNaN(d))
                .x((d, i) => this.scaleX(this.data.dates[i]))
                .y(d => this.scaleY(d))

            // 绘制 x y 轴
            this.xAxis = g => g
                .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
                .call(d3.axisBottom(this.scaleX).ticks(this.width / 80).tickSizeOuter(0))
            this.yAxis = g => g
                .attr('transform', `translate(${this.margin.left},0)`)
                .call(d3.axisLeft(this.scaleY))
                .call(g => g.select('.domain').remove())
                .call(g => g.append('text')
                    .attr('x', 0)
                    .attr('y', this.margin.top)
                    .attr('fill', 'currentColor')
                    .attr('text-anchor', 'start')
                    .text(this.data.y))
            this.gXAxis = this.svg.append('g')
                .call(this.xAxis)
            this.gYAxis = this.svg.append('g')
                .call(this.yAxis)

            this.path = this.svg.append('g')
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-width', 1.5)
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .selectAll('path')
                .data(this.data.series)
                .join('path')
                .style('mix-blend-mode', 'multiply')
                .attr('d', d => this.line(d.values))

            this.hover()
        },
        resetData (newData) {
            if (newData != null && this.data !== newData) {
                this.data = newData
                if (this.svg != null) {
                    this.update()
                } else {
                    this.draw()
                }
            }
        },
        update () {
            this.scaleX.domain(d3.extent(this.data.dates))
            this.scaleY.domain([0, d3.max(this.data.series, d => d3.max(d.values))])

            this.line = d3.line()
                .defined(d => !isNaN(d))
                .x((d, i) => this.scaleX(this.data.dates[i]))
                .y(d => this.scaleY(d))

            const t = this.svg.transition().duration(750)
            this.xAxis = g => g
                .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
                .call(d3.axisBottom(this.scaleX).ticks(this.width / 80).tickSizeOuter(0))
            this.yAxis = g => g
                .attr('transform', `translate(${this.margin.left},0)`)
                .call(d3.axisLeft(this.scaleY))
                .call(g => g.select('.domain').remove())
            this.gXAxis.transition(t).call(this.xAxis)
            this.gYAxis.transition(t).call(this.yAxis)
            // this.path.data(this.data.series).transition(t).attr('d', d => this.line(d.values))
            this.path.data(this.data.series).join(
                enter => enter.append('path')
                    .style('mix-blend-mode', 'multiply'),
                update => update,
                exit => exit.call(path => path.remove()
                    .attr('fill-opacity', 0))
            ).call(path => path.transition(t)
                .attr('d', d => this.line(d.values)))
        },
        hover () {
            let that = this
            if ('ontouchstart' in document) {
                this.svg
                    .style('-webkit-tap-highlight-color', 'transparent')
                    .on('touchmove', moved)
                    .on('touchstart', entered)
                    .on('touchend', left)
            } else {
                this.svg
                    .on('mousemove', moved)
                    .on('mouseenter', entered)
                    .on('mouseleave', left)
            }

            const dot = this.svg.append('g')
                .attr('display', 'none')

            dot.append('circle')
                .attr('r', 2.5)
                .attr('fill', 'red')

            dot.append('text')
                .attr('class', 'first_line')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 10)
                .attr('text-anchor', 'middle')
                .attr('font-weight', 'bold')
                .attr('y', -32)
            dot.append('text')
                .attr('class', 'second_line')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 10)
                .attr('text-anchor', 'middle')
                .attr('font-weight', 'bold')
                .attr('y', -20)
            dot.append('text')
                .attr('class', 'third_line')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 10)
                .attr('text-anchor', 'middle')
                .attr('font-weight', 'bold')
                .attr('y', -8)

            function moved (event) {
                event.preventDefault()
                const pointer = d3.pointer(event, this)
                const xm = that.scaleX.invert(pointer[0])
                const ym = that.scaleY.invert(pointer[1])
                const i = d3.bisectCenter(that.data.dates, xm)
                const s = d3.least(that.data.series, d => Math.abs(d.values[i] - ym))
                that.path.attr('stroke', d => d === s ? null : '#ddd').filter(d => d === s).raise()
                dot.attr('transform', `translate(${that.scaleX(that.data.dates[i])},${that.scaleY(s.values[i])})`)
                dot.select('text.first_line').text(s.name)
                dot.select('text.second_line').text('samples: ' + (s.windowIndexRange[i][1] - s.windowIndexRange[i][0]))
                dot.select('text.third_line').text(util.formatDateByMode(that.data.dates[i], that.tooltipDateMode))
                that.$emit('movedInLineChart', s.windowIndexRange[i])
            }

            function entered () {
                that.path.style('mix-blend-mode', null).attr('stroke', '#ddd')
                dot.attr('display', null)
                that.$emit('enteredInLineChart', null)
            }

            function left () {
                that.path.style('mix-blend-mode', 'multiply').attr('stroke', null)
                dot.attr('display', 'none')
                that.$emit('leftInLineChart', null)
            }
        }
    },
    mounted () {
    }
}
</script>
