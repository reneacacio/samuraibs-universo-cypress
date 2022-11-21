/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// Instacinado o Pool para conexão com Postgre
const { Pool } = require('pg')

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const pool = new Pool({
    host: 'peanut.db.elephantsql.com',
    user: 'dxugwhkg',
    password: 'bjvfrcDE91zB59sSbNxz2xjqloxh5Fh8',
    database: 'dxugwhkg',
    port: 5432
  })

  on('task', {
    removeUser(email) {
      // Criando uma promessa
      return new Promise(function(resolve){

        pool.query('DELETE FROM public.users WHERE email = $1', [email], function (error, result) {
          if (error) { // Em caso de erro
            throw error
          }
          resolve({success: result})  // Devolvendo o resultado

        })
      }) 



    }
  })
}
