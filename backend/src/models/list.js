import mongoose from '../services/mongoose'
import { Schema } from 'mongoose';

const listSchema = new Schema({
  ListName: String,
  Items: [String],
  date: { type: Date, default: Date.now }
});

const Lists = mongoose.model('List', listSchema);
export default Lists;
