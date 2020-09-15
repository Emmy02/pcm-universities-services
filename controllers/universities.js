const mongoose = require("mongoose");
const university = require("../models/university");
const University = mongoose.model("university");
const data = require("./../seeds/data");

const routes = {
  findAllUniversities: (req, res) => {
    const { name, country } = req.query;

    const params = name
      ? {
          name: { $regex: new RegExp(name, "i") },
          country: { $regex: new RegExp(country, "i") },
        }
      : {};
    University.find(params, (err, universities) => {
      if (err) res.send(500, err.message);

      res.status(200).jsonp(universities);
    });
  },

  findById: (req, res) => {
    const { id } = req.params;
    University.findById(id, (err, university) => {
      if (err) return res.send(500, err.message);
      res.status(200).jsonp(university);
    });
  },

  addUniversity: (req, res) => {
    const { name, alpha_two_code, country, web_pages, domains } = req.body;

    const university = new University({
      name,
      alpha_two_code,
      country,
      web_pages,
      domains,
      "state-province": req.body["state-province"],
    });

    university.save((err, university) => {
      if (err) return res.send(500, err.message);
      res.status(200).jsonp(university);
    });
  },

  addUniversitiesBulk: (req, res) => {
    data.map((u) => {
      const university = new University(u);
      university.save((err, university) => {
        if (err) console.log(err);
      });
    });

    res.status(200).jsonp({ ok: true });
  },

  updateUniversity: (req, res) => {
    const { id } = req.params;
    University.findById(id, (err, university) => {
      const { name, alpha_two_code, country, web_pages, domains } = req.body;
      university.name = name;
      university.alpha_two_code = alpha_two_code;
      university.country = country;
      university.web_pages = web_pages;
      university.domains = domains;
      university["state-province"] = req.body["state-province"];

      university.save((err) => {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(university);
      });
    });
  },
  deleteUniversity: (req, res) => {
    const { id } = req.params;
    University.findById(id, (err, university) => {
      university.remove((err) => {
        if (err) return res.send(500, err.message);
        res.status(200);
      });
    });
  },
};

module.exports = routes;
