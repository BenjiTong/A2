<template>
    <svg viewBox="0 0 ${width} ${height}" style="display: block">
        <defs>
            <path id="outline" d="${path(outline)}" />
            <clipPath id="clip"><use v-bind:xlink:href="outline" /></clipPath>
        </defs>
        <g :clip-path="clipPathUrl">
            <use v-bind:xlink:href="outline" fill="#fff" />
            <path d="${path(graticule)}" stroke="#ccc" fill="none"></path>
            <path d="${path(land)}"></path>
        </g>
        <use v-bind:xlink:href="outline" fill="none" stroke="#000" />
    </svg>
</template>

<script>
// 引入d3
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import world from '@/assets/json/land-50m.json'
export default {
    data () {
        return {
            data: {
                y: 'xxx',
                series: [{ name: 'n1', values: [2.3, 2.4, 2.5, 2.6, 2.7] }, { name: 'n2', values: [0.6, 2.4, 2.5, 2.6, 2.3] }, { name: 'n3', values: [2.1, 2.3, 2.7, 2.6, 2.1] }],
                dates: [new Date('2000-01-01'), new Date('2000-02-01'), new Date('2000-03-01'), new Date('2000-04-01'), new Date('2000-05-01')]
            },
            width: 600,
            margin: { top: 20, right: 20, bottom: 30, left: 30 },
            outline: { type: 'Sphere' },
            projection: d3.geoEqualEarth(),
            graticule: d3.geoGraticule10(),
            // eslint-disable-next-line no-template-curly-in-string
            clipPathUrl: 'url(${new URL("#clip", location)})'
        }
    },
    methods: {
        draw () {
        }
    },
    computed: {
        height: function () {
            const [[x0, y0], [x1, y1]] = d3.geoPath(this.projection.fitWidth(this.width, this.outline)).bounds(this.outline)
            const dy = Math.ceil(y1 - y0)
            const l = Math.min(Math.ceil(x1 - x0), dy)
            this.projection.scale(this.projection.scale() * (l - 1) / l).precision(0.2)
            return dy
        },
        path: function () {
            return d3.geoPath(this.projection)
        },
        land: function () {
            return topojson.feature(world, world.objects.land)
        }
    },
    mounted () {
        this.draw()
    }
}
</script>
