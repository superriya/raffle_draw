$(document).ready(function() {
    var test = 0;
    // $(".round").addClass("ani1");
});
const ENTRANTS = [];
const all_Entrants = [];
//adding variables for music function
var audio, playbtn, mutebtn, seek_bar;
var initial_flag = "True";
let iterative_variable = 0;
var name_1 = "jiv";
var name_2 = "jiv";
var name_3 = "jiv";
var name_4 = "jiv";
const roundDiv1 = document.querySelector(".round");
const roundDiv2 = document.querySelector(".round.round2");
const roundDiv3 = document.querySelector(".round.round3");
const roundDiv4 = document.querySelector(".round.round4");
const rollEl = document.querySelector(".roll");
const rollWEl = document.querySelector(".roll.roll-winner");
const roundTitle = document.querySelector(".round-title");
const roundTitle2 = document.querySelector(".round-title.round-title2")
const roundTitle3 = document.querySelector(".round-title.round-title3")
const roundTitle4 = document.querySelector(".round-title.round-title4")
const rollAgainEl = document.querySelector(".roll-again");
const namesEl = document.querySelector(".names");
const namesEl2 = document.querySelector(".names2");
const namesEl3 = document.querySelector(".names3");
const namesEl4 = document.querySelector(".names4");
const winnerEl = document.querySelector(".winner");
const rollNewField = document.querySelector(".new_field1");
const timeoutDot = document.querySelector(".roll.roll-winner")
const timeoutbubbleDot = document.querySelector(".bubble")


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
    if (initial_flag == "True") {
        iterative_variable++;
        initial_flag = "False";
        // alert("Gi", iterative_variable);
    }
    const rand = Math.floor(Math.random() * ENTRANTS.length);
    const name = ENTRANTS[rand];
    /*if (iterative_variable % 4 == 1) {
        namesEl.innerText = name;
        iterative_variable++;
        document.getElementsByClassName("round1").style.background = "blue";
    } else if (iterative_variable % 4 == 2) {
        namesEl2.innerText = name;
        iterative_variable++;
    } else if (iterative_variable % 4 == 3) {
        namesEl3.innerText = name;
        iterative_variable++;
    } else {
        namesEl4.innerText = name;
        iterative_variable++;
    } */
    // namesEl.innerText = name;
    // namesEl2.innerText = name;
    // namesEl3.innerText = name;
    // namesEl4.innerText = name;
    name_4 = name_3;
    name_3 = name_2;
    name_2 = name_1;
    name_1 = name;
    namesEl.innerText = name_1;
    namesEl2.innerText = name_2;
    namesEl3.innerText = name_4;
    namesEl4.innerText = name_3;
}

function rollClick() {
    roundTitle.classList.add("hide");
    roundTitle2.classList.add("hide");
    roundTitle3.classList.add("hide");
    roundTitle4.classList.add("hide");
    rollEl.classList.add("hide");
    rollWEl.classList.remove("hide");
    rollAgainEl.classList.add("hide");
    winnerEl.classList.add("hide");
    namesEl.classList.remove("hide");
    namesEl2.classList.remove("hide");
    namesEl3.classList.remove("hide");
    namesEl4.classList.remove("hide");
    // rollNewField.classList.add("hide");
    timeoutbubbleDot.classList.remove("hide");
    timeoutDot.classList.add("hide")
        // roundDiv1.classList.remove("hide");
        // roundDiv2.classList.remove("hide");
        // roundDiv3.classList.remove("hide");
        // roundDiv4.classList.remove("hide");


    //start playing sound
    audio = new Audio();
    audio.src = "audio/jiya-kabtak.mp3";
    audio.loop = true;
    audio.play();

    const x_var = Math.random() * (100 - 30) + 30;
    const y_var = x_var * 300;
    setDeceleratingTimeout(randomName, 300, x_var);

    setTimeout(() => {
        namesEl.classList.add("hide");
        namesEl2.classList.add("hide");
        namesEl3.classList.add("hide");
        namesEl4.classList.add("hide");
        winnerEl.classList.remove("hide");
        rollAgainEl.classList.remove("hide");
        roundTitle.classList.remove("hide");
        roundTitle2.classList.remove("hide");
        roundTitle3.classList.remove("hide");
        roundTitle4.classList.remove("hide");
        // roundDiv1.classList.add("hide");
        // roundDiv2.classList.add("hide");
        // roundDiv3.classList.add("hide");
        // roundDiv4.classList.add("hide");
        timeoutDot.classList.add("hide");
        timeoutbubbleDot.classList.add("hide");


        const winner = namesEl.innerText;
        winnerEl.innerText = winner;
        initial_flag = "True";
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