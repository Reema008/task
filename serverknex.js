var hapi = require('hapi');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
const fs = require("fs");
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'forms'
  }
});
var server = new hapi.Server({
  host: '192.168.2.204',
  port: 7000,
  routes: {
    cors: true
  },
});


server.route({
  method: 'POST',
  path: '/addfile',
  handler:(request, h) => {
  
      const data = request.payload;
      //console.log(data)
      if (data.file) {
          const name = data.file.hapi.filename;
          const path = __dirname + "/uploads/" + data.userName + name ;
          const file = fs.createWriteStream(path);
          console.log( file)
        
        
          file.on('error', (err) => console.error(err));

          data.file.pipe(file);

          data.file.on('end', (err) => { 
              const ret = {
                  filename: data.file.hapi.filename,
                  headers: data.file.hapi.headers  
              }
            console.log(JSON.stringify(ret))
              // return JSON.stringify(ret);
              
          })
          const src =data.userName + name;
              return src;
      }
      return src;
  },
  options: {
      payload: {
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data'
      }
  }
});


server.route({
  method: 'POST',
  path: '/login',
  handler: async (request, reply,res) => {
    let item = request.payload;
    //console.log(item.password)
    
    await knex.raw(`SELECT * from users where Name='${item.name}'`)
      .then(data => {
        reply = data
        if(reply[0].length!=0){
    for(var i=0;i<reply[0].length;i++)
      {
        items=reply[0][i].Password
        var bytes  = CryptoJS.AES.decrypt(items, 'secret key 123');
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
            console.log(plaintext,item.password);
            if(plaintext==item.password){
              reply = 'Login Successful';
            }else
            reply = 'Invalid Credentials';
      }}else
      reply = 'Invalid Credentials';
          if(reply=='Login Successful'){
            var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
            reply = {
              token: token,
              message:'login',
              success: true
            }
          }else
           reply = 'Invalid Credentials';
        })
        
     return reply;
        }
});
server.route({
  method: 'POST',
  path: '/encrypt',
  handler: async (request, reply,res) => {
    let item = request.payload;
    var ciphertext = CryptoJS.AES.encrypt(item, 'secret key 123');
     return reply;
        }
});
server.route({
  method: 'POST',
  path: '/decrypt',
  handler: async (request, reply,res) => {
    let item = request.payload;
            var bytes  = CryptoJS.AES.decrypt(item, 'secret key 123');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
            reply=plaintext;
     return reply;
        }
});


server.route({
  method: 'GET',
  path: '/list',
  handler: async (request, reply) => {
    await knex.raw(`select *,date_format(Date_of_Birth, '%Y-%m-%d') as Date_of_Birth,date_format(Date_of_Joining, '%Y-%m-%d') as Date_of_Joining from users`)
      .then(data => {
      
        reply = 
          data
      })
     
    return reply;
  }
});


server.route({
  method: 'POST',
  path: '/add',
  handler: async (request, reply) => {
    let item = request.payload;
    var ciphertext = CryptoJS.AES.encrypt(item.password, 'secret key 123');
    await knex.raw(`insert into users (Name,Date_of_Birth,eMail,Contact,About_You,State,Gender,Password,DepartmentsId,Date_of_Joining,profilePic) values('${item.name}','${item.dob}','${item.email}','${item.num}','${item.abtu}','${item.states}','${item.gender}','${ciphertext.toString()}','${item.dpmid}','${item.doj}','${item.file}')`)
      .then(data => {
        reply = 
          data
      })
    return reply;
  }
});

server.route({
  method: 'POST',
  path: "/edit/{id}",
  handler: async (request, reply) => {
    let item = request.payload;
    var id=request.params.id;
    var ciphertext = CryptoJS.AES.encrypt(item.password, 'secret key 123');
    await knex.raw(`UPDATE users SET Name ='${item.name}', Date_of_Birth ='${item.dob}', eMail = '${item.email}',Contact='${item.num}',About_You='${item.abtu}',State='${item.states}',Gender='${item.gender}',Password='${ciphertext.toString()}',DepartmentsId='${item.dpmid}', Date_of_Joining ='${item.doj}' WHERE Id ='${id}'`)
      .then(data => {
        reply = 
          data
      })
    return reply;
  }
});


server.route({
  method: 'POST',
  path:"/delete",
  handler: async (request, reply) => {
    let id = request.payload;
    await knex.raw(`DELETE FROM users WHERE Id=${id}`)
      .then(data => {
        reply = 
          data
      })
    return reply;
  }
});

server.route({
  method: 'GET',
  path: '/departments',
  handler: async (request, reply) => {
    await knex.raw(`SELECT users.Id,users.Name,departments.department,departments.id from users inner join departments on users.DepartmentsId=departments.id `)
      .then(data => {
      
        reply = 
          data
      })
    return reply;
  }
});


 


server.start((err) => {
  if (err) throw err;

})

console.log("Server is started")