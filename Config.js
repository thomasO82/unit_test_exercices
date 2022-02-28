class Config {
   static bdTestName
   static bdNightwatch
   static bdUserName 
   static bdPassword 
   static bdClusterName 
   static bdName 
   static nightwatchBdd
   static port = 8080;

}

if ((process.env.NODE_ENV || '').trim() === "nightwatch") {
   Config.bdName = Config.nightwatchBdd
}

module.exports = Config
