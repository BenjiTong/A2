<template>
    <h4>Redirecting...</h4>
</template>

<script>

export default {
    data: function () {
        return {
            urlReg: /\?\bcode\b=/,
            githubUrlReg: /\brepos\b\/(.*)\//
        }
    },

    mounted () {
        let url = window.location.href
        // if url match regular expression, or redirect to index
        if (this.urlReg.test(url)) {
            /*
            let afterQuestion = url.split('?')[1]
            let paramPairs = afterQuestion.split('&')
            let code = paramPairs[0].split('=')[1]
            */
            let code = this.$route.query.code
            let state = this.$global.state
            console.log('code: ' + code)
            console.log('state: ' + state)
            console.log('deploayMode: ' + this.$global.deployMode)
            console.log('apiHead: ' + this.$global.apiHead)

            let api = this.$global.apiHead + '/oauth/token'
            console.log(api)
            this.$http.post(api + ('?' + this.$querystring.stringify({
                code,
                state
            }))).then((response) => {
                console.log(response.body)
                if ('r' in response.body) {
                    alert(response.body.desc)
                    this.$router.push({ name: 'Login' })
                } else {
                    if ('token' in response.body) {
                        this.$global.usrInfo = response.body.user
                        console.log(this.$global)
                        let usrname = this.githubUrlReg.exec(this.$global.usrInfo[0].url)[1].trim()
                        console.log(usrname)
                        // this.$global.usrname = usrname
                        let storage
                        if (this.$global.tokenStorageType === 0) {
                            storage = sessionStorage
                        } else {
                            storage = localStorage
                        }
                        storage.setItem('usrname', usrname)
                        storage.setItem('token', response.body.token)
                        this.$router.push({ name: 'Index', query: { usrname } })
                    } else {
                        console.log('no token')
                        this.$router.push({ name: 'Login' })
                    }
                }
            }, (response) => {
                console.error(response)
                this.$router.push({ name: 'Login' })
            })
        } else {
            this.$router.push({ name: 'Index' }).catch(() => { }) // maybe redirect by navigation guard, so may throw an exception
        }
    }
}
</script>
