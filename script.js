const ENTRANTS = [];
const all_Entrants = [];
//adding variables for music function
var audio, playbtn, mutebtn, seek_bar;

const rollEl = document.querySelector(".roll");
const rollAgainEl = document.querySelector(".roll-again");
const namesEl = document.querySelector(".names");
const winnerEl = document.querySelector(".winner");
const rollNewField = document.querySelector(".new_field1");


//const { generateKeyPair } = require('crypto');
//get data from google sheet
//const fs = require('fs');
//const { GoogleSpreadsheet } = require('google-spreadsheet');
var google_sheet = "https://docs.google.com/spreadsheets/d/12WwHNjKi5X54UMOn78L3T5E6TZC13vqDtI-bkTHWEuM/edit?usp=sharing";
var spreadsheetId = "12WwHNjKi5X54UMOn78L3T5E6TZC13vqDtI-bkTHWEuM";
var json_linnk = "https://spreadsheets.google.com/feeds/cells/12WwHNjKi5X54UMOn78L3T5E6TZC13vqDtI-bkTHWEuM/1/public/full?alt=json";

function readSheet() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", json_linnk, false);
    xmlHttp.send(null);
    var json_response = JSON.parse(xmlHttp.responseText);
    //console.log(json_response);

    console.log(json_response.feed.entry["3"].content);

    for (i = 3; i < json_response.feed.entry.length; i++) {
        console.log(json_response.feed.entry[i]);
        if (i % 2 != 0) {
            all_Entrants.push(json_response.feed.entry[i].content.$t);
            console.log(json_response.feed.entry[i].content.$t);
        }
    }
    // alert("Page is loaded");
    // get unique values of all_Entrants into ENTRANTS
    let unique_data = [...new Set(all_Entrants)];
    for (const item in unique_data) {
        ENTRANTS.push(unique_data[item]);
    }
    console.log(all_Entrants);
    console.log(ENTRANTS);
}

//playPause function
function playPause() {
    if (audio.paused) {
        audio.play();
        //playbtn.style.background = "url(https://image.flaticon.com/icons/svg/189/189889.svg) no-repeat";
    } else {
        audio.pause();
        //playbtn.style.background = "url(https://image.flaticon.com/icons/svg/148/148744.svg) no-repeat";
    }
}

function randomName() {
    const rand = Math.floor(Math.random() * ENTRANTS.length);
    const name = ENTRANTS[rand];
    namesEl.innerText = name;
}

function rollClick() {
    rollEl.classList.add("hide");
    rollAgainEl.classList.add("hide");
    winnerEl.classList.add("hide");
    namesEl.classList.remove("hide");
    rollNewField.classList.add("hide");


    //start playing sound
    audio = new Audio();
    audio.src = "https://www.soundjay.com/free-music/midnight-ride-01a.mp3";
    audio.loop = true;
    audio.play();

    const x_var = Math.random() * (100 - 30) + 30;
    const y_var = x_var * 100;
    setDeceleratingTimeout(randomName, 10, x_var);

    setTimeout(() => {
        namesEl.classList.add("hide");
        winnerEl.classList.remove("hide");
        rollAgainEl.classList.remove("hide");

        const winner = namesEl.innerText;
        winnerEl.innerText = winner;
        //pause the sound
        audio.pause();
        winnerEl.innerHTML = `<span>And the winner is...</span><br>${winner}`;
    }, y_var);
}

function setDeceleratingTimeout(callback, factor, times) {
    const internalCallback = ((t, counter) => {
        return () => {
            if (--t > 0) {
                setTimeout(internalCallback, ++counter * factor);
                callback();
            }
        };
    })(times, 0);

    setTimeout(internalCallback, factor);
}