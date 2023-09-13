import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
	password: { 
		type: String, 
		default: function () { 
			const hash = bcrypt.hashSync('12345678', 10);
      		return hash;
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

userSchema.methods.authenticate = function (password) {
  	return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model('User', userSchema);

export default User;