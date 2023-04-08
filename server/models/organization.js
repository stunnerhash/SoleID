import mongoose from 'mongoose'

const organizationSchema = new mongoose.Schema({
	organizationId: { type: String, required: true, unique: true },
	name:{ type: String, require: true },
	registrationNumber: { type: String },
	privateKey:{ type:String, default:"7" },
    publicKey: { type: String, default: "7" },
	transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }]
});

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;