const setDarkMode = darkmode => {
    if(darkmode) {
        localStorage.setItem('devconnector_darkmode', darkmode)
    } else {
        localStorage.removeItem('devconnector_darkmode')
    }
}

export default setDarkMode