import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "you have to provide name"],
    },
    age: {
      type: Number,
      required: [true, "you have to provide age"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
