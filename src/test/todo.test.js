// import { expect, use } from "chai";
// import chaiHttp from "chai-http";

// const server = use(chaiHttp);

// // before(() => {
// //   serverStart();
// // });

// describe("ToDo test case", () => {
//   let authToken =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY0LCJpYXQiOjE3Mzc1MTkyMzgsImV4cCI6MTczNzYwNTYzOH0.qX77QTWopj5gECT9jedhvkNzBdiXhGeHgdzVkNObsxc";
// //   let userId = 62;
//   let todoid 

//     it("todo add successfully", () => {
//       console.log("Create new todo : -------------------- ");

//       const todoData = {
//         title: "new user title",
//         description: "new user description",
//       };
//       server.request
//         .execute("http://localhost:3000/api/todo")
//         .post("/todoadd")
//         .set("Authorization", `Bearer ${authToken}`)
//         .send(todoData)
//         .end((err, res) => {
//           if (err) {
//             console.log("-------------", err, "-------------");
//           }

//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           expect(res).to.have.status(201);
//           expect(res.body).to.be.a("object");
//           expect(res.body.message).to.equal("to do data insert successfully");
//           expect(res.body.result).to.equal(res.body.result);
//           expect(res.body.title).to.equal("new user title");
//           expect(res.body.description).to.equal("new user description");
//           expect(res.body.username).to.equal("newuser");
//         });
//     });


//     it("Get todos ", () => {
//       console.log("Get all todos : -------------------- ");

//       server.request
//         .execute("http://localhost:3000/api/todo")
//         .get("/todos")
//         .set("Authorization", `Bearer ${authToken}`)
//         .end((err, res) => {
//           if (err) {
//             console.log("-------------", err, "-------------");
//           }

//           console.log("res status:", res.status);
//           console.log("res body: ", res.body);

//           expect(res).to.have.status(200);
//           expect(res.body).to.be.a("object");
//         //   expect(res.body.todos[0].id).to.equal();
//           expect(res.body.todos[0].title).to.equal("new user title");
//           expect(res.body.todos[0].description).to.equal("new user description");
//           expect(res.body.todos[0].user_id).to.equal(64);

//           todoid = res.body.todos[0].id
//           console.log(todoid, "todo id --------------");
          
//         });
//     });


//   it("Update todo successfully ", () => {
//     console.log("update todo : -------------------- ");
//     const todoData = {
//       title: "demo title 1",
//       description: "demo description 1",
//     };
//     // let id = 62;

//     server.request
//       .execute("http://localhost:3000/api/todo")
//       .put(`/todo/${todoid}`)
//       .set("Authorization", `Bearer ${authToken}`)
//       .send(todoData)
//       .end((err, res) => {
//         if (err) {
//           console.log("-------------", err, "-------------");
//         }

//         console.log("res status:", res.status);
//         console.log("res body: ", res.body);

//         expect(res).to.have.status(200);
//         expect(res.body).to.be.a("object");
//         expect(res.body.message).to.equal('To-Do updated successfully');
//         expect(res.body.id).to.equal(`${todoid}`);
//         expect(res.body.title).to.equal("demo title 1");
//         expect(res.body.description).to.equal("demo description 1");
//       });
//   });


//   it("Delete todo successfully ", () => {
//     console.log("delete todo : -------------------- ");
//     // let id = 62;

//     server.request
//       .execute("http://localhost:3000/api/todo")
//       .delete(`/todo/${todoid}`)
//       .set("Authorization", `Bearer ${authToken}`)
//       .end((err, res) => {
//         if (err) {
//           console.log("-------------", err, "-------------");
//         }

//         console.log("res status:", res.status);
//         console.log("res body: ", res.body);

//         expect(res).to.have.status(200);
//         expect(res.body).to.be.a("object");
//         expect(res.body.message).to.equal('To-Do deleted successfully');
//         expect(res.body.id).to.equal(`${todoid}`);
//       });
//   });
// });
