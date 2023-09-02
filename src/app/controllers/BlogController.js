const Blog = require("../models/Blog");
const { multipleMongooseToObject, mongooseToObject } = require("../../utils/mongoose");

class BlogController {
      index(req, res, next) {
            Promise.all([Blog.find({}), Blog.countDocumentsWithDeleted({ deleted: true })])
                  .then(([data, count]) => {
                        res.render("list", {
                              data: multipleMongooseToObject(data),
                              count,
                        });
                  })
                  .catch(next);
      }
      detail(req, res, next) {
            const slug = req.params.slug;
            Blog.findOne({ slug: slug })
                  .then(data => {
                        res.render("detail", {
                              data: mongooseToObject(data),
                        });
                  })
                  .catch(next);
      }
      add(req, res, next) {
            res.render("create");
      }
      submitAdd(req, res, next) {
            const blog = new Blog(req.body);
            blog.save()
                  .then(_ => res.redirect("/"))
                  .catch(next);
      }
      edit(req, res, next) {
            const id = req.params.id;
            Blog.findById(id)
                  .then(data => {
                        res.render("edit", {
                              data: mongooseToObject(data),
                        });
                  })
                  .catch(next);
      }
      submitEdit(req, res, next) {
            Blog.updateOne({ _id: req.params.id }, req.body)
                  .then(() => {
                        res.redirect("/");
                  })
                  .catch(next);
      }
      delete(req, res, next) {
            Blog.delete({ _id: req.params.id })
                  .then(() => {
                        res.redirect("/");
                  })
                  .catch(next);
      }
      trash(req, res, next) {
            Blog.findWithDeleted({ deleted: true })
                  .then(data => {
                        res.render("trash", {
                              data: multipleMongooseToObject(data),
                        });
                  })
                  .catch(next);
      }
      restore(req, res, next) {
            Blog.restore({ _id: req.params.id })
                  .then(() => {
                        res.redirect("back");
                  })
                  .catch(next);
      }
      destroy(req, res, next) {
            Blog.deleteOne({ _id: req.params.id })
                  .then(() => {
                        res.redirect("back");
                  })
                  .catch(next);
      }
}

module.exports = new BlogController();
