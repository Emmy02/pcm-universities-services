exports = module.exports = (app, mongoose) => {
  const universitySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    "state-province": {
      type: String,
      required: false,
    },
    alpha_two_code: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    web_pages: {
      type: [String],
      required: false,
    },
    domains: {
      type: [String],
      required: false,
    },
  });

  mongoose.model("university", universitySchema);
};
