let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

//table
$(document).ready(function () {
  $("#myTable").DataTable();
});

///
let title_col = document.getElementsByClassName("td_3");
const options = document.createElement("title_options");

for (let i = 0; i < title_col.length; i++) {
  let title = title_col[0];
}

const button = ["save"];
const editBtn = document.getElementById("edit");
const overlay = document.getElementById("overlay");
const centeredDiv = document.getElementById("centeredDiv");

editBtn.addEventListener("click", function () {
  overlay.style.display = "block";
  centeredDiv.style.display = "block";
});

overlay.addEventListener("click", function () {
  overlay.style.display = "none";
  centeredDiv.style.display = "none";
});
