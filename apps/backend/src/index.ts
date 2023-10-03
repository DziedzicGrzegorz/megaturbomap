import { createServer } from "./server";
import { log } from "logger";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5001;
const server = createServer();


server.listen(port, () => {
log(`api running on http://localhost:${port}`);
});