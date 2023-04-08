import mongoose from 'mongoose'

const organizationSchema = new mongoose.Schema({
	organizationId: { type: String, required: true, unique: true },
	name:{ type: String, require: true },
	registrationNumber: { type: String },
	password: { 
		type: String, 
		default: function () { 
			const hash = bcrypt.hashSync('12345678', 10);
      		return hash;
		} 
	},
	privateKey: { type:String, default:"7" },
    publicKey: { type: String, default: "7" },
	transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }]
});

userSchema.methods.authenticate = function (password) {
  	return bcrypt.compareSync(password, this.password);
};

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;