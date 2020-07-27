//JavaScript Project - Phase 1 and 2 combined


//Number facts Game - Third Party API call

let fact = document.querySelector('#fact');
let factText = document.querySelector('#factText');
let numberInput = document.querySelector('#numberInput');

numberInput.addEventListener('input', getFactAjax);

// Fetch with XHR
function getFactAjax() {
    let number = numberInput.value;
    if (number != '') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://numbersapi.com/' + number);

        xhr.onload = function () {
            if (this.status == 200) {
                fact.style.display = 'block';
                factText.innerText = this.responseText;
            }
        }

        xhr.send();
    }
}

// Full screen mode - Browser API call

let myTasks = document.querySelector('#myTasks');
let task = document.querySelector('#task');
let addBtn = document.querySelector('.addBtn');


document.addEventListener("keypress", function (event) {
    // Enter key code - 13
    if (event.keyCode === 13) {
        toggleFullScreen();
    }
}, false);

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// random color generation for new tasks 
function randomColor() {
    var r = Math.floor(Math.random() * 256); // 0 - 255
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var alpha = 0.5;
    return "rgba(" + r + ", " + g + ", " + b + "," + alpha + ")";
}

let addTask = () => {

    // if task is a empty string then alert is fired
    if (task.value === "") {
        Swal.fire({
            title: 'Error!',
            text: 'Please write some task',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }
    // tasks are assigned 
    else {
        let element = document.createElement('nav');
        let deleteBtn = document.createElement('button');
        let checkbox = document.createElement('input');
        let para = document.createElement('p');
        let editBtn = document.createElement('button');
        let taskDate = document.createElement('button');

        // element setting
        element.setAttribute('id', 'design');
        element.setAttribute('class', 'navbar navbar-expand-lg m-0');
        element.style.backgroundColor = randomColor();

        // delete button setting
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.setAttribute('class', 'delete btn btn-danger btn-small');

        // edit button setting
        editBtn.innerHTML = "Edit";
        editBtn.setAttribute('class', 'edit m-2 btn btn-warning text-dark btn-small');
        // edit alert 
        editBtn.onclick = async function () {
            const { value: text } = await Swal.fire({
                title: 'Edit your task',
                input: 'text',
                inputPlaceholder: 'Re-enter the task'
            })

            if (text) {
                Swal.fire(`Task changed to: ${text}`)
                para.innerText = text;
            }
        }

        // checkbox validation
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'form-control check');
        checkbox.addEventListener('click', playSound);

        checkbox.addEventListener('click', function () {
            para.classList.toggle('checked');
        }, false);

        // paragrapgh allignment
        para.innerText = task.value;
        task.value = "";
        para.setAttribute('class', ' write');

        // for showing current date of a task
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        taskDate.innerHTML = date;
        taskDate.setAttribute('class', 'btn btn-success active m-2');

        // adding elements to DOM
        myTasks.appendChild(element);
        element.appendChild(para);
        element.appendChild(checkbox);
        element.appendChild(taskDate);
        element.appendChild(editBtn);
        element.appendChild(deleteBtn);

        // delete button logic
        let onDelete = document.getElementsByClassName('delete');
        for (let j = 0; j < onDelete.length; j++) {
            onDelete[j].addEventListener('click', function () {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        var element = this.parentElement;
                        element.remove();

                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your Task has been deleted.',
                            'success'
                        )
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'Your Task is safe :)',
                            'error'
                        )
                    }
                })
            });
        }
    }
}
// event listener control
addBtn.addEventListener('click', addTask);


//BONUS QUESTION FOR THE SOUND
function playSound() {
    var ping = new Audio('https://www.freesoundslibrary.com/wp-content/uploads/2018/01/ding-sound-effect.mp3');
    ping.play();
}
