export function getGender (data) {
    if(data === 'female') return 'hembra'
    if(data === 'male') return 'macho'
    if(data === 'unknown') return 'desconocido'
}

export function getPet (data) {
    if(data === 'dog') return 'perro'
    if(data === 'cat') return 'gato'
}

export function getSize (data) {
    if(data === 'small') return 'pequeño'
    if(data === 'medium') return 'mediano'
    if(data === 'big') return 'grande'
}

export function getCastration (data) {
    if(data === 'true') return 'castrado'
    if(data === 'false') return 'no castrado'
    if(data === 'unknown') return 'desconocido'
}

export function getVaccinate (data) {
    if(data === 'true') return 'vacunado'
    if(data === 'false') return 'no vacunado'
    if(data === 'unknown') return 'desconocido'
}

export function getState (data) {
    if(data === 'adopt') return 'para adoptar'
    if(data === 'adopted') return 'adoptado'
    if(data === 'lost') return 'extraviado'
    if(data === 'transit') return 'en transito'
}

export function getFur (data) {
    if(data === 'short') return 'corto'
    if(data === 'long') return 'largo'
}