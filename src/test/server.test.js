import { expect, should, use } from "chai";
import chaiHttp from "chai-http";
import { app } from "../server.js";
import serverStart from "../common.js";
import db from "../database/index.js";
import bcryt from "bcryptjs";
import {
  validatePassword,
  validateContact,
  validateEmail,
} from "../utils/validation.js";

const server = use(chaiHttp);

before(() => {
  serverStart();
});
describe("First Test Collection", () => {
  // serverStart();

  //server check health api
  it("health welcome API route", function (done) {
    server.request
      .execute(app)
      .get("/health")
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.message).to.equal("Ok, Working fine.");
        done();
      });
  });

  it("insert user first time successfully and also user already exists", async (done) => {
    console.log("test start------------------------ 🚀 ");

    let userDetail = {
      username: "testuser",
      email: "test@example.com",
      password: "test@123",
      contact: "1234567890",
    };

    console.log(userDetail,"user detail------------------------ 🚀 ");
    done()
    await db.query(
      "INSERT INTO userdata (username, email, password, contact) VALUES ($1, $2, $3, $4)",
      [
        userDetail.username,
        userDetail.email,
        userDetail.password,
        userDetail.contact,
      ]
    );

    console.log("Data inserted successfully.---------- 🚀");

    try{
    const res = await server.request
      .execute
      .post("api/user/register")
      .send(userDetail);

    expect(res).to.have.status(400);
    expect(res.body.message).to.equal("User already exists");
    expect(res.body.username).to.equal(userDetail.username);
    expect(res.body.email).to.equal(userDetail.email);
    }
    catch(err){
      console.log("Error.---------- 🚀");
      
    }
    
  });

  // it("should test two values...", () => {
  //   let expectesVal = 10;
  //   let actualVal = 10;

  //   expect(actualVal).to.be.equal(expectesVal);
  // });
});
