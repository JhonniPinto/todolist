function addTask() {
    const inTask  = document.getElementById('inTask') 
    const inNote  = document.getElementById('inNote')
    const tbTasks = document.getElementById('tbTasks')

    const task  = inTask.value
    const note  = inNote.value

    if ( task === '' || note === '') {
        alert('Please add a task and your gender')
        inTask.focus()
        return
    }

    insertARow(tbTasks, task, note)

    saveTasks(task, note)

    inTask.value = ''
    inNote.value = ''
    inTask.focus()
}
const btAdd = document.getElementById('btAdd')
btAdd.addEventListener('click', addTask)

function insertARow(table, task, note) {
    const row = table.insertRow(-1)

    let col1 = row.insertCell(0)
    let col2 = row.insertCell(1)
    let col3 = row.insertCell(2)

    col1.textContent = task
    col2.textContent = note
    col3.innerHTML   = '<input type="checkbox">'
} 

function saveTasks(task, note) {
    if (localStorage.getItem('tasks')) {
        const tasks  = localStorage.getItem('tasks')  + ';' + task
        const notes  = localStorage.getItem('notes') + ';' + note

        localStorage.setItem('tasks' , tasks)
        localStorage.setItem('notes', notes)
    } else {
        localStorage.setItem('tasks' , task)
        localStorage.setItem('notes', note)
    }
}

function restoreTasks() {
    const tbTasks = document.getElementById('tbTasks')

    if (localStorage.getItem('tasks')) {
        const tasks  = localStorage.getItem('tasks').split(';')
        const notes  = localStorage.getItem('notes').split(';')

        for (let i = 0 ; i < tasks.length ; i++) {
            insertARow(tbTasks, tasks[i], notes[i])
        }
    }
}
restoreTasks()

const ckAll = document.getElementById('ckAll')
ckAll.addEventListener('change', () => {
    const tbTasks  = document.getElementById('tbTasks')
    const ckDelete = tbTasks.getElementsByTagName('input') 

    const  status = ckAll.checked

    for (let i = 1 ; i < ckDelete.length ; i++) {
        ckDelete[i].checked = status
    }
})

function removeTasks() {
    const tbTasks  = document.getElementById('tbTasks')
    const ckDelete = tbTasks.getElementsByTagName('input') 

    let hasSelected = false

    for (let i = 1 ; i < ckDelete.length ; i++) {
        if (ckDelete[i].checked) {
            hasSelected = true
            break
        }
    }

    if (!hasSelected) {
        alert('No tasks selected')
        return
    }

    if (confirm('Do you confirm the deletion of the selected tasks?')) {
        localStorage.removeItem('tasks')
        localStorage.removeItem('notes')

        for (i = 1 ; i < ckDelete.length ; i++ ) {
            if (!ckDelete[i].checked) {
                const task  = tbTasks.rows[i].cells[0].textContent
                const note  = tbTasks.rows[i].cells[1].textContent
                saveTasks(task , note)
            }
        }

        for (i = ckDelete.length - 1 ; i > 0 ; i--) {
            if (ckDelete[i].checked) {
                tbTasks.deleteRow(i)
            }
        }

        ckDelete[0].checked = false
    }
}
const btDelete = document.getElementById('btDelete')
btDelete.addEventListener('click', removeTasks)