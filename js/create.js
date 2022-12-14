//Model section
//const open=document.getElementById('create_button');
// const container=document.getElementById('create_ticket_container');
// const close=document.getElementById('close_button');

function readFormData() {
    var formData = {};
    formData["description"] = document.getElementById("description").value;
    formData["type"] = document.getElementById("type").value;
    formData["priority"] = document.getElementById("priority").value;
    return formData;
}

function resetForm() {
    document.getElementById('description').value = "";
    document.getElementById('type').value = "";
    document.getElementById('priority').value = "";
}


//Modal
// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("create_button");

// Get the <span> element that closes the modal
var span = document.getElementById("close_button");










//View section
function insertNewRecord(data) {
    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = '-';
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.description;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = '-';
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.type;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.priority;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = '-';
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = '-';
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = '<img class="info" src="svg/info-svgrepo-com.svg" width="20px" height="20px">';
}










//Controller section
// open.addEventListener('click',() => {
//     container.classList.add('show');
// });

// close.addEventListener('click', () => {
//     container.classList.remove('show');
// });

function onFormSubmit() {
    var formData = readFormData();
    insertNewRecord(formData);
    resetForm();
    modal.style.display = "none";
}

//Modal
// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

  // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // }