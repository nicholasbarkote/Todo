const title = document.getElementById('tTitle');
const edittitle = document.getElementById('ETitle');
const desc = document.getElementById('tDescription');
const edesc = document.getElementById('EDescription');
const date = document.getElementById('tDueDate');
const edate = document.getElementById('EDueDate');
const echeck = document.getElementById('eCheckComplete');
const titleErr = document.getElementById("titlemsg");
const EtitleErr = document.getElementById("Etitlemsg");
const imgtitleErr = document.getElementById("imgtitle");
const EimgtitleErr = document.getElementById("Eimgtitle");
const discMsg = document.getElementById("titledesc");
const EdiscMsg = document.getElementById("Etitledesc");
const discImg = document.getElementById("imgdesc");
const EdiscImg = document.getElementById("Eimgdesc");
const dateDesc = document.getElementById("titledate");
const EdateDesc = document.getElementById("etitledate");
const dateImg = document.getElementById("imgdate");
const EdateImg = document.getElementById("eimgdate");
const form = document.getElementById('form');
const Editform = document.getElementById('Editform');
const todolist = document.getElementById('todolist');
const todocompleted = document.getElementById('completed');
const todoincomplete = document.getElementById('incomplete');
const allitems = document.getElementById('all');
const submit = document.getElementById('submit');
const tabs = document.querySelectorAll('[data-tab-target]');
const tabsContents = document.querySelectorAll('[data-tab-content]');
var modal = document.getElementById("myModal");
const editindex = document.getElementById('EditIndex');
var isChecked = document.getElementById("eCheckComplete");

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

Editform.addEventListener('submit', (e) => {
    e.preventDefault();

    let Titilevalid = false;
    let Descvalid = false;
    let Datevalid = false;

    var titleMsg;
    var descMsg;
    var dateMsg;
    var i = editindex.innerHTML;
    var a = parseInt(i,10)
    var check ;
    if(isChecked.isChecked){
        check = true;
    }else{
        check = false;
    }
    if (edittitle.value === '' || edittitle.value == null) {
        EtitleErr.style.display = 'block';
        EtitleErr.innerHTML = "Must have a title";
        EimgtitleErr.src = '../images/cancel.svg';
        Titilevalid = false;
    } else {
        Titilevalid = true;
        titleMsg = edittitle.value;
        EimgtitleErr.src = '../images/tick.svg';
    }
    if (edesc.value === '' || edesc.value == null) {
        EdiscMsg.style.display = 'block';
        EdiscMsg.innerHTML = "Must have a description";
        EdiscImg.src = '../images/cancel.svg';
        Descvalid = false;
    } else {
        Descvalid = true;
        descMsg = edesc.value;
        EdiscImg.src = '../images/tick.svg';
    }

    if (edate.value) {
        dateMsg = edate.value;
        Datevalid = true;
        EdateImg.src = '../images/tick.svg';
    } else {

        Datevalid = false;
        EdateDesc.style.display = 'block';
        EdateDesc.innerHTML = "Must have a date"
        EdateImg.src = '../images/cancel.svg';
    }

    if (Titilevalid && Descvalid && Datevalid) {
        console.log("Added to list")
        edittitle.value = '';
        edate.value = '';
        edesc.value = '';
        EtitleErr.style.display = 'none';
        EdiscMsg.style.display = 'none';
        EdateDesc.style.display = 'none';
        Titilevalid = false;
        Descvalid = false;
        Datevalid = false;

        editOneTask(titleMsg, descMsg, dateMsg,a,check)
        modal.style.display = "none";
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
        console.log("start")
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML =
            `
            <div id="cardcontent">
                <p class="title">${task.title}</p>
                <hr class="solid">

                <p class="description">${task.description}</p>
                <p class="date">Due Date:${task.date} </p>
                <p class="date">Completed :${task.completed} </p>
                <hr class="solid">

            </div>
            <div id="carddelete">
                <img class="img-icon" src="./images/delete.svg" alt="delete" onclick="removeFromTask(${i})"/>
                <img class="img-icon" src="./images/edit.svg" alt="edit" onclick="editTask(${i})"/>
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
                <hr class="solid">
                <p class="description">${task.description}</p>
                <p class="date">Due Date:${task.date} </p>
                <p>${task.DueMessage}</p>
                <hr class="solid">

            </div>
            <hr class="solid">

            <div id="carddelete">
                <img class="img-icon" src="./images/delete.svg" alt="delete" onclick="removeFromTask(${i})"/>
                <img class="img-icon" src="./images/edit.svg" alt="delete" onclick="editTask(${i})"/>
            </div>
               
                `;

            todocompleted.appendChild(div);
        } else {
            console.log("Not complete")
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML =
                `
            <div id="cardcontent">
                <p class="title">${task.title}</p>
                <hr class="solid">

                <p class="description">Desc: ${task.description}</p>
                <p class="date">Due Date ${task.date} </p>

                <div>
                    <label>Completed</label><input value='submit' type='checkbox' ` + task.completed + ` onclick='handleClick(${i});'/>
                </div>
                <hr class="solid">

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

        if (diffInDays >= 0) {
            dateMessage = "Completed " + diffInDays + " day Before due date";
        } else if (diffInDays < 0) {
            dateMessage = "Late by " + (-1 * diffInDays) + " days";
        }
        tasklist[index].completed = true;
        tasklist[index].DueMessage = dateMessage;


    }
    readFromArray();
}

function editTask(index) {


    const task = tasklist[index];
    edittitle.value = task.title;
    edesc.value = task.description;
    edate.value = task.date;
    echeck.value = task.completed;
    
    editindex.textContent = index;
    modal.style.display = "block";

}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function editOneTask(title,desc,date,i,check){

    console.log("Asdfghjkl");
    console.log(title);
    console.log(desc);
    console.log(date);
    console.log(i);
    
    tasklist[i].title = title;
    tasklist[i].description = desc;
    tasklist[i].date = date;
    tasklist[i].completed = check;
    readFromArray()

    alert('Edit success');
}