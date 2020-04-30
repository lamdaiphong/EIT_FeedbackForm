const awsSDK = require("aws-sdk");
const queryStr = require("querystring");


var ses = new awsSDK.SES({region: 'ap-southeast-2'});

exports.handler = function(event, context, callback) {
    
    const params = queryStr.parse(event.body);

    var emailParams = {
        Destination: {
            ToAddresses: [params['email']]
        },
        Message: {
            Body: {
                Text: {
                    Data: "Thanks " + params['name'] + " for contacting to us." +
                    "\nThis is acknowledge that EIT has received your feedback!" +
                    "\nEmail: " + params['email'] + 
                    "\nExperience: " + params['experience'] +
                    "\nMessage: " + params['comments']
                }
            },
            Subject: {
                Data: "Feedback acknowledgement from EIT"
            }
        },
        Source: "lamd1@student.eit.ac.nz"
        
    };
    
    ses.sendEmail(emailParams, function(err, data){
        if (err) console.log(err, err.stack);
        else console.log(data);
    });


    const response = {
        statusCode: 200,
        headers: {'Access-Control-Allow-Origin' : 'https://eit-lamdaiphong-assignment2.s3-ap-southeast-2.amazonaws.com'}, //Fix CORE issue
        body: JSON.stringify('Thank you ' + params['name'] + ' your feedback was recived by EIT!'),
    };
    
    callback(null, response);
};
