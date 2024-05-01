const getQueryInArray = (key:any) => {
    const url = new URLSearchParams(window.location?.search)
    return url.get(key)?.split(',')?.filter(param => !!param)
}

export default getQueryInArray