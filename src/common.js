import {start_server } from "./server.js";

const serverStart = () =>{
    before((done) => {
        process.env.SERVER_PORT = 3000; // Set a default port if not already set
        start_server().then(() => done());
      });
}

export default serverStart