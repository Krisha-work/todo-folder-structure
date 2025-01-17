import db from "../../database/index.js";

export const todo_add = async (req, res) => {
  if (!req.userId) {
    console.log("user not found in todo");
    res.status(404).send({ message: "user not found" });
  }

  const { title, description } = req.body;
  if (!title ) {
    return res.status(400).send({ message: "Title is required." });
  }
  if (!description) {
    return res.status(400).send({ message: "Description is required." });
  }

  try {
    await db.query(
      "INSERT INTO todo_data (title, description, user_id)VALUES ($1, $2, $3) RETURNING id ",
      [title, description, req.userId]
    );

    const findUsername = await db.query(
      "select username from todo_data inner join userdata on todo_data.user_id = userdata.id where userdata.id = $1;",
      [req.userId]
    );
    const matchUsername = findUsername.rows[0].username;
    res.status(200).send({
      message: "to do data insert successfully",
      title: title,
      description: description,
      username: matchUsername,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred during ToDo." });
  }
};

export const todo_update = async (req, res) => {
  console.log(req.userId);

  if (!req.userId) {
    console.log("user not found in todo");
    res.status(404).send({ message: "user not found" });
  }

  const { title, description } = req.body;
  const id = req.params;
  console.log(id);

  const todoId = id.id;
  console.log(todoId);

  try {
    console.log(req.userId, todoId, "both id-------------");

    const matchIdResult = await db.query(
      "SELECT * FROM todo_data WHERE id = $1 and user_id = $2;",
      [todoId, req.userId]
    );
    console.log(matchIdResult.rows[0]);
    const user = matchIdResult.rows[0];
    console.log(matchIdResult.rows.length, "LENGTHHS SDBMBNMB");
    if (matchIdResult.rows.length < 0) {
      res.status(404).send({ message: "Todo not found" });
    } else {
      if (user.id == todoId && user.user_id == req.userId) {

        let newTitle = matchIdResult.rows[0].title
        let newDescription = matchIdResult.rows[0].description

        if(title) newTitle = title
        if(description) newDescription = description
        
        await db.query(
          "update todo_data set title = coalesce($1, title), description = coalesce($2, description) where (id=$3 and user_id=$4)",
          [title, description, todoId, req.userId]
        );
        res.status(200).send({
          message: "To Do update suessfully",
          id: todoId,
          title: title,
          description: description,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "you can not access another user data" });
  }
};

export const todo_show = async (req, res) => {
  const id = req.userId;
  console.log(id,"userid-----------");
  

  if (!req.userId) {
    console.log("user not found in todo");
    res.status(404).send({ userId: id, message: "user not found" });
  }

  try {
    const result = await db.query("select * from todo_data where user_id=$1 ", [
      req.userId,
    ]);
    console.log(result,"---------------------");
    
    const userToDoData = result.rows;
    res.status(200).send({ userToDoData });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred during ToDo." });
  }
};

export const todo_delete = async (req, res) => {
  console.log(req.userId);
  
  if (!req.userId) {
    res.status(404).send({ message: "user not found" });
  }
  const id = req.params;
  const todoId = id.id;
  console.log(todoId);
  
  try {
    const matchIdResult = await db.query(
      "SELECT id,user_id FROM todo_data WHERE id = $1 and user_id = $2;",
      [todoId, req.userId]
    );
    console.log(matchIdResult.rows);
    
    if (matchIdResult.rows.length < 1) {
      res.status(405).send({ message: "you can not authries to delete." });
    } else {
      const result = await db.query(
        "delete from todo_data where id=$1 and user_id=$2 ",
        [id.id, req.userId]
      );
      console.log(result.rows[0]);
      res.status(200).send({ message: "To Do delete suessfully", id: todoId });
    }
  } catch (err) {
    res.status(401).send({ message: "to do not deleted" });
  }
};
