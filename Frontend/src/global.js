const deployMode = 2 // 0 local 1 ali 2 aws
// const apiHead = '/api' // '/api' local '/awselb' awselb
const apiHead = '/awselb'
const state = 'A2Inc'
const tokenStorageType = 1 // 0 sessionStorage 1 localStorage

export default {
    deployMode,
    apiHead,
    state,
    tokenStorageType
}
