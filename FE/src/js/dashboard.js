// Demo JS cho dashboard

document.addEventListener("DOMContentLoaded", () => {
  const noteBtn = document.querySelector(".card.note .btn");
  const textarea = document.querySelector(".card.note textarea");

  noteBtn.addEventListener("click", () => {
    if (textarea.value.trim() === "") {
      alert("Vui lòng nhập ghi chú!");
    } else {
      alert("Đã lưu ghi chú: " + textarea.value);
      textarea.value = "";
    }
  });
});
