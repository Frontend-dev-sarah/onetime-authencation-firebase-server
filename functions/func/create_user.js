const admin = require('firebase-admin');

module.exports = function(req, res) {
	//verify the user provided a phone
	if(!req.body.phone) {
		return res.status(422).send({ error: 'You must input a phone number' });
	}

	//format phone number(dashes/parens to remove)
	// const phone = String(req.body.phone).replace(/[^\d]/g, "");
	const phone = String(req.body.phone);
    
    //create a new user by that phone, it's an async request
    admin.auth().createUser({ uid: phone })
    	.then(user => res.send(user))
    	.catch(error => res.status(422).send({ error: error}))

    //responsd to the user request
}