var express = require('express');
var router = express.Router();
var axios = require('axios');
const puppeteer = require('puppeteer');


router.get('/chantina', async function(req,res,next) {
    // Call Web scraping function and send results
    const ret = SearchChantina().then(ret => res.send(ret) );
});

async function SearchChantina(){
    // Define browser/puppeteer
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    const url = `https://chantina.no`;
    await page.goto(url);

    // Get text from chantina.no
    var mat = await page.evaluate( () =>  document.querySelector('h1.maten').innerText )
    var matpris = await page.evaluate( () =>  document.querySelector('h1.DagensPris').innerText )

    // Get Calender from chantina.no
    const matkalender = await page.evaluate( () =>  Array.from(document.querySelectorAll('p.mat')).map((logo) => logo.innerText) )
    const matkalenderpris = await page.evaluate( () =>  Array.from(document.querySelectorAll('p.pris')).map((logo) => logo.innerText) )
    
    if(mat === ""){
        var today = "Ingenting"
    }else{
        var today = mat
    }
    // Create json data response
    res = {
        today: today,
        todayprice: matpris,
        matkalender: matkalender,
        matkalenderprices: matkalenderpris
    }

    // Return json data
    return res

    // Close browser/puppeteer
    await browser.close();
}

// Export router module
module.exports = router;