const users = [];

const addUser = ({ id, username }) => {

  username = username.trim().toLowerCase();
  const user = { id, username };
  users.push(user);

  return { user };
}

const getUser = (id) => users.find((user) => user.id === id);


module.exports = { addUser, getUser};