webpackJsonp([1],{0:function(t,e){},"4Zy+":function(t,e){},Bdqv:function(t,e){},Ch8T:function(t,e){},GnYM:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var s=n("VU/8")({name:"app"},i,!1,function(t){n("4Zy+")},null,null).exports,r=n("/ocq"),o=n("ifoU"),l=n.n(o),c={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("footer",{staticClass:"footer-7 text-center-xs"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-6"},[e("span",{staticClass:"type--fine-print"},[this._v("© "),e("span",{staticClass:"update-year"}),this._v(" A2Inc — All Rights\n                    Reserved")])])])])])}]},d=n("VU/8")(null,c,!1,null,null,null).exports,u=n("vRTy"),h={props:["initialData"],data:function(){return{data:this.initialData,width:600,height:400,scaleX:null,scaleY:null,path:null,line:null,svg:null,xAxis:null,gXAxis:null,yAxis:null,gYAxis:null,margin:{top:20,right:20,bottom:30,left:30}}},methods:{draw:function(){var t=this;null==this.svg&&(this.svg=u.m("div.line_chart").append("svg").attr("viewBox",[0,0,this.width,this.height]).style("overflow","visible"),this.scaleX=u.l().domain(u.d(this.data.dates)).range([this.margin.left,this.width-this.margin.right]),this.scaleY=u.k().domain([0,u.g(this.data.series,function(t){return u.g(t.values)})]).nice().range([this.height-this.margin.bottom,this.margin.top]),this.line=u.f().defined(function(t){return!isNaN(t)}).x(function(e,n){return t.scaleX(t.data.dates[n])}).y(function(e){return t.scaleY(e)}),this.xAxis=function(e){return e.attr("transform","translate(0,"+(t.height-t.margin.bottom)+")").call(u.a(t.scaleX).ticks(t.width/80).tickSizeOuter(0))},this.yAxis=function(e){return e.attr("transform","translate("+t.margin.left+",0)").call(u.b(t.scaleY)).call(function(t){return t.select(".domain").remove()}).call(function(e){return e.append("text").attr("x",0).attr("y",t.margin.top).attr("fill","currentColor").attr("text-anchor","start").text(t.data.y)})},this.gXAxis=this.svg.append("g").call(this.xAxis),this.gYAxis=this.svg.append("g").call(this.yAxis),this.path=this.svg.append("g").attr("fill","none").attr("stroke","steelblue").attr("stroke-width",1.5).attr("stroke-linejoin","round").attr("stroke-linecap","round").selectAll("path").data(this.data.series).join("path").style("mix-blend-mode","multiply").attr("d",function(e){return t.line(e.values)}),this.hover())},resetData:function(t){null!=t&&this.data!==t&&(this.data=t,null!=this.svg?this.update():this.draw())},update:function(){var t=this;this.scaleX.domain(u.d(this.data.dates)),this.scaleY.domain([0,u.g(this.data.series,function(t){return u.g(t.values)})]),this.line=u.f().defined(function(t){return!isNaN(t)}).x(function(e,n){return t.scaleX(t.data.dates[n])}).y(function(e){return t.scaleY(e)});var e=this.svg.transition().duration(750);this.xAxis=function(e){return e.attr("transform","translate(0,"+(t.height-t.margin.bottom)+")").call(u.a(t.scaleX).ticks(t.width/80).tickSizeOuter(0))},this.yAxis=function(e){return e.attr("transform","translate("+t.margin.left+",0)").call(u.b(t.scaleY)).call(function(t){return t.select(".domain").remove()})},this.gXAxis.transition(e).call(this.xAxis),this.gYAxis.transition(e).call(this.yAxis),this.path.data(this.data.series).join(function(t){return t.append("path").style("mix-blend-mode","multiply")},function(t){return t},function(t){return t.call(function(t){return t.remove().attr("fill-opacity",0)})}).call(function(n){return n.transition(e).attr("d",function(e){return t.line(e.values)})})},hover:function(){var t=this;"ontouchstart"in document?this.svg.style("-webkit-tap-highlight-color","transparent").on("touchmove",n).on("touchstart",a).on("touchend",i):this.svg.on("mousemove",n).on("mouseenter",a).on("mouseleave",i);var e=this.svg.append("g").attr("display","none");function n(n){n.preventDefault();var a=u.h(n,this),i=t.scaleX.invert(a[0]),s=t.scaleY.invert(a[1]),r=u.c(t.data.dates,i),o=u.e(t.data.series,function(t){return Math.abs(t.values[r]-s)});t.path.attr("stroke",function(t){return t===o?null:"#ddd"}).filter(function(t){return t===o}).raise(),e.attr("transform","translate("+t.scaleX(t.data.dates[r])+","+t.scaleY(o.values[r])+")"),e.select("text").text(o.name)}function a(){t.path.style("mix-blend-mode",null).attr("stroke","#ddd"),e.attr("display",null)}function i(){t.path.style("mix-blend-mode","multiply").attr("stroke",null),e.attr("display","none")}e.append("circle").attr("r",2.5),e.append("text").attr("font-family","sans-serif").attr("font-size",10).attr("text-anchor","middle").attr("y",-8)}},mounted:function(){}},p={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"line_chart"})},staticRenderFns:[]},m=n("VU/8")(h,p,!1,null,null,null).exports,f={data:function(){return{data:[{},{},{}],isSideMenuShowing:!1,username:"username",selectedArea:2,pickedMode:-1,options:[{text:"China",value:0},{text:"New Zealand",value:1},{text:"Middle East",value:2}]}},methods:{showSideMenu:function(t){this.isSideMenuShowing=t},clickWrapper:function(t){t.stopPropagation()},signout:function(){sessionStorage.removeItem("token"),this.$router.push({name:"Login"})},resolveOriginData:function(t,e){if(null==this.data[t].lineChart){var n=new l.a,a=new l.a,i=new l.a;e.forEach(function(t){var e=t.datetime.substr(0,10),s=e.substr(0,8)+"01",r=s.substr(0,5)+"01-01";n.has(e)?(n.get(e).radiance+=+t.radiance,n.get(e).pixels+=+t.pixels):n.set(e,{radiance:+t.radiance,pixels:+t.pixels}),a.has(s)?(a.get(s).radiance+=+t.radiance,a.get(s).pixels+=+t.pixels):a.set(s,{radiance:+t.radiance,pixels:+t.pixels}),i.has(r)?(i.get(r).radiance+=+t.radiance,i.get(r).pixels+=+t.pixels):i.set(r,{radiance:+t.radiance,pixels:+t.pixels})}),console.log(a),console.log(i);var s={y:"radiance / pixels",series:[{name:this.options[t].text,values:[]}],dates:[]},r={y:"radiance / pixels",series:[{name:this.options[t].text,values:[]}],dates:[]},o={y:"radiance / pixels",series:[{name:this.options[t].text,values:[]}],dates:[]};n.forEach(function(t,e){s.dates.push(new Date(e)),s.series[0].values.push(t.radiance/t.pixels)}),a.forEach(function(t,e){r.dates.push(new Date(e)),r.series[0].values.push(t.radiance/t.pixels)}),i.forEach(function(t,e){o.dates.push(new Date(e)),o.series[0].values.push(t.radiance/t.pixels)}),this.data[t].lineChart=[o,r,s],console.log(this.data[t]),this.selectedArea===t&&this.resetData(this.selectedArea)}},resetData:function(){this.pickedMode>=0&&null!=this.data[this.selectedArea].lineChart&&this.$refs.lineChart.resetData(this.data[this.selectedArea].lineChart[this.pickedMode])}},watch:{selectedArea:function(t){console.log("selectedArea "+t),this.resetData()},pickedMode:function(t){console.log("pickedMode "+t),this.resetData()}},mounted:function(){var t=this;this.$http.get("/awselb/city?id=2").then(function(e){console.log(e.body),t.resolveOriginData(2,e.body)},function(t){console.error(t)})},components:{MyFooter:d,MyPropsLineChart:m}},v={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"nav-container"},[n("div",[n("nav",{staticClass:"bar bar-toggle"},[n("div",{staticClass:"container"},[n("div",{staticClass:"row align-items-center"},[n("div",{staticClass:"col-6"},[n("div",{staticClass:"bar__module"},[n("router-link",{attrs:{to:{name:"Index"}}},[n("img",{staticClass:"logo logo-dark",attrs:{alt:"logo",src:"img/logo-dark.png"}}),t._v(" "),n("img",{staticClass:"logo logo-light",attrs:{alt:"logo",src:"img/logo-light.png"}})])],1)]),t._v(" "),n("div",{staticClass:"col-6 d-flex justify-content-end"},[n("div",{staticClass:"bar__module"},[n("div",{staticClass:"menu-toggle pull-right",on:{click:function(e){return t.showSideMenu(!0)}}},[n("i",{staticClass:"stack-interface stack-menu"})])])])])])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isSideMenuShowing,expression:"isSideMenuShowing"}],staticClass:"mask",on:{click:function(e){return e.target!==e.currentTarget?null:(e.stopPropagation(),t.showSideMenu(!1))}}}),t._v(" "),n("transition",{attrs:{name:"from-right"}},[t.isSideMenuShowing?n("div",{staticClass:"\n                        notification\n                        pos-right pos-top\n                        side-menu\n                        bg--white\n                    ",on:{click:function(e){return e.stopPropagation(),t.clickWrapper(e)}}},[n("div",{staticClass:"\n                            side-menu__module\n                            pos-vertical-center\n                            text-right\n                        "},[n("ul",{staticClass:"menu-vertical"},[n("li",{staticClass:"h4"},[t._v(t._s(t.username))]),t._v(" "),n("li",[n("input",{staticClass:"btn",attrs:{type:"button",value:"Signout"},on:{click:t.signout}})])])])]):t._e()])],1)]),t._v(" "),n("section",[n("div",{staticClass:"container"},[n("div",{staticClass:"\n                    masonry-filter-container\n                    text-center\n                    row\n                    justify-content-start\n                    align-items-center\n                "},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedArea,expression:"selectedArea"}],staticClass:"col-2 my-dropdown-menu",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectedArea=e.target.multiple?n:n[0]}}},t._l(t.options,function(e){return n("option",{key:e.value,domProps:{value:e.value}},[t._v("\n                        "+t._s(e.text)+"\n                    ")])}),0),t._v(" "),n("div",{staticClass:"my-checkbox"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.pickedMode,expression:"pickedMode"}],staticClass:"col-1",attrs:{type:"radio",id:"year",value:"0"},domProps:{checked:t._q(t.pickedMode,"0")},on:{change:function(e){t.pickedMode="0"}}}),t._v(" "),n("label",{attrs:{for:"year"}},[t._v("Year")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.pickedMode,expression:"pickedMode"}],staticClass:"col-1",attrs:{type:"radio",id:"month",value:"1"},domProps:{checked:t._q(t.pickedMode,"1")},on:{change:function(e){t.pickedMode="1"}}}),t._v(" "),n("label",{attrs:{for:"month"}},[t._v("Month")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.pickedMode,expression:"pickedMode"}],staticClass:"col-1",attrs:{type:"radio",id:"day",value:"2"},domProps:{checked:t._q(t.pickedMode,"2")},on:{change:function(e){t.pickedMode="2"}}}),t._v(" "),n("label",{attrs:{for:"day"}},[t._v("Day")])])]),t._v(" "),n("div",{staticClass:"masonry__container row masonry--active"},[n("div",{staticClass:"masonry__item col-md-6 col-12 filter-filter-1"},[n("my-props-line-chart",{ref:"lineChart"}),t._v(" "),n("span",{staticClass:"h4 inline-block"},[t._v("Title")]),t._v(" "),n("span",[t._v("Detailed Description")])],1)])])]),t._v(" "),n("my-footer")],1)},staticRenderFns:[]};var g=n("VU/8")(f,v,!1,function(t){n("GnYM")},"data-v-8030f9b6",null).exports,x={data:function(){return{deployMode:2,signInWays:[{id:0,label:"Github"}],wayDetails:[{scope:"read:user",state:"A2Inc",getCodeURL:"https://github.com/login/oauth/authorize",oauthAppDetails:[{client_id:"42a45d2fefb71837398e",redirectURL:"http://localhost:8888/oauth/redirect"},{client_id:"fc1c0102b2b1baf844e3",redirectURL:"http://106.15.196.187/oauth/redirect"},{client_id:"c04fa22c7aa981ba6419",redirectURL:"http://httpelb-1499061197.ap-southeast-1.elb.amazonaws.com/oauth/redirect"}]}]}},methods:{submit:function(t){0===t&&(window.location.href=this.formatGitHubCodeURL)}},computed:{formatGitHubCodeURL:function(){var t=this.wayDetails[0],e=t.oauthAppDetails[this.deployMode];return t.getCodeURL+"?"+this.$querystring.stringify({client_id:e.client_id,scope:t.scope,state:t.state,redirect_uri:e.redirectURL})}},components:{MyFooter:d}},y={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{"data-smooth-scroll-offset":"77"}},[n("div",{staticClass:"nav-container"}),t._v(" "),n("div",{staticClass:"main-container"},[n("section",{staticClass:"height-100 text-center"},[n("div",{staticClass:"container pos-vertical-center"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-7 col-lg-5"},[n("h2",[t._v("Sign in with")]),t._v(" "),n("ul",t._l(t.signInWays,function(e){return n("li",{key:e.id},[n("input",{staticClass:"btn btn--primary type--uppercase",attrs:{type:"button",value:e.label},on:{click:function(n){return t.submit(e.id)}}})])}),0)])])])]),t._v(" "),n("my-footer")],1)])},staticRenderFns:[]},w=n("VU/8")(x,y,!1,null,null,null).exports,_={data:function(){return{txtReg:/\?\bcode\b=/}},mounted:function(){var t=window.location.href;if(this.txtReg.test(t)){var e=t.split("?")[1].split("&")[0].split("=")[1];console.log(e),sessionStorage.setItem("token","123"),this.$router.push({name:"Index",query:{username:"xxx"}})}else this.$router.push({name:"Login"})}},k={render:function(){var t=this.$createElement;return(this._self._c||t)("h4",[this._v("Redirecting...")])},staticRenderFns:[]},b=n("VU/8")(_,k,!1,null,null,null).exports,C={data:function(){return{data:[73,52,33,22,14,68]}},methods:{draw:function(){var t=u.m("svg"),e=t.attr("width"),n=t.attr("height"),a=t.append("g").attr("transform","translate(30,30)"),i=u.j().domain(u.i(this.data.length)).rangeRound([0,e-60]),s=u.k().domain([0,u.g(this.data)]).range([n-60,0]),r=u.a(i),o=u.b(s);a.append("g").attr("transform","translate(0, "+(n-60)+")").call(r),a.append("g").attr("transform","translate(0,0)").call(o);var l=a.selectAll("rect").data(this.data).enter().append("g");l.append("rect").attr("x",function(t,e){return i(e)+20}).attr("y",function(t,e){var n=s.domain()[0];return s(n)}).attr("width",function(t,e){return i.step()-40}).attr("height",function(t,e){return 0}).attr("fill","pink").transition().duration(1500).delay(function(t,e){return 200*e}).attr("y",function(t,e){return s(t)}).attr("height",function(t,e){return n-60-s(t)}),l.on("mouseover",function(){u.m(this.firstChild).transition().duration(1e3).delay(200).attr("fill","#306ade")}),l.on("mouseout",function(){u.m(this.firstChild).transition().duration(1e3).delay(200).attr("fill","pink")}),l.append("text").attr("x",function(t,e){return i(e)+40}).attr("y",function(t,e){return n-60}).attr("dx",function(t,e){return-2}).attr("dy",function(t,e){return 20}).text(function(t,e){return t}).attr("fill","green").transition().duration(1500).delay(function(t,e){return 200*e}).attr("y",function(t,e){return s(t)})}},mounted:function(){this.draw()}},A={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("svg",{attrs:{width:"600",height:"500"}})])},staticRenderFns:[]},D=n("VU/8")(C,A,!1,null,null,null).exports,M={data:function(){return{data:{y:"xxx",series:[{name:"n1",values:[2.3,2.4,2.5,2.6,2.7]},{name:"n2",values:[.6,2.4,2.5,2.6,2.3]},{name:"n3",values:[2.1,2.3,2.7,2.6,2.1]}],dates:[new Date("2000-01-01"),new Date("2000-02-01"),new Date("2000-03-01"),new Date("2000-04-01"),new Date("2000-05-01")]},width:600,height:400,margin:{top:20,right:20,bottom:30,left:30}}},methods:{draw:function(){var t=this,e=u.m("div.line_chart").append("svg").attr("viewBox",[0,0,this.width,this.height]).style("overflow","visible"),n=u.l().domain(u.d(this.data.dates)).range([this.margin.left,this.width-this.margin.right]),a=u.k().domain([0,u.g(this.data.series,function(t){return u.g(t.values)})]).nice().range([this.height-this.margin.bottom,this.margin.top]),i=u.f().defined(function(t){return!isNaN(t)}).x(function(e,a){return n(t.data.dates[a])}).y(function(t){return a(t)});e.append("g").append("g").call(function(e){return e.attr("transform","translate(0,"+(t.height-t.margin.bottom)+")").call(u.a(n).ticks(t.width/80).tickSizeOuter(0))}),e.append("g").append("g").call(function(e){return e.attr("transform","translate("+t.margin.left+",0)").call(u.b(a)).call(function(t){return t.select(".domain").remove()}).call(function(e){return e.select(".tick:last-of-type text").clone().attr("x",3).attr("text-anchor","start").attr("font-weight","bold").text(t.data.y)})});var s=e.append("g").attr("fill","none").attr("stroke","steelblue").attr("stroke-width",1.5).attr("stroke-linejoin","round").attr("stroke-linecap","round").selectAll("path").data(this.data.series).join("path").style("mix-blend-mode","multiply").attr("d",function(t){return i(t.values)});this.hover(e,s,n,a)},hover:function(t,e,n,a){var i=this;"ontouchstart"in document?t.style("-webkit-tap-highlight-color","transparent").on("touchmove",r).on("touchstart",o).on("touchend",l):t.on("mousemove",r).on("mouseenter",o).on("mouseleave",l);var s=t.append("g").attr("display","none");function r(t){t.preventDefault();var r=u.h(t,this),o=n.invert(r[0]),l=a.invert(r[1]),c=u.c(i.data.dates,o),d=u.e(i.data.series,function(t){return Math.abs(t.values[c]-l)});e.attr("stroke",function(t){return t===d?null:"#ddd"}).filter(function(t){return t===d}).raise(),s.attr("transform","translate("+n(i.data.dates[c])+","+a(d.values[c])+")"),s.select("text").text(d.name)}function o(){e.style("mix-blend-mode",null).attr("stroke","#ddd"),s.attr("display",null)}function l(){e.style("mix-blend-mode","multiply").attr("stroke",null),s.attr("display","none")}s.append("circle").attr("r",2.5),s.append("text").attr("font-family","sans-serif").attr("font-size",10).attr("text-anchor","middle").attr("y",-8)}},mounted:function(){this.draw()}},R={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"line_chart"})},staticRenderFns:[]},E=n("VU/8")(M,R,!1,null,null,null).exports,S={data:function(){return{data:{y:"xxx",series:[{name:"n1",values:[2.3,2.4,2.5,2.6,2.7]},{name:"n2",values:[.6,2.4,2.5,2.6,2.3]},{name:"n3",values:[2.1,2.3,2.7,2.6,2.1]}],dates:[new Date("2000-01-01"),new Date("2000-02-01"),new Date("2000-03-01"),new Date("2000-04-01"),new Date("2000-05-01")]},originData:[{id:22827,datetime:"2012-03-31T16:20:24.000+00:00",radiance:"1426051.8",pixels:1155144,cityId:2,window:"[2.997916665, 28.002062535000004, 46.997951865, 54.002083335]"},{id:22828,datetime:"2012-04-01T12:38:03.000+00:00",radiance:"6753252.0",pixels:3902261,cityId:2,window:"[58.997916665, 29.002062535000004, 102.997951865, 55.002083335]"},{id:22829,datetime:"2012-04-01T12:43:45.000+00:00",radiance:"11745323.0",pixels:7574962,cityId:2,window:"[55.997916665, 10.002063335000003, 91.997945465, 35.002083335]"},{id:22830,datetime:"2012-04-01T14:20:29.000+00:00",radiance:"23600416.0",pixels:11584972,cityId:2,window:"[32.997916665, 26.002063335000003, 75.997951065, 51.002083335]"},{id:22831,datetime:"2012-04-01T14:26:10.000+00:00",radiance:"10887334.0",pixels:6319400,cityId:2,window:"[29.997916665, 7.0020633350000026, 64.997944665, 32.002083335]"},{id:22832,datetime:"2012-04-01T16:02:54.000+00:00",radiance:"2648965.8",pixels:3468857,cityId:2,window:"[6.997916665, 23.002063335000003, 47.997949465, 48.002083335]"},{id:22833,datetime:"2012-04-02T12:20:33.000+00:00",radiance:"12771220.0",pixels:5336758,cityId:2,window:"[62.997916665, 24.002063335000003, 103.997949465, 49.002083335]"}]}},methods:{resolveOriginData:function(){var t=new l.a;this.originData.forEach(function(e){var n=e.datetime.substr(0,10);t.has(n)?(t.get(n).radiance+=+e.radiance,t.get(n).pixels+=+e.pixels):t.set(n,{radiance:+e.radiance,pixels:+e.pixels})}),console.log(t);var e={y:"radiance / pixels",series:[{name:"Middle East",values:[]}],dates:[]};t.forEach(function(t,n){e.dates.push(new Date(n)),e.series[0].values.push(t.radiance/t.pixels)}),console.log(e),this.$refs.lineChart.resetData(e)},draw:function(){this.$refs.lineChart.draw()}},mounted:function(){},components:{MyPropsLineChart:m}},$={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("Button",{on:{click:this.draw}},[this._v("draw")]),this._v(" "),e("Button",{on:{click:this.resolveOriginData}},[this._v("resolveOriginData")]),this._v(" "),e("my-props-line-chart",{ref:"lineChart",attrs:{initialData:this.data}})],1)},staticRenderFns:[]},T=n("VU/8")(S,$,!1,null,null,null).exports;a.a.use(r.a);var U=new r.a({mode:"history",routes:[{path:"/",name:"Index",component:g,meta:{requireAuth:!0}},{path:"/login",name:"Login",component:w},{path:"/oauth/redirect",name:"OauthRedirect",component:b},{path:"/test/d3",name:"TestD3",component:D},{path:"/test/line_chart",name:"TestLineChart",component:E},{path:"/test/empty",name:"TestEmptyPage",component:T}]}),I=n("OAwv"),Y=n.n(I),L=(n("XTiQ"),n("Ch8T"),n("Bdqv"),n("x9ll"),n("4A5E"));a.a.prototype.$querystring=Y.a,a.a.use(L.a),a.a.config.productionTip=!1,U.beforeEach(function(t,e,n){t.meta.requireAuth&&null==sessionStorage.token?n({path:"/login"}):n()}),new a.a({el:"#app",router:U,components:{App:s},template:"<App/>"})},XTiQ:function(t,e){},x9ll:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.e011970329f99e9785d6.js.map