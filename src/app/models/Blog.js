const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Blog = new Schema(
      {
            title: {
                  type: String,
                  maxLength: 100,
            },
            description: {
                  type: String,
                  maxLength: 600,
            },
            deleted:{
                  type : Boolean, default: false
            },
            deletedAt:{
                  type : Date, default: null
            },
            slug: { type: String, slug: "title" },
      },
      { timestamps: true }
);

mongoose.plugin(slug);
Blog.plugin(mongooseDelete, { 
      deletedAt: true,
      overrideMethods: "all" });

module.exports = mongoose.model("Blog", Blog);
