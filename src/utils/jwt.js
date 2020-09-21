import base64 from 'base-64'

function parseToken(token) {
    let res = undefined
    let sections = token.split('.')
    if (sections.length === 3) {
        let cred = base64.decode(sections[1])
        res = JSON.parse(cred)
    }
    return res ? res.data : undefined 
}

export {
    parseToken
}