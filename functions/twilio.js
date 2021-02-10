//install twilio by npm install first
const twilio = require('twilio');

const accountSid = 'ACfc9bd739dd21fdbd8fe643e02b2a904';//fake one
const authToken = '37cbc58f3428eddd66fbc25755885a5';//fake one

module.exports = new twilio.Twilio(accountSid, authToken);