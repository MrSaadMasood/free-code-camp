require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require("dns")

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

let counter = 0;
let map = {}

// Your first API endpoint
app.post("/api/shorturl", (req, res)=>{
  const { url } = req.body
  if(!url.startsWith("https://"))
    return res.json({ error : "invalid url"})
  let urlToUse = new URL(url)
  dns.lookup(urlToUse.hostname.replace("www.", ""), 
  (err)=>{
    if(err) return res.json({ error : "invalid url"})
    counter++
    map[counter.toString()] = url;
    return res.json({
      original_url: url,
      shorturl : counter
    })
  })
})

app.get("/api/shorturl/:shorturl", (req, res)=>{
  const shorturl = req.params.shorturl;
  const redirectionUrl = map[shorturl]
  if(!redirectionUrl) return res.json({ error : "invalid url"})
  return res.redirect(redirectionUrl)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
