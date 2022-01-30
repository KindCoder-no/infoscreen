var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/news', async function(req,res) {
    var data = JSON.stringify({
        "collection": "news",
        "database": "busstavla",
        "dataSource": "Cluster0"
        
    });
                
    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-censq/endpoint/data/beta/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'yulUYFeZ90HcZfXEFSugFiiiHmKrzioiWNITZyOWIQeeesZKGU5zrQBg8FQVAvKI'
        },
        data : data
    };
                
    let apicall = await axios(config)
    
    var result = []
    var apiresult = apicall.data.documents
    //console.log(apiresult)
    //for(var i in apiresult)
        //console.log(i)
    apiresult.forEach(index => {
        result.push(index.message)
    })
    res.send(result)
})

// Export router module
module.exports = router;