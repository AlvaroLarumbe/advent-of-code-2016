/**
 * Day 1: No Time for a Taxicab
 * 
 * Usage: node taxicab.distance.js ../data/input.txt
 */

var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

'use strict';

var src = [0, 0];
var dst = [0, 0];
var lastDirection = 'N'; // North, East, South, West
var movements = [];

var input = fs.readFileAsync(process.argv[2], { encoding: 'utf8', flag: 'r' });

input
    .then(function(data) {
        var movements = data.split(', ');

        movements.forEach(function(val) {
            move(val[0], val.substr(1));
        });

        console.log('Source: [' + src[0] + ', ' + src[1] + ']');
        console.log('Destination: [' + dst[0] + ', ' + dst[1] + ']');
        console.log('Taxicab Distance: ' + (Math.abs(src[0] - dst[0]) + Math.abs(src[1] - dst[1])));
    })
    .catch(function(data) {
        console.log(data.cause);
    });

function move(direction, steps) {
    steps = parseInt(steps);

    if (direction === 'R') {
        switch (lastDirection) {
            case 'N':
                dst[0] += steps;
                lastDirection = 'E';
                break;
            case 'E':
                dst[1] -= steps;
                lastDirection = 'S';
                break;
            case 'S':
                dst[0] -= steps;
                lastDirection = 'W';
                break;
            case 'W':
                dst[1] += steps;
                lastDirection = 'N';
                break;
        }
    } else if (direction === 'L') {
        switch (lastDirection) {
            case 'N':
                dst[0] -= steps;
                lastDirection = 'W';
                break;
            case 'E':
                dst[1] += steps;
                lastDirection = 'N';
                break;
            case 'S':
                dst[0] += steps;
                lastDirection = 'E';
                break;
            case 'W':
                dst[1] -= steps;
                lastDirection = 'S';
                break;
        }
    }
}
