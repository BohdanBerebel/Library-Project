let mainButton = document.querySelector("main > button");
let dialogButton = document.querySelector("form > button");
let dialog = document.querySelector("dialog");
let library = document.querySelector('#library');
let cross = document.querySelector('form img');
let inputAuthor = document.querySelector('#author');
let inputTitle = document.querySelector('#title');
let inputPages = document.querySelector('#pages');
let inputRead = document.querySelector('#read');
let divForTable = document.querySelector('#table');

mainButton.addEventListener('click', (e) => {
    dialog.showModal();
})

dialogButton.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary(inputAuthor.value, inputTitle.value, inputPages.value, inputRead.value);
    
    createTable(myLibrary);
    inputAuthor.value = "";
    inputTitle.value = "";
    inputPages.value = "";
    dialog.close();
})

cross.addEventListener('click', (e) => {
    inputAuthor.value = "";
    inputTitle.value = "";
    inputPages.value = "";
    dialog.close();
})

const myLibrary = [];

function addBookToLibrary(author, title, pages, read) {
    let book = {
    Author: author,
    Title: title,
    Pages: pages,
    "Is read": read,
    };
    myLibrary.push(book);
    let cell = document.createElement("div");
    let para = document.createElement("div");
    para.textContent = objConverterIntoText(book);
    cell.setAttribute("class", "cell");
    cell.appendChild(para);
    library.appendChild(cell);
    let deleteButton = document.createElement("button");
    cell.appendChild(deleteButton);
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("class", 'deleteButton');
    deleteButton.setAttribute("type", 'button');
    let toggleStatusButton = document.createElement("button");
    cell.appendChild(toggleStatusButton);
    toggleStatusButton.innerText = "Change the status of the book";
    toggleStatusButton.setAttribute("class", 'toggleStatusButton');
    toggleStatusButton.setAttribute("type", 'button');
}

library.addEventListener("click", (e) => {
    if (e.target.className == "deleteButton") {
        e.target.parentElement.remove();
        let bookNumber = e.target.previousElementSibling.innerText.slice(0, e.target.previousElementSibling.innerText.indexOf("."));
        let arrayOfBooksFromTable = document.querySelectorAll("td:first-child");
        for (i = 0; i < [...arrayOfBooksFromTable].length; i++) {
            if ([...arrayOfBooksFromTable][i].innerText == bookNumber) {
                [...arrayOfBooksFromTable][i].parentElement.remove();
                delete myLibrary[bookNumber - 1];
                break;
            }
        }
    }

    if (e.target.className == "toggleStatusButton") {
        let bookNumber = e.target.previousElementSibling.previousElementSibling.innerText.slice(0, e.target.previousElementSibling.previousElementSibling.innerText.indexOf("."));
        myLibrary[bookNumber - 1]["Is read"] == "Yes" ? myLibrary[bookNumber - 1]["Is read"] = "No" :
        myLibrary[bookNumber - 1]["Is read"] = "Yes";
        divForTable.innerHTML = "";
        createTable(myLibrary); 
        e.target.previousElementSibling.previousElementSibling.innerText = objConverterIntoText(myLibrary[bookNumber - 1], bookNumber);
    }
})

let sequentBookNumber = 1;

function objConverterIntoText(obj, number) {
    let text = "";
    if (number == undefined) {
        text += sequentBookNumber + '. ';
        sequentBookNumber++;
    } else text += number + '. ';
    Object.entries(obj).forEach((element) => {
        [key, value] = element;
        if (value == false) value = "undefined";
        text += key + ': ' + value + '; ';
    })
    return text;
}

addBookToLibrary("Hannah Grace", "Icebreaker. Book 1", 100, 'No');
addBookToLibrary("Hannah Grace", "Icebreaker. Book 1", 100, 'No');
addBookToLibrary("Rebecca Yarros", "Iron Flame. Book 2", 200, 'No');
addBookToLibrary("Rebecca Yarros", "Iron Flame. Book 2", 200, 'No');
addBookToLibrary("Ali Hazelwood", "Bride", 300, 'No');
addBookToLibrary("Ali Hazelwood", "Bride", 300, 'No');

function createTable(array) {

    array.forEach((element, index) => {
        if (index == 0) {
            divForTable.innerHTML = "";
            let table = document.createElement("table");
            divForTable.appendChild(table);
            let caption = document.createElement("caption");
            caption.textContent = "Different appearance"; 
            table.appendChild(caption);
            let thead = document.createElement("thead");
            table.appendChild(thead);
            let tr = document.createElement("tr");
            thead.appendChild(tr);
            let th = document.createElement("th");
            th.textContent = "Number";
            tr.appendChild(th);
            for ( i = 0; i < Object.keys(element).length; i++ ) {
                th = document.createElement("th");
                th.textContent = Object.keys(element)[i];
                tr.appendChild(th);
            }
            let tbody = document.createElement("tbody");
            table.appendChild(tbody);
        }
        
        tbody = document.querySelector("tbody");
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        let td = document.createElement("td");
        td.textContent = index + 1;
        tr.appendChild(td);
        
        let pairsArray = Object.entries(element);
        
        for (i = 0; i < pairsArray.length; i++) {
            [key, value] = pairsArray[i];
            if (value == false) value = "undefined"; 
            let td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        }
    })
}

createTable(myLibrary);


