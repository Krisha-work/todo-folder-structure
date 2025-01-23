// import { expect, use } from "chai";
// import chaiHttp from "chai-http";
// import serverStart from "../common.js";
// import { jwtDecode } from "jwt-decode";
// import db from "../database/index.js";
// import bcryt from "bcryptjs";
// // import { findUserByUsername } from "../database/user.js";

// const server = use(chaiHttp);

// const userData = {
//   username: "newuser",
//   email: "newuser@example.com",
//   password: "password@123",
//   contact: "9876543210",
// };

// let data;
// let authToken;
// let userId;

// before(() => {
//   serverStart();
// });

// describe("First Test Collection", () => {
//   //server check health api
//   it("health welcome API route", () => {
//     server.request
//       .execute("http://localhost:3000")
//       .get("/health")
//       .end((err, res) => {
//         if (err) {
//           console.log(err);
//         }
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.a("object");
//         expect(res.body.message).to.equal("Ok, Working fine.");
//       });
//   });
// });

// //user delete if user is exists
// before(() => {
//   db.query("delete from userdata where username = $1", [userData.username]);
// });
// describe("User crud test case", () => {
//   // user register successfully
//   console.log("describe");
//   it("register a new user successfully", (done) => {
//     console.log("Creating user: --------------", userData);

//     server.request
//       .execute("http://localhost:3000/api/user")
//       .post("/register")
//       .send(userData)
//       .end((err, res) => {
//         if (err) {
//           console.log("-------------", err, "-------------");
//         }

//         console.log("res status:", res.status);
//         console.log("res body: ", res.body);

//         // Assert the response status and message
//         expect(res).to.have.status(201);
//         expect(res.body).to.be.a("object");
//         expect(res.body.message).to.equal("Signup data inserted successfully");
//         expect(res.body.username).to.equal("newuser");
//         expect(res.body.email).to.equal("newuser@example.com");
//         expect(res.body.contact).to.equal("9876543210");
//         done();
//       });
//   });

//   // user aready exists
//   describe("get user inserted data", async () => {
//     before(async () => {
//       data = await db.query("select * from userdata where username = $1", [
//         userData.username,
//       ]);
//     });

//     it("user already exists", (done) => {
//       console.log("-----", data.rows[0].id, "------");

//       console.log("user already register:------------------- ");
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

//           expect(res.status).to.equal(409);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal("User already exists");
//           expect(res.body.existingUser[0].id).to.equal(data.rows[0].id);
//           expect(res.body.existingUser[0].username).to.equal(
//             data.rows[0].username
//           );
//           expect(res.body.existingUser[0].email).to.equal(data.rows[0].email);
//           expect(res.body.existingUser[0].password).to.equal(
//             data.rows[0].password
//           );
//           expect(res.body.existingUser[0].contact).to.equal(
//             data.rows[0].contact
//           );
//           done();
//         });
//     });
//     //  user login
//     it("should login user successully", (done) => {
//       console.log("Login user:----------------------------------------");

//       const loginData = {
//         emailOrContact: "newuser@example.com",
//         password: "password@123",
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

//           expect(res.status).to.equal(200);
//           expect(res.body.message).to.equal("Login successful");
//           expect(res.body.user.id).to.equal(data.rows[0].id);
//           expect(res.body.user.username).to.equal(data.rows[0].username);
//           expect(res.body.user.email).to.equal(data.rows[0].email);
//           expect(res.body.user.password).to.equal(data.rows[0].password);
//           expect(res.body.user.contact).to.equal(data.rows[0].contact);

//           authToken = res.body.token;
//           console.log("Generated Token:", authToken);

//           const decoded = jwtDecode(authToken);
//           userId = decoded.userId;
//           console.log("Extracted User ID:", userId);

//           done();
//         });
//     });

//     //user get
//     it("user data get", (done) => {
//       console.log("Get user data :------------------------------------");
//       console.log(authToken, "token get or not ----------------");

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .get(`/userdata`)
//         .set("Authorization", `Bearer ${authToken}`)
//         .end((err, res) => {
//           if (err) {
//             console.log(err);
//           }
//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           expect(res.status).to.equal(200);
//           expect(res.body.userData.id).to.equal(data.rows[0].id);
//           expect(res.body.userData.username).to.equal(data.rows[0].username);
//           expect(res.body.userData.email).to.equal(data.rows[0].email);
//           expect(res.body.userData.password).to.equal(data.rows[0].password);
//           expect(res.body.userData.contact).to.equal(data.rows[0].contact);
//           done();
//         });
//     });
//     //user update
//     it("update user successully", (done) => {
//       console.log("update user data :------------------------------------");
//       console.log("user id get from token : -----", userId);

//       const updateUser = {
//         username: "newuser",
//         email: "newuser1@example.com",
//         password: "password@123",
//         contact: "9876543210",
//       };

//       server.request
//         .execute("http://localhost:3000/api/user")
//         .put(`/user/${userId}`)
//         .set("Authorization", `Bearer ${authToken}`)
//         .send(updateUser)
//         .end((err, res) => {
//           if (err) {
//             console.log(err);
//           }
//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           expect(res.status).to.equal(200);
//           expect(res.body.message).to.equal("User data updated successfully");
//           expect(res.body.username).to.equal(data.rows[0].username);
//           expect(res.body.email).to.equal("newuser1@example.com");
//           expect(res.body.contact).to.equal(data.rows[0].contact);
//           done();
//         });
//     });

//     describe("Todo CRUD test case", () => {
//       const todoData = {
//         title: "new user title",
//         description: "new user description",
//       };

//       //add todo successfully
//       it("todo add successfully", (done) => {
//         console.log(userId, "user id in to do time---------------------");

//         console.log("Create new todo : -------------------- ");

//         server.request
//           .execute("http://localhost:3000/api/todo")
//           .post("/todoadd")
//           .set("Authorization", `Bearer ${authToken}`)
//           .send(todoData)
//           .end((err, res) => {
//             if (err) {
//               console.log("-------------", err, "-------------");
//             }

//             console.log("res status:", res.status);
//             console.log("res body: ", res.body);

//             expect(res).to.have.status(201);
//             expect(res.body).to.be.a("object");
//             expect(res.body.message).to.equal("to do data insert successfully");
//             // expect(res.body.result).to.equal(res.body.result);
//             expect(res.body.title).to.equal("new user title");
//             expect(res.body.description).to.equal("new user description");
//             expect(res.body.username).to.equal(data.rows[0].username);
//             done();
//           });
//       });

//       describe("perform get, update, delete in todo", () => {
//         let tododata;
//         let todoid;

//         before(async () => {
//           tododata = await db.query(
//             "select * from todo_data where user_id = $1",
//             [userId]
//           );
//         });

//         // after(async () => {
//         //   await db.query("delete from todo_data where user_id = $1", [userId]);
//         // });
//         // get todo data
//         it("Get todos ", (done) => {
//           console.log("Get all todos : -------------------- ");
//           console.log(tododata.rows[0], "todo data------------------------");

//           server.request
//             .execute("http://localhost:3000/api/todo")
//             .get("/todos")
//             .set("Authorization", `Bearer ${authToken}`)
//             .end((err, res) => {
//               if (err) {
//                 console.log("-------------", err, "-------------");
//               }

//               console.log("res status:", res.status);
//               console.log("res body: ", res.body);

//               expect(res).to.have.status(200);
//               expect(res.body).to.be.a("object");
//               expect(res.body.todos[0].id).to.equal(tododata.rows[0].id);
//               expect(res.body.todos[0].title).to.equal(tododata.rows[0].title);
//               expect(res.body.todos[0].description).to.equal(
//                 tododata.rows[0].description
//               );
//               expect(res.body.todos[0].user_id).to.equal(
//                 tododata.rows[0].user_id
//               );
//               done();

//               todoid = tododata.rows[0].id;
//               console.log(todoid, "todo id-------------------");
//             });
//         });

//         // update to do
//         it("Update todo successfully ", (done) => {
//           console.log("update todo : -------------------- ");

//           const todoData = {
//             title: "demo title 1",
//             description: "demo description 1",
//           };

//           server.request
//             .execute("http://localhost:3000/api/todo")
//             .put(`/todo/${todoid}`)
//             .set("Authorization", `Bearer ${authToken}`)
//             .send(todoData)
//             .end((err, res) => {
//               if (err) {
//                 console.log("-------------", err, "-------------");
//               }

//               console.log("res status:", res.status);
//               console.log("res body: ", res.body);

//               expect(res).to.have.status(200);
//               expect(res.body).to.be.a("object");
//               expect(res.body.message).to.equal("To-Do updated successfully");
//               expect(res.body.id).to.equal(`${tododata.rows[0].id}`);
//               expect(res.body.title).to.equal("demo title 1");
//               expect(res.body.description).to.equal("demo description 1");
//               done();
//             });
//         });

//         //todod delete
//         it("Delete todo successfully ", (done) => {
//           console.log("delete todo : -------------------- ");

//           server.request
//             .execute("http://localhost:3000/api/todo")
//             .delete(`/todo/${todoid}`)
//             .set("Authorization", `Bearer ${authToken}`)
//             .end((err, res) => {
//               if (err) {
//                 console.log("-------------", err, "-------------");
//               }

//               console.log("res status:", res.status);
//               console.log("res body: ", res.body);

//               expect(res).to.have.status(200);
//               expect(res.body).to.be.a("object");
//               expect(res.body.message).to.equal("To-Do deleted successfully");
//               expect(res.body.id).to.equal(`${tododata.rows[0].id}`);
//               done();
//             });
//         });
//         // user delete
//         it("delete user successfully", (done) => {
//           console.log("delete user data :------------------------------------");

//           server.request
//             .execute("http://localhost:3000/api/user")
//             .delete(`/logout/${userId}`)
//             .set("Authorization", `Bearer ${authToken}`)
//             .end((err, res) => {
//               if (err) {
//                 console.log(err);
//               }
//               console.log("res status:", res.status);
//               console.log("res body: ", res.body);

//               expect(res.status).to.equal(200);
//               expect(res.body.message).to.equal("Logout successfully");
//               done();
//             });
//         });
//       });
//     });
//   });
// });
