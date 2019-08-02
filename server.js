var hapi=require('@hapi/hapi');
require("dotenv").config();
var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});
connection.connect();
var server=new hapi.Server({
    host:'localhost',
    port:7000,
    routes :{
    	cors :true
    },
});
server.route({
        method:"GET",
        path:"/",
        handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
                  connection.query(`SELECT *,date_format(Date_of_Birth, '%Y-%m-%d') as Date_of_Birth from users `, function (error, results, fields) {
                    if (error) reject(error);
                    resolve(results);
                  });
            
            })
        }
    })
    server.route({
    method:"POST",
        path:"/add",
        handler:(request,reply)=>{
        	let item = request.payload;
        	console.log(item);
      return new Promise((resolve,reject)=>{
        connection.query(`insert into users (Name,Date_of_Birth,eMail,Contact,About_You,State,Gender,Password) values('${item.name}','${item.dob}','${item.email}','${item.num}','${item.abtu}','${item.states}','${item.gender}','${item.password}')`, function (error, results, fields) {
                    if (error) reject(error);
                    resolve(results);
                  });
            
            })
        }
    })
    server.route({
    method:"POST",
            path:"/edit/{id}",
            handler: (request,reply)=>{
               var  item = request.payload;
               var id=request.params.id;
               console.log(item,id);
                return new Promise((resolve,reject)=>{
                     connection.query(`UPDATE users SET Name ='${item.name}', Date_of_Birth ='${item.dob}', eMail = '${item.email}',Contact='${item.num}',About_You='${item.abtu}',State='${item.states}',Gender='${item.gender}' WHERE Id ='${id}'`, function (error, results, fields) {
                        if (error) reject(error);
                        
                        resolve(results);
                        });
            
            })
        }
    })
  server.route({
  method:"post",
  path:"/delete",
  handler:(request,reply)=>{
    var id=request.payload;
    
    console.log(id);
        return new Promise((resolve,reject)=>{
          var connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();
             connection.query(`DELETE FROM users WHERE Id=${id}`, function (error, results, fields) {
            if (error) reject (error);
           
            resolve(results);
          });
           
          connection.end();
    })

    }
})
server.start((err)=>{
    if(err) throw err;
    
})


console.log("Server is started")