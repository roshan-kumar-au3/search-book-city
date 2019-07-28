var books = [];

$.ajax({
    url: "./books.json",
   // url: "https://raw.githubusercontent.com/attainu-nightingale/nightingale-course-module/master/assignments/data/books.json"
    method: "GET",
    datatype: "json",
    success: function (data) {
        // data = JSON.parse(data);
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
            books.push(data[i]);
        }
    }
});

console.log(books);

var searchField = document.querySelector("#search-keyword");
var searchedForLang;

$("#submit-btn").on('click', function(e){
    e.preventDefault();
    $("tbody").html("");
    searchedForLang = searchField.value;
    for(var i = 0; i < books.length; i++) {
      if (books[i].language.toLowerCase() == searchedForLang.toLowerCase() || books[i].author.toLowerCase() == searchedForLang.toLowerCase() || books[i].country.toLowerCase() == searchedForLang.toLowerCase()) {
          $("tbody").append(
                '<tr><td>' + books[i].title + '</td><td>' + books[i].author + '</td><td>' + books[i].country + '</td><td>' + books[i].language + '</td><td><a href=' + books[i].link + '>Read more</a></td><td>' + books[i].pages + '</td><td>' + books[i].year + '</td>'
               );
      }
    }
});

var languages = ["English", "Sanskrit", "Italian", "Greek", "Danish",
                 "German", "Icelandic", "Swedish", "Japanese", "Hindi",
                 "Chinese", "Hebrew", "Classical Latin", "Portuguese", "Persian",
                 "Russian", "Spanish", "Arabic", "Persian", "Kālidāsa",
                 "Valmiki", "Vyasa", "Chinua Achebe", "Jane Austen", "Emily Brontë",
                 "William Faulkner", "Geoffrey Chaucer", "Joseph Conrad", "Charles Dickens",
                 "George Eliot", "Ralph Ellison", "Ernest Hemingway", "James Joyce", "William Shakespeare",
                 "Salman Rushdie", "Virginia Woolf", "Walt Whitman", "Mark Twain", "Jonathan Swift", "Laurence Sterne",
                 "Edgar Allan Poe", "George Orwell", "Vladimir Nabokov", "Toni Morrison", "Herman Melville", "Doris Lessing",
                 "D. H. Lawrence", "James Joyce", "Ernest Hemingway", "Dante Alighieri", "Italo Svevo", "Giovanni Boccaccio", 
                 "Giacomo Leopardi", "Elsa Morante", "Sophocles", "Homer", "Nikos Kazantzakis", "Euripides",
                 "Hans Christian Andersen", "Alfred D\u00f6blin", "G\u00fcnter Grass", "Franz Kafka", 
                 "Robert Musil", "Paul Celan", "Halld\u00f3r Laxness", "Astrid Lindgren", "Yasunari Kawabata", "Murasaki Shikibu",
                 "Lu Xun", "Naguib Mahfouz", "Thomas Mann", "Tayeb Salih", "Jos\u00e9 Saramago", "England", "United States",
                 "Russia", "Leo Tolstoy", "Ireland", "India", "Japan", "Czechoslovakia", "Irish Free State", "United Kingdom", 
                 "Iceland", "Italy", "Sweden", "China", "Egypt", "Austria", "Mexico", "Argentina", "Spain",
                 "Federico Garc\u00eda Lorca", "Gabriel Garc\u00eda M\u00e1rquez", "Rumi", "Sultanate of Rum", "Greece", "Germany"];

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("div");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("search-keyword"), languages);
