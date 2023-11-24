// Заметки.js

// Значения переменных получаем по id тегов(см. index.html)
let inputElement = document.getElementById("title")
let addBtn = document.getElementById("add")
let listElement = document.getElementById("list")


// Массив с заметками
const notes = [
	{
		title: "Сделать пункт 2 КТ №3 по БД",
		completed: false
	},
	{
		title: "Выучить массивы в JS",
		completed: true
	},
	{
		title: "Погулять с Полиной",
		completed: false
	}
]


// Функция показа заметок
function render() {
	listElement.innerHTML = ""
	
	if(notes.length === 0) {
		listElement.innerHTML = '<p class="text-center">Дел нет</p>'
	}

	for(let index in notes) {
		listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[index], index))
	}
}

render()


// Функция получения заметок
function getNoteTemplate(note, index) {
	return `
		<li class="list-group-item d-flex justify-content-between align-items-center">
			<span class="title ${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
			<span>
				<span class="btn btn-small btn-${note.completed ? 'warning' : 'success'} rounded-circle" data-index="${index}" data-type="toggle">&check;</span>
				<span class="btn btn-small btn-danger rounded-circle" data-index="${index}" data-type="remove">&times;</span>
			</span>
		</li>
	`
}


// Кнопка добавления заметок
addBtn.onclick = function() {
	if(inputElement.value.length === 0) {return undefined} 
	const newNote = {
		title: inputElement.value,
		completed: false
	}

	notes.push(newNote)
	render()
	inputElement.value = ""
}


// Зачёркивание и удаление заметок
listElement.onclick = function(event) {
	if(event.target.dataset.index) {
		const index = parseInt(event.target.dataset.index)
		const type = event.target.dataset.type

		if(type === "toggle"){
			notes[index].completed = !notes[index].completed
		} else if(type === "remove") {
			notes.splice(index, 1)
		}

		render()
	}
}
