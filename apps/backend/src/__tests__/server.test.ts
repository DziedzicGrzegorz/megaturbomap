import supertest from "supertest";
import {createServer} from "../server";

describe("server", () => {
    it("health check returns 200", async () => {
        await supertest(createServer())
            .get("/healthz")
            .expect(200)
            .then((res) => {
                expect(res.body.ok).toBe(true);
            });
    });

    it("message endpoint says hello", async () => {
        await supertest(createServer())
            .get("/message/jared")
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({message: "hello jared"});
            });
    });
    it("'/error' endpoint throws server error", (done) => {
        supertest(createServer())
            .get("/error")
            .then(response => {
                expect(response.status).toBe(400); // Expect HTTP status code 400
                expect(response.body).toEqual({ message: "test Error" }); // Expect error message to be "test Error"
                done();
            })
            .catch(err => done(err));
    });

    it("'/InternalError' endpoint throws internal error", async () => {
        await supertest(createServer())
            .get("/InternalError")
            .expect(500) // The HTTP status code for general Error is 500
            .then((res) => {
                expect(res.body).toEqual({message: "Internal Server Error"});
            });
    });
});
