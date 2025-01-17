// import { expect, use } from "chai";
// import chaiHttp from "chai-http";
// import user from "../api/routes/user.js";
// import supertest from "supertest";
// import bcryt from "bcryptjs";
// import {
//   validatePassword,
//   validateContact,
//   validateEmail,
// } from "../utils/validation.js";
// import db from "../database/index.js";
// import apiRouter from "../api/index.js";
// import { app } from "../server.js";

// const server = use(chaiHttp);
// console.log(server, "server");

// describe("Register API", () => {

  // beforeEach(async () => {
  //   // Cleanup: Ensure no duplicate users
  //   await db.query("DELETE FROM userdata WHERE username = $1", ["testuser"]);
  // });

  // insert user first time successfully and also user already exists
  // it("insert user first time successfully and also user already exists", async () => {
  //   console.log("------------------------");

  //   let userDetail = {
  //     username: "testuser",
  //     email: "test@example.com",
  //     password: "test@123",
  //     contact: "1234567890",
  //   };

    
  //   const result = await db.query(
  //     "INSERT INTO userdata (username, email, password, contact) VALUES ($1, $2, $3, $4)",
  //     [
  //       userDetail.username,
  //       userDetail.email,
  //       userDetail.password,
  //       userDetail.contact,
  //     ]
  //   );
  //   console.log(result, "data insert or not --------------");
  //   done()

  //   const res =await server.request.execute(app).post("api/user/register").send(userDetail);

  //   expect(res).to.have.status(400);
  //   expect(res.body.message).to.equal("User already exists");
  //   expect(res.body.username).to.equal(userDetail.username);
  //   expect(res.body.email).to.equal(userDetail.email);
 
  // });

  //user already exists
  // it("User already exists", async (done) => {
  //   console.log("-----------------");

  //   let userDetail = {
  //     username: "testuser",
  //     email: "test@example.com",
  //     password: "test@123",
  //     contact: "1234567890",
  //   };

  //   done();
  //   const res = await server.request
  //     .execute(app)
  //     .post("api/user/register")
  //     .send(userDetail);

  //   expect(res).to.have.status(200);
  //   expect(res.body.message).to.equal("Signup data inserted successfully");
  //   expect(res.body.username).to.equal(userDetail.username);
  //   expect(res.body.email).to.equal(userDetail.email);
  //   expect(res.body.contact).to.equal(userDetail.contact);

  //   const result = await db.query("SELECT * FROM userdata WHERE username = $1", [
  //     userDetail.username,
  //   ]);
  //   expect(result.rows.length).to.equal(1);
  //   expect(result.rows[0].username).to.equal(userDetail.username);
    
  // });
// });
