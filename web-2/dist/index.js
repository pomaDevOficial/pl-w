"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const c_server_1 = require("./server/c.server");
require("dotenv/config");
const app = new c_server_1.App();
app.Start(() => { });
