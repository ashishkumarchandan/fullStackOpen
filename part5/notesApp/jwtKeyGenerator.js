import crypto from "node:crypto";
const c = crypto;
console.log(c.randomBytes(32).toString("hex"));
