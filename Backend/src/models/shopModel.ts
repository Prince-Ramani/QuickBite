import mongoose from "mongoose";

interface shopPatnersInteface {
  name: String;
  profilePicture: String?;
}

const shopSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  shopAddress: {
    type: String,
    required: true,
  },
  shopPartners: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        partnerPicture: {
          type: String,
          required: false,
          default: "",
        },
      },
    ],

    validate: [
      {
        validator: function (v: shopPatnersInteface[]) {
          return v.length >= 1;
        },
        message: "A shop must have atleast one partner.",
      },
      {
        validator: function (v: shopPatnersInteface[]) {
          return v.length <= 4;
        },
        message: "A shop must have maximum four partners mentioned.",
      },
    ],
    required: true,
  },

  shopPicture: {
    type: [String],
    required: true,
    defualt: [],
    validate: [
      {
        validator: function (v: String[]) {
          return v.length >= 1;
        },
        message: "A shop must provide atleast one shop image.",
      },
      {
        validator: function (v: String[]) {
          return v.length <= 4;
        },
        message: "A shop can upload a maximum of 4 images.",
      },
    ],
  },
});

const Shop = mongoose.model("Shop", shopSchema);
