import { Schema, model } from 'mongoose';

const memorySchema = new Schema({
  saves: { type: Array, required: true },
  score: { type: Array, required: true },
  mscore: { type: Array, required: true },
  username: { type: String, unique: true, required: true },
});

export default model('MemoryCard', memorySchema);
