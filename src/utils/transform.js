import {
    upperFirst,
} from 'lodash'

function toSubtitle(text) {
    if (!text) return ''
    return text.split(' ').map(upperFirst).join(' ')
}

export {
    toSubtitle
}