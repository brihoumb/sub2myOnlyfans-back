import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  id: Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

export default model('User', userSchema);
