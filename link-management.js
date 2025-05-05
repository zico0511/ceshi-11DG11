// link-management.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("linkForm");
  const linkItems = document.getElementById("linkItems");

  // 載入現有網址
  const links = JSON.parse(localStorage.getItem("savedLinks") || "[]");
  links.forEach(link => addLinkToTable(link.name, link.url));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("linkName").value.trim();
    const url = document.getElementById("url").value.trim();

    if (!name || !url) {
      showToast("請填寫所有欄位！", false);
      return;
    }

    addLinkToTable(name, url);
    saveToLocalStorage(name, url);
    form.reset();
    showToast("網址已新增！");
  });

  function addLinkToTable(name, url) {
    const tr = document.createElement("tr");
    tr.classList.add("fade-in-row");

    tr.innerHTML = `
      <td>${name}</td>
      <td><a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a></td>
      <td><button class="action-btn delete-btn">刪除</button></td>
    `;

    // 加入刪除功能
    tr.querySelector(".delete-btn").addEventListener("click", () => {
      tr.classList.add("fade-out-row");
      setTimeout(() => {
        tr.remove();
        removeFromLocalStorage(name, url);
        showToast("網址已刪除", true);
      }, 400); // 動畫時間
    });

    linkItems.appendChild(tr);
  }

  function saveToLocalStorage(name, url) {
    const links = JSON.parse(localStorage.getItem("savedLinks") || "[]");
    links.push({ name, url });
    localStorage.setItem("savedLinks", JSON.stringify(links));
  }

  function removeFromLocalStorage(name, url) {
    let links = JSON.parse(localStorage.getItem("savedLinks") || "[]");
    links = links.filter(link => link.name !== name || link.url !== url);
    localStorage.setItem("savedLinks", JSON.stringify(links));
  }

  // 動態提示訊息
  function showToast(message, success = true) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = `toast ${success ? "toast-success" : "toast-error"}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 50);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 2200);
  }
});
