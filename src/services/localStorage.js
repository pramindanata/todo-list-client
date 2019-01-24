const storage = window.localStorage;

const setToken = (token) => {
  storage.setItem('token', token);
};

const setUser = (user) => {
  storage.setItem('user', JSON.stringify(user));
};

const getToken = () => storage.token;

const getUser = () => JSON.parse(storage.user);

const removeToken = () => {
  storage.removeItem('token');
};

const removeUser = () => {
  storage.removeItem('user');
};

export default {
  setToken,
  setUser,
  getToken,
  getUser,
  removeToken,
  removeUser,
};
