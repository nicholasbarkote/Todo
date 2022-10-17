const title = document.getElementById('tTitle');
const desc = document.getElementById('tDescription');
const date = document.getElementById('tDueDate');
const titleErr = document.getElementById("titlemsg");
const imgtitleErr = document.getElementById("imgtitle");
const discMsg = document.getElementById("titledesc");
const discImg = document.getElementById("imgdesc");
const dateDesc = document.getElementById("titledate");
const dateImg = document.getElementById("imgdate");
const form = document.getElementById('form');
const todolist = document.getElementById('todolist');
const todocompleted = document.getElementById('completed');
const todoincomplete = document.getElementById('incomplete');
const allitems = document.getElementById('all');
const submit = document.getElementById('submit');
const tabs = document.querySelectorAll('[data-tab-target]');
const tabsContents = document.querySelectorAll('[data-tab-content]');

var tasklist = [];

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabsContents.forEach(tabContent => {
            tabContent.classList.remove('active');
        });
        target.classList.add('active');
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let Titilevalid = false;
    let Descvalid = false;
    let Datevalid = false;

    var titleMsg;
    var descMsg;
    var dateMsg;

    if (title.value === '' || title.value == null) {
        titleErr.style.display = 'block';
        titleErr.innerHTML = "Must have a title";
        imgtitleErr.src = '../images/cancel.svg';
        Titilevalid = false;
    } else {
        Titilevalid = true;
        titleMsg = title.value;
        imgtitleErr.src = '../images/tick.svg';
    }
    if (desc.value === '' || desc.value == null) {
        discMsg.style.display = 'block';
        discMsg.innerHTML = "Must have a description";
        discImg.src = '../images/cancel.svg';
        Descvalid = false;
    } else {
        Descvalid = true;
        descMsg = desc.value;
        discImg.src = '../images/tick.svg';
    }

    if (date.value) {
        dateMsg = date.value;
        Datevalid = true;
        dateImg.src = '../images/tick.svg';
    } else {

        Datevalid = false;

        dateDesc.style.display = 'block';
        dateDesc.innerHTML = "Must have a date"
        dateImg.src = '../images/cancel.svg';
    }

    if (Titilevalid && Descvalid && Datevalid) {
        console.log("Added to list")
        title.value = '';
        date.value = '';
        desc.value = '';
        titleErr.style.display = 'none';
        discMsg.style.display = 'none';
        dateDesc.style.display = 'none';
        Titilevalid = false;
        Descvalid = false;
        Datevalid = false;
        addToTask(titleMsg, descMsg, dateMsg);
        readFromArray();
    } else {
        return;
    }
});


function addToTask(title, desc, date) {
    console.log("Add to task")
    var task = {
        title: title,
        description: desc,
        date: date,
        completed: false
    };

    tasklist.push(task);


    tasklist.forEach(element => {
        console.log(element);
    });

}

function readFromArray() {

    todocompleted.replaceChildren()
    allitems.replaceChildren()
    todoincomplete.replaceChildren()

    tasklist.map((task, i) => {

        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML =
            `
            <div id="cardcontent">
                <p class="title underline">Title :${task.title}</p>
                <p class="description underline">Desc: ${task.description}</p>
                <p class="date underline">Due Date:${task.date} </p>
                <p class="date underline">Completed :${task.completed} </p>
            </div>
            <div id="carddelete">
                <img class="img-icon" src="./images/delete.svg" alt="delete" onclick="removeFromTask(${i})"/>
                <img class="img-icon" src="./images/edit.svg" alt="delete" onclick="editTask(${i})"/>
            </div>
            `;


        allitems.appendChild(div)

        if (task.completed) {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML =
                `
            <div id="cardcontent">
                <p class="title">${task.title}</p>
                <p class="description">Desc: ${task.description}</p>
                <p class="date">Due Date:${task.date} </p>
                <p>${task.DueMessage}</p>
            </div>
            <div id="carddelete">
                <img class="img-icon" src="./images/delete.svg" alt="delete" onclick="removeFromTask(${i})"/>
                <img class="img-icon" src="./images/edit.svg" alt="delete" onclick="editTask(${i})"/>
            </div>
               
                `;

            todocompleted.appendChild(div);
        } else {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML =
                `
            <div id="cardcontent">
                <p>Task Title: ${task.title}</p>
                <p class="description">Desc: ${task.description}</p>
                <p class="date">Due Date ${task.date} </p>
                <div>
                    <label>Completed</label><input value='submit' type='checkbox' ` + task.completed + ` onclick='handleClick(${i});'/>
                </div>
            </div>
            <div id="carddelete">
                <img class="img-icon" src="./images/delete.svg" alt="delete" onclick="removeFromTask(${i})"/>
                <img class="img-icon" src="./images/edit.svg" alt="delete" onclick="editTask(${i})"/>
            </div>
                `;

            todoincomplete.appendChild(div);
        }

    });
}


function removeFromTask(index) {
    tasklist.splice(index, 1);
    readFromArray();
}

function handleClick(index) {

    if (!tasklist[index].completed) {

        const dueDate = new Date(tasklist[index].date);
        let today = new Date();
        let diff = dueDate.getTime() - today.getTime();
        var diffInDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
        var dateMessage = ""

        if (diffInDays > 0) {
            dateMessage = "Completed " + diffInDays + " day Before due date";
        } else if (diffInDays < 0) {
            dateMessage = "Late by " + -1 * diffInDays + " days";
        } 
        tasklist[index].completed = true;
        tasklist[index].DueMessage = dateMessage;
        

    }
    readFromArray();
}

function editTask(index){

}