window.addEventListener("load", () => {
    loadBook()
})

function loadBook() {
    var complShelf = document.getElementById("completeBookshelfList");
    var incomplShelf = document.getElementById("incompleteBookshelfList");

    complShelf.innerHTML = "";
    incomplShelf.innerHTML = "";

    var item = JSON.parse(localStorage.getItem("book"));
    if (item) {
        item.forEach(book => {
            var txtComplete = (book.isComplete) ? "Belum selesai dibaca" : "Selesai dibaca";
            var bookFormat = `
                <article class="book_item">
                    <h3>${book.title}</h3>
                    <p>Penulis: ${book.author}</p>
                    <p>Tahun: ${book.year}</p>
                
                    <div class="action">
                        <button class="green" onclick="changeComplete(${book.id})">${txtComplete}</button>
                        <button class="red" onclick="delBook(${book.id})">Hapus buku</button>
                    </div>
                </article>
            `;
            
            (book.isComplete) ? complShelf.innerHTML += bookFormat : incomplShelf.innerHTML += bookFormat;
        });
    }
}

function deleteBrackets(item) {
    if (item === null || item == undefined) {
        return;
    }

    item = item.replace("[", "");
    item = item.replace("]", "");
    console.log(item)
    if (item === null || item == undefined) {
        return;
    }

    return item;
}

function submit() {
    var title = document.getElementById("inputBookTitle");
    var author = document.getElementById("inputBookAuthor");
    var year = document.getElementById("inputBookYear");
    var complete = document.getElementById("inputBookIsComplete");

    if (title == "" || author == "" || year == "") {
        alert("Please fill all the fields");
        return false;
    }

    var id = Date.now()
    var bookInput = {
        id: id,
        title: title.value,
        author: author.value,
        year: year.value,
        isComplete: complete.checked
    }

    bookInput = JSON.stringify(bookInput);

    var lastItem = localStorage.getItem("book");
    
    if (lastItem != null) {
        bookInput += "," + deleteBrackets(lastItem);
    }

    localStorage.setItem("book", `[ ${bookInput} ]`);

    loadBook()
}

function changeComplete(id) {
    var item = localStorage.getItem("book");
    item = JSON.parse(item);

    var book = item.find(book => book.id == id);
    book.isComplete = !book.isComplete;

    localStorage.setItem("book", JSON.stringify(item));
    loadBook()
}

function delBook(id) {
    var item = localStorage.getItem("book");
    item = JSON.parse(item);

    var book = item.find(book => book.id == id);
    var index = item.indexOf(book);
    item.splice(index, 1);

    localStorage.setItem("book", JSON.stringify(item));
    loadBook()
}

function searchBook() {
    var complShelf = document.getElementById("completeBookshelfList");
    var incomplShelf = document.getElementById("incompleteBookshelfList");

    complShelf.innerHTML = "";
    incomplShelf.innerHTML = "";
    
    var item = localStorage.getItem("book");
    item = JSON.parse(item);

    var searchField = document.getElementById('searchBookTitle');
    var searchValue = searchField.value;

    item.forEach(book => {
        var title = book.title.toLowerCase();
        var search = searchValue.toLowerCase();
        if (title.includes(search)) {
            var txtComplete = (book.isComplete) ? "Belum selesai dibaca" : "Selesai dibaca";
            var bookFormat = `
                <article class="book_item">
                    <h3>${book.title}</h3>
                    <p>Penulis: ${book.author}</p>
                    <p>Tahun: ${book.year}</p>
                
                    <div class="action">
                        <button class="green" onclick="changeComplete(${book.id})">${txtComplete}</button>
                        <button class="red" onclick="delBook(${book.id})">Hapus buku</button>
                    </div>
                </article>
            `;

            (book.isComplete) ? complShelf.innerHTML += bookFormat : incomplShelf.innerHTML += bookFormat;
        }
    });
}

var btnSubmit = document.getElementById('bookSubmit');
btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    submit()
})

var searchBtn = document.getElementById('searchSubmit');
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchBook();
})