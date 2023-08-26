import { createServer } from "./server";
import { log } from "logger";
import dotenv from "dotenv";
dotenv.config();
import { User } from "types";
const user1: User = {
  id: "1",
  email: "1",
  password: "1",
};
console.log(user1);

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
  log(`api running on http://localhost:${port}`);
});
