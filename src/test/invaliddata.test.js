// import { expect, use } from "chai";
// import chaiHttp from "chai-http";
// import { jwtDecode } from "jwt-decode";
// import db from "../database/index.js";
// import serverStart from "../common.js";

// const server = use(chaiHttp);

// before(() => {
//   serverStart();
// });

// // const userData = {
// //   username: "newuser",
// //   email: "newuser@gmail.com",
// //   password: "password@123",
// //   contact: "9876543210",
// // };

// let authToken = "";
// describe("POST /register", () => {
//   const data = {
//     name: "newuser",
//   };

//   before(() => {
//     db.query("delete from userdata where username = $1", [data.name]);
//   });

//   describe("Sign up field validtion", () => {
//     //username is require
//     it("username is require", (done) => {
//       const userData = {
//         username: "",
//         email: "",
//         password: "",
//         contact: "",
//       };

//       console.log("---------------: username is require: --------------");

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .post("/register")
//         .send(userData)
//         .end((err, res) => {
//           if (err) {
//             console.log("-------------", err, "-------------");
//           }

//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           // Assert the response status and message
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal("Username is requrie");
//           done();
//         });
//     });

//     //email is require
//     it("email is require", (done) => {
//       const userData = {
//         username: "newuser",
//         email: "",
//         password: "",
//         contact: "",
//       };

//       console.log("---------------: email is require: --------------");

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .post("/register")
//         .send(userData)
//         .end((err, res) => {
//           if (err) {
//             console.log("-------------", err, "-------------");
//           }

//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           // Assert the response status and message
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal("Email is requrie");
//           done();
//         });
//     });

//     // valid email format
//     it("valid email format", (done) => {
//       const userData = {
//         username: "newuser",
//         email: "newuser@gmail",
//         password: "",
//         contact: "",
//       };

//       console.log("---------------: valid email format: --------------");

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .post("/register")
//         .send(userData)
//         .end((err, res) => {
//           if (err) {
//             console.log("-------------", err, "-------------");
//           }

//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           // Assert the response status and message
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal("Enter valid Email format.");
//           done();
//         });
//     });

//     //password is require
//     it("password is require", (done) => {
//       const userData = {
//         username: "newuser",
//         email: "newuser@gmail.com",
//         password: "",
//         contact: "",
//       };

//       console.log("---------------: password is require: --------------");

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .post("/register")
//         .send(userData)
//         .end((err, res) => {
//           if (err) {
//             console.log("-------------", err, "-------------");
//           }

//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           // Assert the response status and message
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal("Password is required");
//           done();
//         });
//     });

//     // valid password format
//     it("valid password format", (done) => {
//       const userData = {
//         username: "newuser",
//         email: "newuser@gmail.com",
//         password: "newuser",
//         contact: "",
//       };

//       console.log("---------------: valid password format: --------------");

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .post("/register")
//         .send(userData)
//         .end((err, res) => {
//           if (err) {
//             console.log("-------------", err, "-------------");
//           }

//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           // Assert the response status and message
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal(
//             "Password must be 8 charcters, one special symbol, one numeric, on Alphabet."
//           );
//           done();
//         });
//     });

//     //contact is require
//     it("contact is require", (done) => {
//       const userData = {
//         username: "newuser",
//         email: "newuser@gmail.com",
//         password: "password@123",
//         contact: "",
//       };

//       console.log("---------------: contact is require: --------------");

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .post("/register")
//         .send(userData)
//         .end((err, res) => {
//           if (err) {
//             console.log("-------------", err, "-------------");
//           }

//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           // Assert the response status and message
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal("Contact is requrie");
//           done();
//         });
//     });

//     // valid contact format
//     it("valid contact format", (done) => {
//       const userData = {
//         username: "newuser",
//         email: "newuser@gmail.com",
//         password: "password@123",
//         contact: "12345",
//       };

//       console.log("---------------: valid contact format: --------------");

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .post("/register")
//         .send(userData)
//         .end((err, res) => {
//           if (err) {
//             console.log("-------------", err, "-------------");
//           }

//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           // Assert the response status and message
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal("Contact must be 10 digit");
//           done();
//         });
//     });
//   });

//   describe("Login field validtion", () => {
//     // const loginData = {
//     //   emailOrContact: "newuser@example.com",
//     //   password: "password@123",
//     // };

//     // emali or contact is required
//     it("emali or contact is required", (done) => {
//       console.log(
//         "--------------- : emali or contact is required : --------------"
//       );

//       const loginData = {
//         emailOrContact: "",
//         password: "",
//       };

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .post("/login")
//         .send(loginData)
//         .end((err, res) => {
//           if (err) {
//             console.log(err);
//           }
//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           expect(res.status).to.equal(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal("Email Or Contact is requrie");
//           done();
//         });
//     });

//     // valid emali or contact
//     it("valid emali or contact", (done) => {
//       console.log("--------------- : valid emali or contact : --------------");

//       const loginData = {
//         emailOrContact: "newuser@gmail",
//         password: "",
//       };

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .post("/login")
//         .send(loginData)
//         .end((err, res) => {
//           if (err) {
//             console.log(err);
//           }
//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           expect(res.status).to.equal(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal(
//             "If you use email enter valid email, If you use contact enter valid contact."
//           );
//           done();
//         });
//     });

//     // password is required
//     it("password is required", (done) => {
//       console.log("--------------- : password is required : --------------");

//       const loginData = {
//         emailOrContact: "newuser@gmail.com",
//         password: "",
//       };

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .post("/login")
//         .send(loginData)
//         .end((err, res) => {
//           if (err) {
//             console.log(err);
//           }
//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           expect(res.status).to.equal(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal("Password is required");
//           done();
//         });
//     });

//     // valid password
//     it("valid password", (done) => {
//       console.log("--------------- : valid password : --------------");

//       const loginData = {
//         emailOrContact: "newuser@gmail.com",
//         password: "password",
//       };

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .post("/login")
//         .send(loginData)
//         .end((err, res) => {
//           if (err) {
//             console.log(err);
//           }
//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           expect(res.status).to.equal(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal(
//             "Password must be 8 charcters, one special symbol, one numeric, on Alphabet."
//           );
//           done();
//         });
//     });
//   });

//   // todo add validation
//   describe("todo insert field validation", () => {
//     // const todoData = {
//     //   title: "new user title",
//     //   description: "new user description",
//     // };

//     let token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg3LCJpYXQiOjE3Mzc2MjMyMzAsImV4cCI6MTczNzcwOTYzMH0.lqiV08GSwoAvJaspPiNysvh03mvJ-FEIEDX7OINc0is";

//     // title require
//     it("title require", (done) => {
//       const todoData = {
//         title: "",
//         description: "",
//       };

//       console.log("--------------- : title require : --------------");

//       server.request
//         .execute("http://localhost:3000/api/todo")
//         .post("/todoadd")
//         .set("Authorization", `Bearer ${token}`)
//         .send(todoData)
//         .end((err, res) => {
//           if (err) {
//             console.log("-------------", err, "-------------");
//           }

//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           expect(res).to.have.status(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal("Title is requrie");
//           done();
//         });
//     });

//     // description require
//     it("description require", (done) => {
//       const todoData = {
//         title: "new user title",
//         description: "",
//       };

//       console.log("--------------- : description require : --------------");

//       server.request
//         .execute("http://localhost:3000/api/todo")
//         .post("/todoadd")
//         .set("Authorization", `Bearer ${token}`)
//         .send(todoData)
//         .end((err, res) => {
//           if (err) {
//             console.log("-------------", err, "-------------");
//           }

//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           expect(res).to.have.status(400);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal("Description is requrie");
//           done();
//         });
//     });
//   });
// });
