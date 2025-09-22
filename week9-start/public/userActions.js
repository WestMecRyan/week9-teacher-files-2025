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

function editUser(userId, firstName, lastName, email, phone) {
  document.getElementById(`display-${userId}`).style.display = 'none';
  document.getElementById(`edit-${userId}`).style.display = 'block';
}

function cancelEdit(userId) {
  // Show display div and hide edit form
  document.getElementById(`display-${userId}`).style.display = 'block';
  document.getElementById(`edit-${userId}`).style.display = 'none';
}

async function updateUser(userId) {
  // Get values from edit form
  const firstName = document.getElementById(`firstName-${userId}`).value;
  const lastName = document.getElementById(`lastName-${userId}`).value;
  const email = document.getElementById(`email-${userId}`).value;
  const phone = document.getElementById(`phone-${userId}`).value;

  const updatedUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  };

  try {
    const response = await fetch(`/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    const data = await response.json();

    if (data.success) {
      alert('User updated successfully!');
      // Refresh the page to show updated data
      window.location.reload();
    } else {
      alert('Failed to update user: ' + data.message);
    }
  } catch (err) {
    console.error('Error updating user:', err);
    alert('Error updating user');
  }
}
