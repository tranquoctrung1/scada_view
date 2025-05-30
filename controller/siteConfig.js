const settings = require("../settings.json");
const RouterConfigMiddelware = require("../middleware/routerConfig");

module.exports.siteConfig = async function (req, res) {
  let content = await RouterConfigMiddelware.RouterConfig(req, res);
  res.render("siteConfig", {
    title: settings.title,
    companyName: settings.CompanyName,
    username: req.cookies.username,
    content: content,
  });
};
