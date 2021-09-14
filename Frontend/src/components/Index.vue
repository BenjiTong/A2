<template>
    <div>
        <div class="nav-container">
            <div>
                <nav class="bar bar-toggle">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <div class="bar__module">
                                    <router-link to="/">
                                        <img
                                            class="logo logo-dark"
                                            alt="logo"
                                            src="@/assets/img/logo-dark.png"
                                        />
                                        <img
                                            class="logo logo-light"
                                            alt="logo"
                                            src="@/assets/img/logo-light.png"
                                        />
                                    </router-link>
                                </div>
                            </div>
                            <div class="col-6 d-flex justify-content-end">
                                <div class="bar__module">
                                    <div
                                        class="menu-toggle pull-right"
                                        @click="showSideMenu(true)"
                                    >
                                        <i
                                            class="stack-interface stack-menu"
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div
                    class="mask"
                    v-show="isSideMenuShowing"
                    @click.self.stop="showSideMenu(false)"
                ></div>
                <transition name="from-right">
                    <div
                        class="
                            notification
                            pos-right pos-top
                            side-menu
                            bg--white
                        "
                        v-if="isSideMenuShowing"
                        v-on:click.stop="clickWrapper($event)"
                    >
                        <div
                            class="
                                side-menu__module
                                pos-vertical-center
                                text-right
                            "
                        >
                            <ul class="menu-vertical">
                                <li class="h4">{{ usrname }}</li>
                                <li>
                                    <input
                                        type="button"
                                        class="btn"
                                        @click="signout"
                                        value="Signout"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <section>
            <div class="container">
                <div
                    class="
                        masonry-filter-container
                        text-center
                        row
                        justify-content-start
                        align-items-center
                    "
                >
                    <select
                        class="col-2 my-dropdown-menu"
                        v-model="selectedArea"
                    >
                        <option
                            v-for="option in options"
                            v-bind:value="option.value"
                            v-bind:key="option.value"
                        >
                            {{ option.text }}
                        </option>
                    </select>
                    <div class="my-checkbox">
                        <input
                            type="radio"
                            id="year"
                            value="0"
                            v-model="pickedMode"
                            class="col-1"
                        />
                        <label for="year">Year</label>
                        <input
                            type="radio"
                            id="month"
                            value="1"
                            v-model="pickedMode"
                            class="col-1"
                        />
                        <label for="month">Month</label>
                        <input
                            type="radio"
                            id="day"
                            value="2"
                            v-model="pickedMode"
                            class="col-1"
                        />
                        <label for="day">Day</label>
                    </div>
                </div>
                <div class="masonry__container row masonry--active">
                    <div class="masonry__item col-md-4 col-12 filter-filter-1">
                        <my-props-world-map ref="worldMap"></my-props-world-map>
                        <span class="h4 inline-block">World Map</span>
                        <span v-html="descriptionOfWorldMap"></span>
                    </div>
                    <p
                        class="masonry__item col-md-1 col-12 filter-filter-1"
                    ></p>
                    <div class="masonry__item col-md-6 col-12 filter-filter-1">
                        <my-props-line-chart
                            ref="lineChart"
                            :tooltipDateMode="pickedMode"
                            v-on:movedInLineChart="movedInLineChart"
                            v-on:enteredInLineChart="enteredInLineChart"
                            v-on:leftInLineChart="leftInLineChart"
                        ></my-props-line-chart>
                        <span class="h4 inline-block">Line Chart</span>
                        <span>{{ descriptionOfLineChart }}</span>
                    </div>
                </div>
                <div class="row">
                    {{ description }}
                    <div class="link" @click="openAWSRegistry()">
                        Registry of Open Data on AWS
                    </div>
                </div>
            </div>
        </section>
        <my-footer></my-footer>
    </div>
</template>

<script>
import MyFooter from '@/components/Footer'
import MyPropsLineChart from '@/components/PropsMultiLineChart'
import MyPropsWorldMap from '@/components/PropsWorldMap'

export default {
    data: function () {
        return {
            data: [{}, {}, {}],
            /*
            [
                {
                    lineChart: [
                        dayData: null,
                        monthData: null,
                        yearData: null
                    ],
                    allWindows: []
                },
                {
                    lineChart: [
                        dayData: null,
                        monthData: null,
                        yearData: null
                    ]
                },
                {
                    lineChart: [
                        dayData: null,
                        monthData: null,
                        yearData: null
                    ]
                }
            ], */
            isSideMenuShowing: false,
            usrname: '',
            selectedArea: 2,
            pickedMode: -1,
            options: [
                { text: 'China', value: 0 },
                { text: 'New Zealand', value: 1 },
                { text: 'Middle East', value: 2 }
            ],
            adverbs: ['Annual', 'Monthly', 'Daily'],
            descriptionOfWorldMap: '<font color="red">Red</font> rects represent sampled regions',
            description: 'World Bank Nightime Light Data consists of a lot of satellite imagery stored in Amazon Web Services (AWS). Recent files from 2012 to 2020 are generated by the sensor named Visible Infrared Imaging Radiometer Suite Day- Night Band(VIIRS DNB). All these things are stored by Cloud Optimized GeoTIFF(COG) format and organized by Spatial Temporal Asset Catalog(STAC) standard. This project only need the imagery in 3 specific areas, but it is neccessary to process all of them.From them, you can learn the trend of their radiance in the period.It is also a good chance to have a better understanding of ecnomic trend by them.Some researchers also try to find the light pollution by this kind of data.'
        }
    },
    methods: {
        showSideMenu (flag) {
            this.isSideMenuShowing = flag
        },
        clickWrapper (event) {
            event.stopPropagation()
        },
        signout () {
            let storage
            if (this.$global.tokenStorageType === 0) {
                storage = sessionStorage
            } else {
                storage = localStorage
            }
            if (storage.getItem('token')) {
                let api = this.$global.apiHead + '/oauth/quit'
                this.$http.post(api + ('?' + this.$querystring.stringify({
                    token: storage.getItem('token'),
                    state: this.$global.state
                }))).then((response) => {
                    console.log(response.body)
                    storage.removeItem('token')
                    storage.removeItem('usrname')
                    this.$router.push({ name: 'Login' })
                }, (response) => {
                    console.error(response)
                    // this.$router.push({ name: 'Login' })
                })
            } else {
                this.$router.push({ name: 'Login' })
            }
        },
        resolveOriginData (index, originData) {
            if (this.data[index].lineChart != null) return
            let that = this
            let dayMap = new Map()
            let monthMap = new Map()
            let yearMap = new Map()
            originData.forEach(function (d) { // only put windows in dayMap. In monthMap and yearMap just record the number of windows
                let strDay = d.datetime.substr(0, 10)
                let strMonth = strDay.substr(0, 8) + '01'
                let strYear = strMonth.substr(0, 5) + '01-01'
                if (dayMap.has(strDay)) {
                    dayMap.get(strDay).radiance += +d.radiance
                    dayMap.get(strDay).pixels += +d.pixels
                    dayMap.get(strDay).window.push(that.resolveWindowFromStrToArray(d.window))
                } else {
                    let windowArray = that.resolveWindowFromStrToArray(d.window)
                    dayMap.set(strDay, { radiance: +d.radiance, pixels: +d.pixels, window: [windowArray] })
                }
                if (monthMap.has(strMonth)) {
                    monthMap.get(strMonth).radiance += +d.radiance
                    monthMap.get(strMonth).pixels += +d.pixels
                    monthMap.get(strMonth).windowNum += 1
                } else {
                    monthMap.set(strMonth, { radiance: +d.radiance, pixels: +d.pixels, windowNum: 1 })
                }
                if (yearMap.has(strYear)) {
                    yearMap.get(strYear).radiance += +d.radiance
                    yearMap.get(strYear).pixels += +d.pixels
                    yearMap.get(strYear).windowNum += 1
                } else {
                    yearMap.set(strYear, { radiance: +d.radiance, pixels: +d.pixels, windowNum: 1 })
                }
            })

            // sort by key
            dayMap = this.sortMapByKey(dayMap)
            monthMap = this.sortMapByKey(monthMap)
            yearMap = this.sortMapByKey(yearMap)

            let dayData = {
                y: 'radiance / pixels',
                series: [{ name: this.options[index].text, values: [], windowIndexRange: [] }],
                dates: []
            }
            let monthData = {
                y: 'radiance / pixels',
                series: [{ name: this.options[index].text, values: [], windowIndexRange: [] }],
                dates: []
            }
            let yearData = {
                y: 'radiance / pixels',
                series: [{ name: this.options[index].text, values: [], windowIndexRange: [] }],
                dates: []
            }
            let allWindows = []
            let dayWindowIndex = 0
            let monthWindowIndex = 0
            let yearWindowIndex = 0
            dayMap.forEach((value, key) => {
                dayData.dates.push(new Date(key))
                dayData.series[0].values.push(value.radiance / value.pixels)
                value.window.forEach((d) => allWindows.push(d))
                dayData.series[0].windowIndexRange.push([dayWindowIndex, dayWindowIndex + value.window.length])
                dayWindowIndex += value.window.length
            })
            monthMap.forEach((value, key) => {
                monthData.dates.push(new Date(key))
                monthData.series[0].values.push(value.radiance / value.pixels)
                monthData.series[0].windowIndexRange.push([monthWindowIndex, monthWindowIndex + value.windowNum])
                monthWindowIndex += value.windowNum
            })
            yearMap.forEach((value, key) => {
                yearData.dates.push(new Date(key))
                yearData.series[0].values.push(value.radiance / value.pixels)
                yearData.series[0].windowIndexRange.push([yearWindowIndex, yearWindowIndex + value.windowNum])
                yearWindowIndex += value.windowNum
            })
            this.data[index].lineChart = [yearData, monthData, dayData]
            this.data[index].allWindows = allWindows
            // console.log(this.data[index])
            if (this.selectedArea === index) {
                this.resetData(this.selectedArea)
            }
        },
        resetData () {
            if (this.pickedMode >= 0 && this.data[this.selectedArea].lineChart != null) {
                this.$refs.lineChart.resetData(this.data[this.selectedArea].lineChart[this.pickedMode])
            }
        },
        sortMapByKey (originMap) {
            let originArray = Array.from(originMap)
            // console.log('before sort ' + originArray)
            originArray.sort(function compare (a, b) {
                if (a[0] < b[0]) {
                    return -1
                }
                if (a[0] > b[0]) {
                    return 1
                }
                return 0
            })
            // console.log('after sort ' + originArray)
            return new Map(originArray.map(d => [d[0], d[1]]))
        },
        resolveWindowFromStrToArray (strWindow) {
            let tempArray = strWindow.slice(1, -1).split(', ')
            return [[+tempArray[0], +tempArray[1]], [+tempArray[2], +tempArray[3]]]
        },
        enteredInLineChart () {
            // console.log('enteredInLineChart ')
            this.$refs.worldMap.showRects2(true)
        },
        leftInLineChart () {
            // console.log('leftInLineChart ')
            this.$refs.worldMap.showRects2(false)
        },
        movedInLineChart (indexRange) {
            // console.log('movedInLineChart ' + indexRange)
            this.$refs.worldMap.drawRects2(this.data[this.selectedArea].allWindows.slice(indexRange[0], indexRange[1]))
        },
        openAWSRegistry () {
            window.open('https://registry.opendata.aws/wb-light-every-night/')
        }
    },
    watch: {
        selectedArea: function (val) {
            // console.log('selectedArea ' + val)
            this.resetData()
        },
        pickedMode: function (val) {
            // console.log('pickedMode ' + val)
            this.resetData()
        }
    },
    computed: {
        descriptionOfLineChart: function () {
            if (this.pickedMode > 0) {
                return this.adverbs[this.pickedMode] + ' radiance / pixels in ' + this.options[this.selectedArea].text
            } else {
                return null
            }
        }
    },
    mounted () {
        this.$http.get('/awselb/city?id=2').then((response) => {
            console.log(response.body)
            this.resolveOriginData(2, response.body)
        }, (response) => {
            console.error(response)
        })
        this.$http.get('/awselb/city?id=1').then((response) => {
            console.log(response.body)
            this.resolveOriginData(1, response.body)
        }, (response) => {
            console.error(response)
        })
        this.$http.get('/awselb/city?id=0').then((response) => {
            console.log(response.body)
            this.resolveOriginData(0, response.body)
        }, (response) => {
            console.error(response)
        })

        let storage
        if (this.$global.tokenStorageType === 0) {
            storage = sessionStorage
        } else {
            storage = localStorage
        }
        this.usrname = storage.getItem('usrname')
    },
    components: {
        MyFooter,
        MyPropsLineChart,
        MyPropsWorldMap
    }
}
</script>

<style scoped>
.from-right-enter-active {
    animation: from-right 0.3s linear 0s forwards;
}
.from-right-leave-active {
    animation: from-right 0.3s linear 0s reverse;
}
@keyframes from-right {
    from {
        transform: translate3d(100%, 0, 0);
        -webkit-transform: translate3d(100%, 0, 0);
        opacity: 1;
    }
    to {
        transform: translate3d(0, 0, 0);
        -webkit-transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

.mask {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
    transition: all 0.2s ease-in;
}

.my-dropdown-menu {
    display: inline-block;
    cursor: pointer;
    position: relative;
    z-index: 9;
}

.my-checkbox {
    padding-left: 1%;
}

.link:hover,
.server-table i.el-tooltip:hover {
    cursor: pointer;
    color: #409eff;
}
</style>
