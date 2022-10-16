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
const submit = document.getElementById('submit');

var tasklist = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let Titilevalid = false;
    let Descvalid = false;
    let Datevalid = false;

    if (title.value === '' || title.value == null) {
        titleErr.style.display = 'block';
        titleErr.innerHTML = "Must have a title";
        imgtitleErr.src = '../images/cancel.svg';
        Titilevalid = false;
    }else{
        imgtitleErr.src = '../images/tick.svg';
    }
    if (desc.value === '' || desc.value == null) {
        discMsg.style.display = 'block';
        discMsg.innerHTML = "Must have a description";
        discImg.src = '../images/cancel.svg';
        Descvalid = false;
    }else{
        discImg.src = '../images/tick.svg';
    }

    if (date.value) {
        Datevalid = true;
        dateImg.src = '../images/tick.svg';
    } else {

        Datevalid = false;

        dateDesc.style.display = 'block';
        dateDesc.innerHTML = "Must have a date"
        dateImg.src = '../images/cancel.svg';
    }

    if (Titilevalid && Descvalid && Datevalid) {

        addToTask(title.value,desc.value,date.value);
      
    } else {

    }
});


function addToTask(title , desc, date){
    const task ={
        title:title,
        description:desc,
        date:date
    };
    tasklist.push(task);
}
