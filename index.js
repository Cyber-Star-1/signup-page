const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')

const app = express();
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req,res) {  
    res.sendFile(__dirname+ '/signup.html');
})
app.post('/',function (req,res) {  
    var fName = req.body.fName
    var lName = req.body.lName
    var email = req.body.email
		
		var data ={
			members:[
					{
						email_address: email ,
						merge_fields:{
							FNAME: fName,
							LNAME: lName
						},
						status : 'subscribed'
					}
			]
		}
	jsonData = JSON.stringify(data)

    var option = {
        url: 'https://www.google.com',
        method: 'POST',
        headers:{
            'Authorization':'adeebAhmad1 ca09672f6dbf80f23f2235dfe2f15177-us20'
				} ,
				body: jsonData
    }
    request(option, function (error,response,body) {
        if(error){
            console.log(error);

        }
        else{
            if(response.statusCode >= 200 || response.statusCode <= 250){
                res.send('Successfully Subscribed')
            }
            else{
                res.send('There was an error with signing up please try again')
            }
        }
    })
});

app.listen(process.env.PORT ||3000, function () {  
    console.log(`Server is running on port '3000'.`);
})


//!   ca09672f6dbf80f23f2235dfe2f15177-us20