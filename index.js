const taskContainer = document.querySelector(".task-container");

let taskStorage = [];

const generateHTML = (taskData) => {
  return `<div id=${taskData.id} class="col-md-6 col-lg-4 col-sm-12 my-4">
  <div class="card-header d-sm-inline-flex justify-content-between align-items-center w-100">
    <h5 class="card-title">${taskData.title}</h5>
    <div class="d-sm-inline-flex align-items-center">
      <i class="fas fa-trash-alt me-2 link-danger me-3" role="button" name=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i>
      <i class="fas fa-edit link-primary" role="button" name=${taskData.id} onclick="editCard.apply(this, arguments)"></i>
    </div>
  </div>
  <div class="card">
    <img src="${taskData.image}" class="card-img-top" alt="image">
    <div class="card-body">
      <p class="card-text">${taskData.description}</p>
      <span class="badge bg-primary">${taskData.type}</span>
    </div>
  </div>
  <div class="card-footer">
    <button class="btn btn-outline-primary" name=${taskData.id} >Open Task</button>
  </div>
  </div>`;
};

const insertToDOM = (newCard) =>{
  return taskContainer.insertAdjacentHTML("beforeend", newCard);
};

const updateLocalStorage = () => localStorage.setItem("taskySid", JSON.stringify({cards: taskStorage}));

//get task

const addNewCard = () => {
  const taskData = {
    id: `$(date.now())`,
    title: document.getElementById("taskTitle").value,
    image: document.getElementById("imageurl").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("des").value,
  };

  taskStorage.push(taskData);

  updateLocalStorage();  

  const newCard = generateHTML(taskData);

  insertToDOM(newCard);

  //clear form

  document.getElementById("taskTitle").value = "";
  document.getElementById("imageurl").value = "";
  document.getElementById("taskType").value = "";
  document.getElementById("des").value = "";

  return;
};

//reloading existing cards
const reloadLocalStorage = () => {
  
  const getCards = localStorage.getItem("taskySid");
  if(!getCards) return;

  taskStorage = JSON.parse(getCards).cards;

  taskStorage.map((taskData) => {
    const newCard = generateHTML(taskData);
    insertToDOM(newCard);
  });

  return;
  
};

const deleteCard = (event) => {
  const targetID = event.target.getAttribute("name");

  const parentElement = event.target.parentNode.parentNode.parentNode;

  const updatedArray = taskStorage.filter((taskData) => taskData.id !== targetID);

  taskStorage = updatedArray;
  updateLocalStorage();

  return taskContainer.removeChild(parentElement);

};

const editCard = (event) =>{
  const parentElement = event.target.parentNode.parentNode.parentNode;

  let taskTitle = parentElement.childNodes[1].childNodes[1];
  let taskType = parentElement.childNodes[3].childNodes[3].childNodes[3];
  let des = parentElement.childNodes[3].childNodes[3].childNodes[1];
  let changeButton = parentElement.childNodes[5].childNodes[1];

  taskTitle.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  des.setAttribute("contenteditable", "true");
  changeButton.innerHTML = "Save Changes";

  changeButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");

};

const saveEdit = (event) => {
  const targetID = event.target.getAttribute("name");

  const parentElement = event.target.parentNode.parentNode;

  let taskTitle = parentElement.childNodes[1].childNodes[1];
  let taskType = parentElement.childNodes[3].childNodes[3].childNodes[3];
  let des = parentElement.childNodes[3].childNodes[3].childNodes[1];
  let changeButton = parentElement.childNodes[5].childNodes[1];

  taskStorage.forEach((task) =>{
    if(task.id === targetID)
    {
      task.title = taskTitle.innerHTML;
      task.type = taskType.innerHTML;
      task.description = des.innerHTML;
    }
    return task;
  });

  updateLocalStorage();

  taskTitle.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  des.setAttribute("contenteditable", "false");
  changeButton.innerHTML = "Open Task";

  return;

};
