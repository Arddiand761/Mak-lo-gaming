function main() {

  const getBook = () => {
    //membuat instance dari XMLHttpRequest

    const xhr = new XMLHttpRequest();

    //menetapkan callback jika respon sukses atau error

    xhr.onload =  function() {
      const responseJson = JSON.parse(xhr.responseText);

      if(responseJson.error){
        showResponseMessage(respponseJson.message);

      } else{
        renderAllBooks(responseJson.books);
      }
     };

     xhr.onerror = function(){
      showResponseMessage();
     }

     //membuat GET request dan menetapkan target URL
     xhr.open('GET', 'https://books-api.dicoding.dev/list');

    //Mengirim request
    xhr.send();
  };


  const insertBook = (book) => {
    //membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();

    xhr.onload = function(){
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getBook();

    };

    xhr.onerror = function(){
      showResponseMessage();

    };

    //membuat POST request dan menetapkan target URL
    xhr.open('POST', 'https://books-api.dicoding.dev/add');


    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');

    //Mengirimkan Request dan menyisipkan JSON.stringfy(book) pada body
    xhr.send(JSON.stringify(book));


  };

  const updateBook = (book) => {
    //Membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();

    xhr.onload = function(){
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getBook();

    };


    xhr.onerror = function(){
      showResponseMessage();
    };


    //membuat PUT request dan menetapkan target URL
    xhr.open('PUT', 'https://books-api.dicoding.dev/edit/' + book.id);


    //Menetapkan propertiu content-type dan x-auth-token pada header
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');

    //Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
    xhr.send(JSON.stringify(book));
  };

  const removeBook = (bookId) => {
    // Membuat instace dari XMLHttpRequest

    const xhr = new XMLHttpRequest();

    xhr.onload = function(){
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getBook();
    }

    xhr.onerror = function(){
      showResponseMessage();
    }


    //Membuat DELETE request dan menetapkan target URL
    xhr.open('DELETE', 'https://books-api.dicoding.dev/delete/' + bookId);  

    xhr.setRequestHeader('X-Auth-Token', '12345');

    xhr.send();
  };


  
  
  
  
  /*
      jangan ubah kode di bawah ini ya!
  */

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector('#listBook');
    listBookElement.innerHTML = '';

    books.forEach(book => {
      listBookElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
            </div>
          </div>
        </div>
      `;
    });

    const buttons = document.querySelectorAll('.button-delete');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const bookId = event.target.id;
        
        removeBook(bookId);
      });
    });
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  document.addEventListener('DOMContentLoaded', () => {

    const inputBookId = document.querySelector('#inputBookId');
    const inputBookTitle = document.querySelector('#inputBookTitle');
    const inputBookAuthor = document.querySelector('#inputBookAuthor');
    const buttonSave = document.querySelector('#buttonSave');
    const buttonUpdate = document.querySelector('#buttonUpdate');

    buttonSave.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };
      
      insertBook(book);
    });

    buttonUpdate.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };

      updateBook(book);
    });
    getBook();
  });
}

export default main;