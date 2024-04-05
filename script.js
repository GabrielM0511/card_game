"use strict";

/* 
CWEB 190 - Assignment 1
Author: Gabriel Morales (000466307)
*/

// Array of original set
const set = ["images/2.png", "images/3.png", "images/4.png", "images/5.png",
    "images/6.png", "images/7.png", "images/8.png", "images/9.png", "images/10.png",
    "images/j.png", "images/q.png", "images/k.png", "images/a.png"]

// Shuffle timer 
let coolDown = true;

// Counter for deals
let totalDeals = 0;
let totalShuffles = 0;

// 10 Previous points
let points = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// All points summed up
let pTotalPoints = 0;

// Frequency & Percentage for each card
let freqAndPerc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Shuffling
function shuffle() {

    // Shuffle function only works up to 11 deals
    if (totalDeals < 11) {

        // Only shuflle 10 cards at it time
        if(coolDown){

            // Cooldown for shuffle
            coolDown = false
            setTimeout(() => coolDown = true, 100);

            // Performs the shuffle automatically
            let toShuffle = setTimeout(shuffle, 100)

            // Increases the shuffle count
            totalShuffles++;

            // When the tenth shuffle haappens, the scores will be added.
            if (totalShuffles == 10) {

                // Total deals goes up by 1
                totalDeals++;

                // Get 2 random cards
                let card1 = set[Math.floor((Math.random() * 13))];
                let card2 = set[Math.floor((Math.random() * 13))];
                // IDs for card images to be displayed in HTML
                document.getElementById('shuffleSet1').src = card1;
                document.getElementById('shuffleSet2').src = card2;

                // Scenario where 2 Aces are present
                if (card1 == set[12] && card2 == set[12]) {
                    // Assigns points and stores them
                    points.push(125);
                    points.shift();
                }
                // Scenario where 2 cards are equal
                else if (card1 == card2) {
                    // Assigns points and stores them
                    points.push(((set.indexOf(card1) + 2) + (set.indexOf(card2) + 2)) * 4);
                    points.shift();
                }
                // Any other scenario
                else {
                    // Assigns points and stores them
                    points.push(((set.indexOf(card1) + 2) + (set.indexOf(card2) + 2)));
                    points.shift();
                }

                // Adds up the lastest point 
                pTotalPoints += points[9];
                // ID that displays the lastest point in the HTML
                document.getElementById('pPoints').innerHTML = "<strong>You scored " + points[9] + " points";
                // ID that displays the total points in the HTML
                document.getElementById('pTotalPoints').innerHTML = "<strong>Your total for this session is " + pTotalPoints + " points!</strong>";
                // ID that displays all points acquired in the HTML
                document.getElementById('pPreviousTenDeals').innerHTML = "Your previous 10 point scores were: " + points;
                // ID that displays the total deals played in the HTML
                document.getElementById('pTotalDeals').innerHTML = "My card statistics for a total of " + (totalDeals) + " deals:";

                // Gets Frequency and Percentage
                for (let i = 0; i <= set.length - 1; i++) {
                    if (set[i] == card1 || set[i] == card2) {
                        if (card1 == card2) {
                            freqAndPerc[i] += 2;
                        }
                        else {
                            freqAndPerc[i]++;
                        }
                    }
                }

                // ID that display the frequency and percentage in the table
                for (let i = 0; i < freqAndPerc.length; i++) {
                    let freqCell = document.getElementById(`freq${i}`);
                    freqCell.innerHTML = freqAndPerc[i];
                    let percCell = document.getElementById(`perc${i}`);
                    percCell.innerHTML = Math.round(((freqAndPerc[i] / (totalDeals*2)) * 100) * 1000) / 1000 + "%";
                }
                
                // Resets the shuffle count to 0 for a new deal to take place
                totalShuffles = 0;
                // Closes the automatic shuffle at the 10th shuffle
                clearTimeout(toShuffle);
            }
            else{
                // Get 2 random cards
                let card1 = set[Math.floor((Math.random() * 13))];
                let card2 = set[Math.floor((Math.random() * 13))];
                // IDs for card images to be displayed in HTML
                document.getElementById('shuffleSet1').src = card1;
                document.getElementById('shuffleSet2').src = card2;
            }
        }
    }
}