const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const BlogScheme = new Schema(
      {
            title: {
                  type: String,
                  maxLength: 100,
            },
            description: {
                  type: String,
                  maxLength: 600,
            },
            deleted: {
                  type: Boolean,
                  default: false,
            },
            deletedAt: {
                  type: Date,
                  default: null,
            },
            slug: { type: String, slug: "title" },
      },
      { timestamps: true }
);
// custom query helpers
BlogScheme.query.sortable = function (req) {
      if(req.query.hasOwnProperty('_sort')){
            const isValidType = ['asc', 'desc'].includes(req.query.type);
                  return this.sort({
                        [req.query.collumn] : isValidType ? req.query.type : 'desc'
                  })
            }
      return this
};

// add plugin
mongoose.plugin(slug);
BlogScheme.plugin(mongooseDelete, {
      deletedAt: true,
      overrideMethods: "all",
});

module.exports = mongoose.model("Blog", BlogScheme);
