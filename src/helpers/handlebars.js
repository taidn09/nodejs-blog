const moment = require("moment");
const Handlebars = require("handlebars");
module.exports = {
      sum: (a, b) => a + b,
      fortmatDate: (format, timestamp) => moment(timestamp).format(format),
      limitString: (string, limit) => (string.length >= limit ? string.substring(0, limit) + "..." : string),
      sortable: (field, sort) => {
            const sortType = field === sort.collumn ? sort.type : "default";
            const icons = {
                  default: "bi bi-arrow-down-up",
                  desc: "bi bi-arrow-down",
                  asc: "bi bi-arrow-up",
            };
            const types = {
                  default: "desc",
                  desc: "asc",
                  asc: "desc",
            };
            const icon = icons[sortType];
            const type = types[sortType];
            const href = Handlebars.Utils.escapeExpression(`?_sort&collumn=${field}&type=${type}`);
            const output = `<a href="${href}"><i class="${icon}"></i></a>`;
            return new Handlebars.SafeString(output);
      },
};
