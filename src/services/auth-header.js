export default function authHeader() {
  const user = localStorage.getItem('user');

  if (user && user.access) {
    return { Authorization: `Bearer ${user.access}` };
  } else {
    return {};
  }
}
