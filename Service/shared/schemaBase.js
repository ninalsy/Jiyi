exports.Person = {
	name: String,
	birthDate: Date,
	gender: {
		type: String,
		enum: ['Male', 'Female']
	},
	email: {
		type: String,
		default: ''
	},
	phones: [{
		label: String,
		number: String
	}],
	userName: String,
	hashed_password: {
		type: String,
		default: ''
	},
	salt: {
		type: String,
		default: ''
	},
	socialAccounts: [{
		acount: String,
		userName: String,
		hashed_password: String
	}],
};

exports.Location = {
	type: {
		type: String
	},
	coordinates: []
};

exports.Address = {
	line1: String,
	line2: String,
	city: String,
	province: String,
	zip: String
};