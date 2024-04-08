const mongoose = require("mongoose");

const BootCampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true, //no fields can be the same name
    trim: true, //removes whitespace
    maxLength: [50, "Name cannot exceed 50 characters"],
  },
  slug: String, //URL friendly version of the bootcamp name i.e. Test Camp => test-camp
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxLength: [50, "Name cannot exceed 50 characters"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTPS or HTTPS",
    ],
  },
  phone: {
    type: String,
    maxLength: [20, "Phone number cannot exceed 20 characters"],
  },
  email: {
    type: String,
    email: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  //GEOjson point
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    //Array of strings
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating cannot be less than 1"],
    max: [10, "Rating cannot be greater than 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bootcamp", BootCampSchema);