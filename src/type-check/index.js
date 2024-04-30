export const isObjeck = (el='') => {

    return typeof el === 'object' &&!Array.isArray(el)
}

export const isFunction = (el='') => {

    return typeof el === 'function'
}   


export const isString = (el='') => {

    return typeof el === 'string'
}      

export const isNumber = (el='') => {

    return typeof el === 'number'
}   


export const isBoolean = (el='') => {

    return typeof el === 'boolean'
}       

export const isUndefined = (el='') => {

    return typeof el === 'undefined'
}       

export const isNull = (el='') => {

    return el === null
}   
