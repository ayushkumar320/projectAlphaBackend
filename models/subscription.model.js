import mongoose from "mongoose";

const subscriptionModel = new mongoose.Schema({
  plans: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    }
  }
})

const Subscription = mongoose.model("Subscription", subscriptionModel);
export default Subscription;
