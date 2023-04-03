import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	userId: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	lastUpdated:{type: String, required: true, default: (new Date()).getTime()},
	email: {
		type: String, required: true, unique: true,
		validate: {
			validator: async function(value) {
				const count = await this.model('User').countDocuments({ email: value });
				return count === 0;
			},
			message: props => `${props.value}$ already exists`
		}
	},
	phone: { type: String,},
	careof:{ type:String},
	gender: { type: String},
	dob:{ type: String },
	address: { type:String	},
	adhaar: { type: String },
	requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request'}]
});

const User = mongoose.model('User', userSchema);

export default User;
