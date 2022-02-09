/*
Copyright (c) 2022 KindCoder

https://github.com/KindCoder-no/infoscreen/blob/main/LICENSE
*/

// Include Packages
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var axios = require('axios');
const { auth, requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), (req, res) => {
    const users = require('../users.json');
    if(users.includes(req.oidc.user.sub) === true){
        res.render('admin', {
            profile: req.oidc.user
        })
    }else{
        res.send("Monke. <br> SUB: " + req.oidc.user.sub)
    }
    
    //res.send(JSON.stringify(req.oidc.user));
});

router.get('/infoscreen', requiresAuth(), async function (req, res) {
    const users = require('../users.json');
    if(users.includes(req.oidc.user.sub) === true){
        res.render('admin-infoscreen', {
            profile: req.oidc.user
        })
    }else{
        res.send("Monke")
    }
});

router.post('/', requiresAuth(), async function(req, res) {
    //res.send(req.body)
    if(req.body.id === "new"){

    }else{
        if(req.body.delete){
            res.send("Delete")
        }else{
            //res.send("Save")
        }
        // Create API call data
        var data = JSON.stringify({
            "collection": "news",
            "database": "busstavla",
            "dataSource": "Cluster0",
            "update": {
                "message": req.body.message
            },
            "filter": {
                "_id": { 
                    "$oid": req.body.id
                }
            }
        });

        // Create API call config
        var config = {
            method: 'post',
            url: 'https://data.mongodb-api.com/app/data-censq/endpoint/data/beta/action/updateOne',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': process.env.MONGO_API_KEY
            },
            data : data
        };

        // Call API
        let apicall = await axios(config)
        //res.send(apicall.data)
        //res.send(req.body)
        res.redirect('/admin')
    }
});

router.get('/news', async function (req, res) {
    // Create API call data
    var data = JSON.stringify({
        "collection": "news",
        "database": "busstavla",
        "dataSource": "Cluster0"
    });

    // Create API call config
    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-censq/endpoint/data/beta/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.MONGO_API_KEY
        },
        data : data
    };

    // Call API
    let apicall = await axios(config)
    res.send(apicall.data.documents)
});

// Create info data page
router.get('/info', async function (req, res) {
    // Create API call data
    var data = JSON.stringify({
        "collection": "screen",
        "database": "busstavla",
        "dataSource": "Cluster0"
    });

    // Create API call config
    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-censq/endpoint/data/beta/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.MONGO_API_KEY
        },
        data : data
    };

    // Call API
    let apicall = await axios(config)
    res.send(apicall.data.documents[0])
})


// Create info update page
router.post('/info', async function (req, res) {
    // Create API call data 1 
    var data = JSON.stringify({
        "collection": "screen",
        "database": "busstavla",
        "dataSource": "Cluster0"
    });
   

    // Create API call config
    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-censq/endpoint/data/beta/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.MONGO_API_KEY
        },
        data : data
    };

    // Call API
    let apicall = await axios(config)


    var update_data = JSON.stringify({
        "collection": "screen",
        "database": "busstavla",
        "dataSource": "Cluster0",
        "update": {
            "message": req.body.html
        },
        "filter": {
            "_id": { 
                "$oid": apicall.data.documents[0]._id
            }
        }
    });

    // Create API call config for update
    var update_config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-censq/endpoint/data/beta/action/updateOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.MONGO_API_KEY
        },
        data : update_data
    };
    // Call API
    let update_apicall = await axios(update_config)


    //res.send(update_apicall.data)

    res.redirect("/admin")
    //res.send(req.body.html)
})

// Create info update page
router.post('/infoscreen', async function (req, res) {
    // Create API call data 1 
    var data = JSON.stringify({
        "collection": "screen",
        "database": "busstavla",
        "dataSource": "Cluster0"
    });
   

    // Create API call config
    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-censq/endpoint/data/beta/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.MONGO_API_KEY
        },
        data : data
    };

    // Call API
    let apicall = await axios(config)


    var update_data = JSON.stringify({
        "collection": "screen",
        "database": "busstavla",
        "dataSource": "Cluster0",
        "update": {
            "message": req.body.html
        },
        "filter": {
            "_id": { 
                "$oid": apicall.data.documents[0]._id
            }
        }
    });

    // Create API call config for update
    var update_config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-censq/endpoint/data/beta/action/updateOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.MONGO_API_KEY
        },
        data : update_data
    };
    // Call API
    let update_apicall = await axios(update_config)


    //res.send(update_apicall.data)

    res.redirect("/admin/infoscreen")
    //res.send(req.body.html)
})


module.exports = router