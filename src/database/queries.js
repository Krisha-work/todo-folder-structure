export const userQuery  = {
    matchUsername: 'SELECT * FROM userdata WHERE username = $1;',
    matchEmailOrContact: 'SELECT * FROM userdata WHERE email=$1 OR contact=$1;',
    matchUserId: 'SELECT * FROM userdata WHERE id = $1;',
    addUser: 'INSERT INTO userdata (username, email, password, contact) VALUES ($1, $2, $3, $4) RETURNING id;',
    updateUser: 'UPDATE userdata SET username = coalesce ($1, username), email = coalesce($2, email), password = coalesce($3, password), contact = coalesce($4, contact) WHERE id=$5;',
    deleteUser: 'delete from userdata where id=$1;',
}

export const todoQuery = {
    addTodo: 'INSERT INTO todo_data (title, description, user_id) VALUES ($1, $2, $3) RETURNING id;',
    userTodoJoin: 'select username from todo_data inner join userdata on todo_data.user_id = userdata.id where userdata.id = $1;',
    matchTodoId: 'SELECT * FROM todo_data WHERE id = $1 and user_id = $2;',
    updateTodo: 'update todo_data set title = coalesce($1, title), description = coalesce($2, description) where (id=$3 and user_id=$4);',
    matchUserId: 'select * from todo_data where user_id=$1;',
    deleteTodo: 'delete from todo_data where id=$1 and user_id=$2;'

}
