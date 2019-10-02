'use strict'
const User = use('App/Models/User')
var rp = require('request-promise');
// var cheerio = require('cheerio'); // Basically jQuery for node.js
class AlalalController {
    async send ({request,response}) {
        const objeto = request.all();
        const user = new User()
            user.email = objeto.email;
            user.username = objeto.username;
            user.password = objeto.password;
            let g=await user.save()
        console.log(objeto)
        try {
        var options = {
            method: 'POST',
            // uri: 'https://jsonplaceholder.typicode.com/posts',
            uri: 'http://127.0.0.1:200/api/registrar',
            resolveWithFullResponse: true,   //  <---  <---  <---  <---
            form: {
                name: objeto.name,
                email: objeto.email,
                password: objeto.password 
            },
        };
        rp(options)
            .then(function (res) {
                console.log(res.body)  
            })
            .catch(function (err) {
                // Delete failed...
            });

            
        }
        catch(e)
        {

        }

        // test succesful
        

      }
}

module.exports = AlalalController
