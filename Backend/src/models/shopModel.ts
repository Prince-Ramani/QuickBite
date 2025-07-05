import mongoose from "mongoose";

interface shopPatnersInteface {
  name: String;
  profilePicture: String | undefined;
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
  shopEmail: {
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

    userID: {
      type: mongoose.Schema.Types.ObjectId,
      rel: "User",
      required: true,
    },

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
  shopLogo: {
    type: String,
    required: false,
    default: "",
  },

  shopPictures: {
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
