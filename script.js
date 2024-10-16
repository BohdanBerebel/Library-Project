let inputAuthor = document.querySelector('#author');
let inputTitle = document.querySelector('#title');
let inputPages = document.querySelector('#pages');
let inputRead = document.querySelector('#read');
// let addBookButton = document.querySelector('form > button');
// let library = document.querySelector('#library');
// let booksList = document.querySelector('#booksList');

// const myLibrary = [];

// function Book(author, title, pages, read) {
//     this["Author"] = author;
//     this["Title"] = title;
//     this["Pages"] = pages;
//     this["Is read"] = read;
// }

// function addBookToLibrary(book) {
//     myLibrary.push(book);
//     console.log(book);
//     console.log(myLibrary);
// }

// addBookButton.addEventListener('click', () => {
//     if (inputAuthor.value == false || inputTitle.value == false || inputPages.value == false) {
//         return
//     }
//     let book = new Book(inputAuthor.value, inputTitle.value, inputPages.value, inputRead.value);
//     addBookToLibrary(book);
//     inputAuthor.value = "";
//     inputTitle.value = "";
//     inputPages.value = "";
// })

// function displayBooks(array) {
//     library.innerHTML = '';
//     let ol = document.createElement("ol");
//     library.appendChild(ol);
//     array.forEach((element) => {
//         let li = document.createElement("li");
//         console.log(element);
//         li.textContent = `Author: ${element.Author}; Title: ${element.Title}; Number of pages: ${element.Pages}; It's been read: ${element["Is read"]};`;
//         li.setAttribute("class", "item");
//         ol.appendChild(li);
//     });
// }

// booksList.addEventListener("click", () => displayBooks(myLibrary));




// remake below
let mainButton = document.querySelector("main > button");
let dialogButton = document.querySelector("form > button");
let dialog = document.querySelector("dialog");
let library = document.querySelector('#library');
let cross = document.querySelector('form img');

mainButton.addEventListener('click', (e) => {
    dialog.showModal();
})

dialogButton.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary(inputAuthor.value, inputTitle.value, inputPages.value, inputRead.value);
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
}
let sequentBookNumber = 1;

function objConverterIntoText(obj) {
    let text = "";
    text += sequentBookNumber + '. ';
    sequentBookNumber++;
    Object.entries(obj).forEach((element) => {
        [key, value] = element;
        text += key + ': ' + value + '; ';
    })
    return text;
}

setTimeout(addBookToLibrary, 1000, "Hannah Grace", "Icebreaker. Book 1", 100, 'No');
setTimeout(addBookToLibrary, 2000, "Rebecca Yarros", "Iron Flame. Book 2", 200, 'No');
setTimeout(addBookToLibrary, 3000, "Ali Hazelwood", "Bride", 300, 'No');
setTimeout(addBookToLibrary, 4000, "Hannah Grace", "Icebreaker. Book 1", 100, 'No');
setTimeout(addBookToLibrary, 5000, "Rebecca Yarros", "Iron Flame. Book 2", 200, 'No');
setTimeout(addBookToLibrary, 6000, "Ali Hazelwood", "Bride", 300, 'No');
