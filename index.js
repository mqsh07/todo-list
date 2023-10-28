const elList = selectElem(".list")
const elTemplate = selectElem(".template").content
const elForm = selectElem(".form")
const elFormInput = selectElem(".form__input", elForm)

let todosArr = []

const checkTodo = (e) => {
    let dataId = e.target.dataset.Id

    let foundCheck = todosArr.find(item => item.id == dataId)
    foundCheck.isCompleted = !foundCheck.isCompleted
    

    renderTodos(todosArr, elList)
}

const editTodo = (e) => {
    let dataId = e.target.dataset.Id;
    let foundEdit = todosArr.find((item) => item.id == dataId);
    foundEdit.content = prompt("Yangi xabarni kiriting");
    renderTodos(todosArr, elList)
};

const deleteTodo = (e) => {
    let dataId = e.target.dataset.Id

    let foundIndex = todosArr.findIndex((item) => item.id == dataId)

    todosArr.splice(foundIndex, 1)
    renderTodos(todosArr, elList)
}

function renderTodos(arr, list) {
    list.innerHTML = null
    arr.map(item => {
        let cloneTemplate = elTemplate.cloneNode(true)

        let listItemContent = selectElem(".list__item-content", cloneTemplate)
        let listItemDelete = selectElem(".list__item-btn", cloneTemplate)
        let listItemEdit = selectElem(".list__item-edit", cloneTemplate)
        let todoCheck = selectElem(".list__item-input", cloneTemplate)

        if(item.isCompleted == true){
            listItemContent.style = "text-decoration: line-through; opacity: 0.5 font-size 15px"
            todoCheck.checked = true
        }

        listItemContent.textContent = item.content
        listItemDelete.dataset.Id = item.id
        listItemEdit.dataset.Id = item.id
        todoCheck.dataset.Id = item.id

        list.appendChild(cloneTemplate)

        listItemEdit.addEventListener("click", editTodo)
        listItemDelete.addEventListener("click", deleteTodo)
        todoCheck.addEventListener("change", checkTodo)

    })
}

renderTodos(todosArr, elList)

elForm.addEventListener("submit", e => {
    e.preventDefault()

    let inputValue = elFormInput.value.trim()

    todosArr.push({
        id: new Date().getMilliseconds(),
        content: inputValue,
        isCompleted: false
    })

    renderTodos(todosArr, elList)


    elFormInput.value = null
    elFormInput.focus()
})


