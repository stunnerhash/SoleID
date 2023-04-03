import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
	transactionId: { type: String, required: true, unique: true },
	timeStamp:{ type: Number, default: (new Date()).getTime() },
	organizationName:{ type: String, required: true },
	organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	hashCode:{ type: String, required:true },
	fields: {
		name:{
			value:{ type: String},
			isRequired:{ type: Boolean, default:false}
		},
		email:{
			value:{ type: String},
			isRequired:{ type: Boolean, default: false}
		},
		phone:{
			value:{ type: String},
			isRequired:{ type: Boolean, default:false}
		},
		careof:{
			value:{ type: String},
			isRequired:{ type: Boolean, default: false}
		},
		gender:{
			value:{ type: String},
			isRequired:{ type: Boolean, default:false}
		},
		dob:{
			value:{ type: String},
			isRequired:{ type: Boolean, default:false}
		},
		address:{
			value:{ type: String},
			isRequired:{ type: Boolean,	default:false}
		},
		adhaar:{
			value:{ type:String},
			isRequired:{ type:Boolean, default:false}
		}
	},
	description:{ type: String},
	status: {
		type: String,
		enum: ['pending', 'approved', 'rejected'],
		default: 'pending'
	},
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;