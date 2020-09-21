const jwt = require('jsonwebtoken')

function CreateJwt(user) {
    const token = jwt.sign({user}, process.env.SECRET || 'hjasdhf873fb312', {
        expiresIn: '365d'
    })

    return token
}

module.exports = CreateJwt