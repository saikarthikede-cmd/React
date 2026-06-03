function addTask() {

  var input = document.getElementById("taskInput");
  var task = input.value;

  if (task.trim() == "") {
    alert("please type something");
    return;
  }

  var list = document.getElementById("taskList");
  var li = document.createElement("li");

  var span = document.createElement("span");
  span.innerText = task;
  li.appendChild(span);

  var btnDiv = document.createElement("div");
  btnDiv.className = "buttons";

  var editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "edit-btn";

  var isEditing = false;
  var editInput = null;

  editBtn.onclick = function() {

    if (isEditing == false) {

      editInput = document.createElement("input");
      editInput.value = span.innerText;
      editInput.className = "edit-input";
      li.replaceChild(editInput, span);

      editBtn.innerText = "Save";
      isEditing = true;

    } else {

      if (editInput.value != "") {
        span.innerText = editInput.value;
        li.replaceChild(span, editInput);
        editBtn.innerText = "Edit";
        isEditing = false;
      }

    }

  }

  var deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete-btn";

  deleteBtn.onclick = function() {
    list.removeChild(li);
  }

  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);
  li.appendChild(btnDiv);
  list.appendChild(li);

  input.value = "";

}
