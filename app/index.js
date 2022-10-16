require("dotenv").config();

const service = require("./configs/express");
const port = process.env.SERVICE_PORT;
global.__basedir = __dirname + "/..";

async function init() {
  service.start({ port });
}

init();
