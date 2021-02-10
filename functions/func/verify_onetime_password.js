const admin = require('firebase-admin');

module.exports = function(req, res) {
	const code = req.body.code;
	const phone = req.body.phone;

	if(!code || !phone) {
		return res.status(422).send({ error: 'Phone or code must be provided'});
	}

	const code_checked = parseInt(code)
	const phone_checked = String(phone)

	admin.auth().getUser(phone_checked)
		.then(() => {
			admin.database().ref('users/'+ phone_checked).on('value', snapshot => {
				admin.database().ref('users/'+ phone_checked).off();

				const user = snapshot.val();

				if(user.code !== code_checked || !user.codeValid) {
					return res.status(422).send({error: 'Code not valid'});
				}

				admin.database().ref('users/' + phone_checked).update({ codeValid: false });
				admin.auth().createCustomToken(phone_checked)
					.then((token) => res.send({token: token}))
			});
		})
		.catch((err) => res.status(422).send({ error: err}))

	
}