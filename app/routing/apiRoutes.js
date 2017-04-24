/**
 * Created by maade on 4/22/17.
 */

var friendsData = require('../data/friends.js');
var data = {};
var bestMatch;


module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friendsData);
    });


    app.post('/api/friends', function (req, res) {
        data = req.body;
        friendsData.push(data);
        getMatch();
        res.json(bestMatch);
    });


};
// ===========================================================

function getMatch() {
    for (var i = 0; i < friendsData.length; i++) {
        var obj = friendsData[friendsData.length -1].scores;
        var objArray = friendsData[i].scores;
        var match = 0;
        for (var k = 0; k < obj.length; k++) {
            var obj1 = Number(obj[k]);
            var obj2 = Number(objArray[k]);
            if (obj1 - obj2 < 0) {
                match += ((obj1 - obj2) * -1);
            } else {
                match += (obj1 - obj2);
            }

        }
        friendsData[i].match = match;
    }
    friendsData.sort(function(a, b) {
        return (a.match > b.match) ? 1 : ((b.match > a.match) ? -1 : 0);

        });
    bestMatch = friendsData[1];
    console.log(bestMatch);
}