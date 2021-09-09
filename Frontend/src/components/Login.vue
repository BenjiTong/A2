<template>
    <div data-smooth-scroll-offset="77">
        <div class="nav-container"></div>
        <div class="main-container">
            <section class="height-100 text-center">
                <div class="container pos-vertical-center">
                    <div class="row">
                        <div class="col-md-7 col-lg-5">
                            <h2>Sign in with</h2>

                            <ul>
                                <li
                                    v-for="way in signInWays"
                                    v-bind:key="way.id"
                                >
                                    <input
                                        class="btn btn--primary type--uppercase"
                                        type="button"
                                        @click="submit(way.id)"
                                        v-bind:value="way.label"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <my-footer />
        </div>
    </div>
</template>

<script>
import MyFooter from '@/components/Footer'

export default {
    data: function () {
        return {
            signInWays: [
                { id: 0, label: 'Github' }
            ],
            wayDetails: [ // way refers to github/facebook/..
                {
                    scope: 'read:user',
                    getCodeURL: 'https://github.com/login/oauth/authorize',
                    oauthAppDetails: [{
                        client_id: '42a45d2fefb71837398e',
                        // client_id: 'c04fa22c7aa981ba6419',
                        redirectURL: 'http://localhost/oauth/redirect'
                        // redirectURL: 'http://httpelb-1499061197.ap-southeast-1.elb.amazonaws.com/oauth/redirect'
                    },
                    {
                        client_id: 'fc1c0102b2b1baf844e3',
                        redirectURL: 'http://106.15.196.187/oauth/redirect'
                    },
                    {
                        client_id: 'c04fa22c7aa981ba6419',
                        redirectURL: 'http://httpelb-1499061197.ap-southeast-1.elb.amazonaws.com/oauth/redirect'
                    }
                    ]
                }
            ]
        }
    },
    methods: {
        submit: function (index) {
            // check if log in

            // if not
            if (index === 0) {
                // console.info(this.formatGitHubCodeURL)
                // window.open(this.formatGitHubCodeURL)
                window.location.href = this.formatGitHubCodeURL
            }
            /*
            this.$http.jsonp(
                'github/login/oauth/authorize',
                {
                    'params': this.wayDetails[index]
                })
                .then((response) => {
                    console.info(response.body)
                }, (response) => {
                    console.error(response)
                })
*/
            // Temp create fake token
            // sessionStorage.setItem('token', '123')
            // this.$router.push({ name: 'Index' })
        }
    },
    computed: {
        formatGitHubCodeURL: function () {
            let wayDetail = this.wayDetails[0]
            let oauthAppDetail = wayDetail.oauthAppDetails[this.$global.deployMode]

            return wayDetail.getCodeURL + ('?' + this.$querystring.stringify({
                client_id: oauthAppDetail.client_id,
                scope: wayDetail.scope,
                state: this.$global.state,
                redirect_uri: oauthAppDetail.redirectURL
            }))
        }
    },
    components: {
        MyFooter
    }
}
</script>
