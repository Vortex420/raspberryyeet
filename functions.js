
var fs = require('fs');
const origin = require('./json/origin.json');
const spotify = require('./json/spotify.json')
const Discord = require('discord.js');
const { Console } = require('console');

let RED = "\x1b[31m";
let RESET = "\x1b[0m";
let GREEN = "\x1b[32m";
let YELLOW = "\x1b[33m";
let PINK = "\x1b[35m";
let BLUE = "\x1b[36m";



module.exports.GetJsonFiles = 
function GetJsonFiles()
    {
        fs.readdir('./json', function(err, items) {
            for (var i=0; i<items.length; i++) 
            {
                console.log(YELLOW + items[i] + RESET);
            }
        });
    }

module.exports.Log = 
function Log() {
    console.clear();
    console.log('<------------------------------>');
    console.log(`${BLUE}Stock${RESET}`);
    console.log('<------------------------------>');
    if(origin.stock.length <= 5){
        console.log(RED + 'Origin:' + " " + origin.stock.length + RESET)
    }else if(origin.stock.length <= 10){
        console.log(PINK + 'Origin:' + " " + origin.stock.length + RESET)
    }else{
        console.log(GREEN + 'Origin:' + " " + origin.stock.length + RESET)
    }
    if(spotify.stock.length <= 5){
        console.log(RED + 'Spotify:' + " " + spotify.stock.length + RESET)
    }else if(spotify.stock.length <= 10){
        console.log(PINK + 'Spotify:' + " " + spotify.stock.length + RESET)
    }else{
        console.log(GREEN + 'Spotify:' + " " + spotify.stock.length + RESET)
    }
    console.log('<------------------------------>');
    console.log(`${BLUE}Generator Files${RESET}`);
    console.log('<------------------------------>');
    this.GetJsonFiles();
}