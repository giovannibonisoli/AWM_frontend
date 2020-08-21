export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token.access) {
    return { Authorization: `Bearer ${user.token.access}` };
  } else {
    return {};
  }
}
