const taskContainer = document.querySelector(".task-container");

//get task

const addNewCard = () =>{
    const taskData = {
        id: `$(date.now())`,
        title: document.getElementById("taskTitle").value,
        image: document.getElementById("imageurl").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("des").value
    };

//create card

const newCard = `<div id=${taskData.id} class="col-md-6 col-lg-4 col-sm-12 my-4">
<div class="card-header d-sm-inline-flex justify-content-between align-items-center w-100">
  <h5 class="card-title">${taskData.title}</h5>
  <div class="d-sm-inline-flex align-items-center">
  <i class="fas fa-trash-alt me-2 link-danger" role="button"></i>
  <i class="fas fa-edit link-primary" role="button"></i>
</div>
</div>
<div class="card">
  <img src="${taskData.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">${taskData.description}</p>
    <span class="badge bg-primary">${taskData.type}</span>
  </div>
</div>
<div class="card-footer">
  <button class="btn btn-outline-primary">Open Task</button>
</div>
</div>`;

//insert in html
taskContainer.insertAdjacentHTML("beforeend", newCard);

//clear form

document.getElementById("taskTitle").value = "";
document.getElementById("imageurl").value = "";
document.getElementById("taskType").value = "";
document.getElementById("des").value = "";

return;

};
