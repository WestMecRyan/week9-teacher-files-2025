// public/userActions.js
async function deleteUser(userId) {
  console.log(userId);
  if (!confirm('Are you sure you want to delete this user?')) {
    return;
  }
  try {
    const response = await fetch(`/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      alert('success!');
    } else {
      alert('failed to delete user: ' + data.message);
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    alert('Error deleting user');
  }
}
