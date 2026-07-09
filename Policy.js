import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  policyName: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    default: ''
  },
  covered: {
    type: [String],
    default: []
  },
  notCovered: {
    type: [String],
    default: []
  },
  conditions: {
    type: [String],
    default: []
  },
  risks: {
    type: [String],
    default: []
  }
}, { timestamps: true });

export default mongoose.model('Policy', policySchema);
