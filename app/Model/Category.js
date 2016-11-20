'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    advertises() {
        return this.hasMany('App/Model/Advertise')
    }
}

module.exports = Category