// import db from "../database";

const userQueries = () =>{
    matchUser: "SELECT username FROM userdata WHERE username = $1;"
}

export default userQueries