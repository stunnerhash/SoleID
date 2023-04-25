import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
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

organizationSchema.methods.authenticate = function (password) {
	console.log(this.password+"this "+password)
	console.log(bcrypt.compareSync(password, this.password))
  	return bcrypt.compareSync(password, this.password);
};

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;