document.addEventListener("DOMContentLoaded", function () {
  var add = document.getElementById("addTaskButton");
  var removeFinished = document.getElementById("removeFinishedTasksButton");
  var task = document.getElementById("taskInput");
  var list = document.getElementById("taskList");
  var prior = document.getElementById("taskPriority");
  var PRIORITIES = ["low", "medium", "high-priority"];
  //To do counter
  var allTasks = document.querySelectorAll("li");
  var counter = allTasks.length;
  //Add task
  add.addEventListener("click", function () {
    if (
      task.value.length >= 5 &&
      task.value.length <= 100 &&
      PRIORITIES.includes(prior.value)
    ) {
      //Add task to the list

      var newTask = document.createElement("li");
      newTask.dataset.priority = prior.value;
      var all = document.querySelectorAll("li");
      var index = all.length;
      newTask.classList.add(prior.value)
      list.insertBefore(newTask, all[index]);
      var taskName = document.createElement("h1");
      var taskPriorityElement = document.createElement("h3");
      newTask.appendChild(taskName);
      newTask.appendChild(taskPriorityElement);
      taskName.innerHTML = task.value;
      taskPriorityElement.innerHTML= prior.value
      //Add delete button
      var delBtn = document.createElement("button");
      newTask.appendChild(delBtn);
      delBtn.innerHTML = "Delete";
      delBtn.classList.add("delete");

      //Add complete button
      var complBtn = document.createElement("button");
      newTask.appendChild(complBtn);
      complBtn.innerHTML = "Complete";
      complBtn.classList.add("complete");

      counter++;

      //Mark completed in red and adjust counter
      complBtn.addEventListener("click", function () {
        if (this.parentElement.style.color === "") {
          this.parentElement.style.textDecoration = "line-through";
          this.parentElement.setAttribute("done", "yes");
          counter--;
          toDo.innerHTML = "Tasks to do: " + counter;
        } else if (this.parentElement.style.textDecoration === "line-through") {
          this.parentElement.style.textDecoration = "";
          this.parentElement.removeAttribute("done");
          counter++;
        }
      });

      //Delete selected item and adjust counter
      delBtn.addEventListener("click", function () {
        this.parentElement.parentNode.removeChild(this.parentElement);
        counter--;
      });

      task.value = "";
      prior.value = "";
    } else {
      event.preventDefault();
      alert(
        "Task should have from 5 to 100 characters. Priority should be an one of low, medium or high-priority"
      );
    }
  });

  //Remove completed items
  removeFinished.addEventListener("click", function () {
    var tasks = document.querySelectorAll("li");
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].hasAttribute("done")) {
        tasks[i].parentNode.removeChild(tasks[i]);
      }
    }
  });
});
