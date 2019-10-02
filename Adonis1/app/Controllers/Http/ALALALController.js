'use strict'
const User = use('App/Models/User');
const Token = use('App/Models/Token');
var rp = require('request-promise');
// var cheerio = require('cheerio'); // Basically jQuery for node.js
class ALALALController {

    index ({request,response}) {
       
        var options = {
            method: 'GET',
            uri: 'https://jsonplaceholder.typicode.com/posts',
            resolveWithFullResponse: true    //  <---  <---  <---  <---
        };
        rp(options)
            .then(function (res) {
                console.log(res.body)
                return res.json();
                
                // return response.json(res.body);
            })
            .catch(function (err) {
                // Delete failed...
            });
        

      }

     async send ({request,response}) {
        const objeto = request.all();
        console.log(objeto)
        try {
        var options = {
            method: 'POST',
            // uri: 'https://jsonplaceholder.typicode.com/posts',
            uri: 'http://127.0.0.1:8000/api/registrar',
            resolveWithFullResponse: true,   //  <---  <---  <---  <---
            form: {
                name: objeto.name,
                email: objeto.email,
                password: objeto.password,
                username: objeto.username 
            },
        };
        rp(options)
            .then(function (res) {
                console.log(res.body)  
            })
            .catch(function (err) {
                // Delete failed...
            });

            const user = new User()
            user.email = objeto.email;
            user.username = objeto.username;
            user.password = objeto.password;
            let g=await user.save()
        }
        catch(e)
        {

        }

        // test succesful
        

      }

      async start ({request,auth,response}) {
        try { 
            const objeto = request.all();
            // Recuperar todo del request
         let {email, password} = request.all();
          let token=await auth.attempt(email, password)
           var options = {
            method: 'POST',
            // uri: 'https://jsonplaceholder.typicode.com/posts',
            uri: 'http://127.0.0.1:8000/api/Start',
            resolveWithFullResponse: true,   //  <---  <---  <---  <---
            form: {
                name: objeto.name,
                email: objeto.email,
                password: objeto.password,
                username: objeto.username 
            },
        };
        rp(options)
            .then(function (res) {
                console.log(res.body)  
            })
            .catch(function (err) {
                // Delete failed...
            });
           return response.status(201).send(token.token)
           
         }
         catch (e) {
           return response.status(400).json({
             message:'Ups!algo ocurrio,intenta de nuevo mas tarde'
           })
         }
          }
    
}

module.exports = ALALALController
