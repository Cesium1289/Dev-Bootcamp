const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");
const slugify = require("slugify");
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
    maxLength: [500, "Name cannot exceed 500 characters"],
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
    },
    coordinates: {
      type: [Number],
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
    require: true,
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

//create bootcamp slug from the name
BootCampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

BootCampSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitudeasd],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  //don't save address to DB
  this.address = undefined;
  next();
});

module.exports = mongoose.model("Bootcamp", BootCampSchema);
