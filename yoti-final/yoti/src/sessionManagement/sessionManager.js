var redis = require("redis");
const bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client = redis.createClient();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const EXPIRY_TIME = 60 * 5; //5 minute valid sessions

client.on("error", function () {
    console.log("Redis Error " + err);
});

module.exports = {
    addUserToSession: function(fields, session) {
        let associatedUser = 'user:' + fields.yotiId;
        
        //stringifies data provided from Yoti and keeps stored in Redis until expiry time, where user will need to login again
        client.set('user:' + fields.yotiId, JSON.stringify({firstName: fields.firstName, lastName: fields.lastName, yotiId: fields.yotiId, photo: fields.photo}), 'EX', EXPIRY_TIME);

        return associatedUser;
    },

    //gets stringified data that was saved to the Redis Key and parses into JSON object
    getUserYotiDetails: function(session) {
        let userId = session.associatedUser;

        return client.getAsync(userId)
        .then((data) => {
            return JSON.parse(data);
        })
        .catch((e) => console.log(e));

    }

};
