const admin = require('firebase-admin');
const twilio = require('../twilio');

module.exports = function(req, res) {
	if(!req.body.phone) {
		return res.status(422).send({error: 'You must provide a valid phone number'});
	}

	const phone = String(req.body.phone);

	//get user model
	admin.auth().getUser(phone)
		.then(useRecord => {
			const code = Math.floor(Math.random()*8999 + 1000);

			//create twilio message model
			twilio.messages.create({
				body: `Your code is ${code}`,
				to: phone,
				from: '+16107081603'
			}, (error) => {
				if(error) {
					return res.status(422).send({error: `Something is wrong: ${error}`})
				}

				//access to the database in firebase to save the code
				//create new collection in DB called users, add a new entry phone
				admin.database().ref('users/'+phone)
					.update({ code: code, codeValid: true },() => {
						res.send({ success: true });
						// res.status(500).send({error: `Server error: ${error}`})
					})

			})

		})
		.catch(error => {
			res.status(422).send({ error: `User is not found: ${error}`})
		})

}