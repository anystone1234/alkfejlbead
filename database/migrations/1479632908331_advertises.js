'use strict'

const Schema = use('Schema')

class AdvertisesTableSchema extends Schema {

  up () {
    this.create('advertises', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.text('describing').notNullable()
      table.integer('price').notNullable()
      table.string('email',256).notNullable().unique()
      table.integer('phone',11).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('advertises')
  }

}

module.exports = AdvertisesTableSchema
