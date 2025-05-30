const settings = require("../settings.json");
const RouterConfigMiddelware = require("../middleware/routerConfig");

module.exports.pressureReport = async function (req, res) {
  let content = await RouterConfigMiddelware.RouterConfig(req, res);

  res.render("pressureReport", {
    title: settings.title,
    companyName: settings.CompanyName,
    username: req.cookies.username,
    content: content,
  });
};
