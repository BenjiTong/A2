<template>
    <div class="world_map"></div>
</template>

<script>
// 引入d3
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import world from '@/assets/json/world-atlas-110m.json'
export default {
    data () {
        return {
            dataRects: [[[108.990515, 20.319485], [130.478558, 40.992357]], [[163.888049, -52.621956], [180, -31.69433]], [[35.991737, 24.828731], [72.78633, 39.298213]]],
            width: 800,
            margin: { top: 20, right: 20, bottom: 30, left: 30 },
            outline: { type: 'Sphere' },
            projection: d3.geoMercator().rotate([257, 0]).fitSize([this.width, this.height], { type: 'Sphere' }),
            graticule: d3.geoGraticule10(),
            // eslint-disable-next-line no-template-curly-in-string
            clipPathUrl: 'url(${new URL("#clip", location)})',
            svg: null,
            gRects: null
        }
    },
    methods: {
        draw () {
            if (this.svg != null) return
            this.svg = d3.select('div.world_map').append('svg')
                .style('display', 'block')
                .attr('viewBox', [0, 0, this.width, this.height])

            const defs = this.svg.append('defs')

            defs.append('path')
                .attr('id', 'outline')
                .attr('d', this.path(this.outline))

            defs.append('clipPath')
                .attr('id', 'clip')
                .append('use')
                .attr('xlink:href', new URL('#outline', location))

            const g = this.svg.append('g')
                .attr('clip-path', `url(${new URL('#clip', location)})`)

            g.append('path')
                .attr('fill', 'none')
                .attr('stroke', '#dddddd')
                .attr('d', this.path(this.graticule))

            g.append('path')
                .attr('d', this.path(this.land))
                .attr('fill', '#f4f4f4')

            g.append('path')
                .attr('d', this.path(this.countries))
                .attr('stroke', '#aaaaaa')
                .attr('fill', 'none')

            this.gRects = g.append('g').attr('class', 'rects')

            this.svg.append('use')
                .attr('xlink:href', new URL('#outline', location))
                .attr('fill', 'none')
                .attr('stroke', '#000')
        },
        drawRects () {
            let projectedDataRects = this.dataRects.map(d => [this.projection([d[0][0], d[1][1]]), this.projection([d[1][0], d[0][1]])])
            console.log(this.projection(this.dataRects[0][0]))
            console.log(this.dataRects)
            console.log(projectedDataRects)
            this.gRects.selectAll('foo')
                .data(projectedDataRects)
                .enter()
                .append('rect')
                .attr('x', d => d[0][0])
                .attr('y', d => d[0][1])
                .attr('width', d => d[1][0] - d[0][0])
                .attr('height', d => d[1][1] - d[0][1])
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-width', 3)
        }
    },
    computed: {
        height: function () {
            const [[x0, y0], [x1, y1]] = d3.geoPath(this.projection.fitWidth(this.width, this.outline)).bounds(this.outline)
            const dy = Math.ceil(y1 - y0)
            const l = Math.min(Math.ceil(x1 - x0), dy)
            this.projection.scale(this.projection.scale() * (l - 1) / l).precision(0.2)
            return dy

            // return Math.round((210 / 400) * this.width)
        },
        path: function () {
            return d3.geoPath(this.projection)
        },
        land: function () {
            return topojson.feature(world, world.objects.land)
        },
        countries: function () {
            return topojson.feature(world, world.objects.countries)
        }
    },
    mounted () {
        this.draw()
        this.drawRects()
    }
}
</script>
