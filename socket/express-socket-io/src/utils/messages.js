const generateMessage = (username, text) => {
  return {
    username,
    text,
    createdAt: newDate().getTime(),
  };
};

module.exports = { generateMessage };
