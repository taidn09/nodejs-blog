module.exports = function SortMiddleware(req, res, next) {
      res.locals._sort = {
            enabled: false,
            type: "default",
      };
      if (req.query.hasOwnProperty("_sort")) {
            //       res.locals._sort.enabled = true;
            //       res.locals._sort.type = req.query.type;
            //       res.locals._sort.collumn = req.query.collumn;
            Object.assign(res.locals._sort, {
                  enabled: true,
                  type: req.query.type,
                  collumn: req.query.collumn,
            });
      }
      next();
};
