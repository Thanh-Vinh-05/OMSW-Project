// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  // Toggle password visibility (if any password fields in dashboard)
  // Currently no password fields in dashboard, so skip

  // Handle quick note save button
  const saveNoteBtn = document.querySelector('.cards .note .btn');
  const noteTextarea = document.querySelector('.cards .note textarea');

  saveNoteBtn?.addEventListener('click', () => {
    const note = noteTextarea.value.trim();
    if (note) {
      alert('Ghi chú đã được lưu!');
      // TODO: Lưu ghi chú vào backend hoặc localStorage
      // localStorage.setItem('quickNote', note);
    } else {
      alert('Vui lòng nhập ghi chú trước khi lưu.');
    }
  });

  // Highlight active menu item on sidebar
  const menuItems = document.querySelectorAll('.sidebar .menu li');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
});
