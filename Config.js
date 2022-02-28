class Config {
   static bdTestName = "test_users"
   static bdNightwatch = "test_nightwatch"
   static bdUserName = "thomas-o"
   static bdPassword = "Templier82"
   static bdClusterName = "cluster0"
   static bdName = "userManager"
   static port = 8080;

}
if ((process.env.NODE_ENV || '').trim() === "nightwatch") {
   Config.bdName = "test_etoe"
}

module.exports = Config
