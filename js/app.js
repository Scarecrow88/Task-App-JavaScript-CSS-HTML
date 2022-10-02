document.getElementById ('formTask').addEventListener ('submit', save);
function save (e) {
    e.preventDefault ();
    let name = document.getElementById ('name').value;
    let description = document.getElementById ('description').value;
    let alert = document.getElementById ('alt-one');
    const task = {
        name,
        description
    }
    if (name === '' && description === '') {
        alert.classList.remove ('rmvalert');
        alert.innerHTML = `<div class = "alerttext">
                                The fields are required
                            </div>`;
        alert.innerHTML += `<button class="close" onClick = "closePopUp ()">
                                <svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>
                                </svg>
                            </button>`
        return;
    }
    else {
        if (localStorage.getItem ('tasks') === null) {
            let inTasks = [];
            inTasks.push (task);
            localStorage.setItem ('tasks', JSON.stringify (inTasks));        
        }
        else {
            let inTasks = JSON.parse (localStorage.getItem ('tasks'));
            inTasks.push (task);
            localStorage.setItem ('tasks', JSON.stringify (inTasks));
        }
    }
    getter ();
    resetForm ();
}
function getter () {
    if (localStorage.getItem ('tasks') === null) {
        let inTasks = [];
        localStorage.setItem ('tasks', JSON.stringify (inTasks));
        return;
    }
    else {
        let taskView = document.getElementById ('taskbody');
        let inTasks = JSON.parse (localStorage.getItem ('tasks'));
        taskView.innerHTML = '';
        for (let i = 0; i < inTasks.length; i++) {
            let name = inTasks [i].name;
            let description = inTasks [i].description;
            taskView.innerHTML += `
                <tr class = "inirow" id = "init">
                    <td>${name}</td>
                    <td>${description}</td>
                    <td>
                        <a class = "delbutbox" onclick = "delet ('${name}')">
                            Delete
                        </a>
                    </td>
                </tr>`;
        }
    }
}
function delet (nam) {
    let inTasks = JSON.parse (localStorage.getItem ('tasks'));
    for (let i = 0; i < inTasks.length; i++) {
        if (inTasks [i].name == nam) {
            inTasks.splice (i, 1);
        }
    }
    localStorage.setItem ('tasks', JSON.stringify (inTasks));
    getter ();
}
function resetForm (input1, input2) {
    document.getElementById ('name').value = '';
    document.getElementById ('description').value = '';
}
getter ();