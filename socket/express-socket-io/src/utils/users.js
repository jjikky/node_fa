const addUser = ({ id, username, room }) => {
  const users = [];
  username = username.trim();
  room = room.trim();

  if (!username || !room) {
    return {
      error: "사용자 이름과 방이 필요합니다.",
    };
  }

  const exisitngUser = users.find((user) => {
    return user.room === room && user.username === usernmae;
  });

  if (exisitngUser) {
    return {
      error: "사용중인 이름입니다.",
    };
  }

  // 유저 저장
  const user = { id, username, room };
  users.push(user);
  return { user };
};

module.exports = { addUser };
