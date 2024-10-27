const mainButton = document.querySelector("main > button");
const dialogButton = document.querySelector("form > button");
const dialog = document.querySelector("dialog");
const library = document.querySelector('#library');
const cross = document.querySelector('form img');
const inputAuthor = document.querySelector('#author');
const inputTitle = document.querySelector('#title');
const inputPages = document.querySelector('#pages');
const inputRead = document.querySelector('#read');
const divForTable = document.querySelector('#table');

class CreateNewBook {

    static #myLibrary = [];

    constructor(Author, Title, Pages, Read) {
        this.Author = Author;
        this.Title = Title;
        this.Pages = Pages;
        this.Read = Read;
        CreateNewBook.#myLibrary.push(this);
    }

    static removeBookFromLibrary(book) {
        this.#myLibrary.splice(book.number - 1, 1);
        this.launchLibrary();
    }

    static #objConverterIntoText(book, index) {
        let text = index + ". ";
        Object.entries(book).forEach((element) => {
            let [key, value] = element;
            if (value == false) value = "undefined";
            text += key + ': ' + value + '; ';
        })
        return text;
    }

    static #renewCards() {
        library.innerHTML = "";
        for ( let i = 0; i < this.#myLibrary.length; i++) {
            let cell = document.createElement("div");
            cell.number = i + 1;
            let para = document.createElement("div");
            para.textContent = this.#objConverterIntoText(this.#myLibrary[i], i + 1);
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
    }

    static #createTable() {
        divForTable.innerHTML = "";
        this.#myLibrary.forEach((element, index) => {
            // Create header
            if (index == 0) {
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
                for ( let i = 0; i < Object.keys(element).length; i++ ) {
                    th = document.createElement("th");
                    th.textContent = Object.keys(element)[i];
                    tr.appendChild(th);
                }
                let tbody = document.createElement("tbody");
                table.appendChild(tbody);
            }

            // Create a row for each book
            
            let tbody = document.querySelector("tbody");
            let tr = document.createElement("tr");
            tbody.appendChild(tr);
            let td = document.createElement("td");
            td.textContent = index + 1;
            tr.appendChild(td);
            
            // Insert values in the rows

            let pairsArray = Object.entries(element);
            
            for ( let i = 0; i < pairsArray.length; i++) {
                let [key, value] = pairsArray[i];
                if (value == false) value = "undefined"; 
                let td = document.createElement("td");
                td.textContent = value;
                tr.appendChild(td);
            }
        })
    }

    static launchLibrary() {
        this.#renewCards()
        this.#createTable();
    }

    static changeReadStatus(index) {
        this.#myLibrary[index].Read = this.#myLibrary[index].Read === "No" ? "Yes" : "No";
        this.launchLibrary();
    }
}

const protection = (function() {

    new CreateNewBook("Over", "Lord", 100, 'No');
    new CreateNewBook("Harry", "Potter", 100, 'No');
    new CreateNewBook("Win", "Diesel", 200, 'No');
    new CreateNewBook("Peaky", "Blinders", 150, 'No');
    new CreateNewBook("Squad", "Marvelous", 123, 'No');
    new CreateNewBook("Hulk", "Unbelievable", 100, 'No');
    new CreateNewBook("Capitan", "America", 300, 'No');
    
    CreateNewBook.launchLibrary();
    
    library.addEventListener("click", (e) => {
        if (e.target.className == "deleteButton") {
            CreateNewBook.removeBookFromLibrary(e.target.parentElement);
        }
    
        if (e.target.className == "toggleStatusButton") {
            CreateNewBook.changeReadStatus(e.target.parentElement.number - 1);
        }
    })

    mainButton.addEventListener('click', (e) => {
        dialog.showModal();
    })
    
    dialogButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (inputAuthor.value == false || inputTitle.value == false || inputPages.value == false) return alert("Empty line is unacceptable")
        new CreateNewBook(inputAuthor.value, inputTitle.value, inputPages.value, inputRead.value);
        CreateNewBook.launchLibrary();
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

})()


