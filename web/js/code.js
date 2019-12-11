var json = null;

/**
 * Structure that adds href mark-up in the url to facilitate the usage of single page application
 */
if (window.location.hash === '#front' || json === null) {
  document.getElementById('addPage').style.display = 'none';
  document.getElementById('showPage').style.display = 'none';
  document.getElementById('Comments').style.display = 'none';
}
else if (window.location.hash === '#add'){
  document.getElementById('frontPage').style.display = 'none';
  document.getElementById('showPage').style.display = 'none';
  document.getElementById('Comments').style.display = 'none';
}
else if (window.location.hash === '#show') {
  document.getElementById('frontPage').style.display = 'none';
  document.getElementById('addPage').style.display = 'none';
  document.getElementById('Comments').style.display = 'none';
}
else if (window.location.hash === '#comment') {
  document.getElementById('frontPage').style.display = 'none';
  document.getElementById('addPage').style.display = 'none';
  document.getElementById('showPage').style.display = 'none';
}

/**
 * Shows only the elements necessary for adding a new picture onto the website.
 * Hides the other elements in the main section of the DOM tree.
 */
document.querySelector('nav > ul > li:nth-child(1)').onclick = function() {
  console.log('first link clicked');
  clearBox("photoresponse");
  document.getElementById('addPage').style.display = 'block';
  document.getElementById('frontPage').style.display = 'none';
  document.getElementById('showPage').style.display = 'none';
  document.getElementById('Comments').style.display = 'none';
};

/**
 * Shows only the elements necessary for looking at pictures on the website.
 * Hides the other elements in the main section of the DOM tree.
 */
document.querySelector('nav > ul > li:nth-child(2)').onclick = function() {
  console.log('second link clicked');
  document.getElementById('showPage').style.display = 'block';
  document.getElementById('addPage').style.display = 'none';
  document.getElementById('frontPage').style.display = 'none';
  document.getElementById('Comments').style.display = 'none';
  searchDatabase();
};

/**
 * Shows only the the logo and the nav section.
 * Hides the other elements in the main section of the DOM tree.
 */
document.querySelector('h1').onclick = function(){
  console.log("heading1 clicked");
  document.getElementById('frontPage').style.display = 'block';
  document.getElementById('addPage').style.display = 'none';
  document.getElementById('showPage').style.display = 'none';
  document.getElementById('Comments').style.display = 'none';
};

/**
 * Shows only the elements necessary for making comments.
 * Hides the other elements in the main section of the DOM tree.
 */
function showCommentsElement() {
  console.log("image clicked");
  clearBox("commentresponse");
  document.getElementById('Comments').style.display = 'block';
  document.getElementById('addPage').style.display = 'none';
  document.getElementById('showPage').style.display = 'none';
  document.getElementById('frontPage').style.display = 'none';
}

/**Searches image information from database*/
function searchDatabase() {
  var number = new XMLHttpRequest();
  number.onreadystatechange = function () {
    if (number.readyState === 4 && number.status === 200) {
      json = JSON.parse(number.responseText);
      var lenght = 0;
      for (var key in json) {
        if (json.hasOwnProperty(key)) {
          lenght++;
        }
      }
      key = 1;
      /**Makes an element for results if they exist.*/
      if (lenght > 0) {

        var divElement = document.getElementById("results");
        divElement.innerText = "";
        var i;

        /**Puts information for pictures and sends them to the function makePicture(), which makes pictures to the page.*/
        for (i in json) {
          var pic = json[i].linkki; /*Gives picture address to value of pic. */
          key = json[i].id; /* Gives picture id from dateabes to value of key. */
          makePicture(pic, key);

        }
      }
    }
  };
  number.open("GET", "http://localhost:8081/cutiepie");
  number.send();
}

/**Searches added comments for a picture from the database or gives supportive message to write own comment to picture if there is no comments.*/
function searchDatabase2(key) {
  /**Changes string key to int animalNumber.**/
  var animalNumber = parseInt(key);
  var number = new XMLHttpRequest();
  number.onreadystatechange = function () {
    if (number.readyState === 4 && number.status === 200) {
      json = JSON.parse(number.responseText);
      var lenght = 0;

      /**Searches how many comments found from database*/
      for (var key in json) {
        if (json.hasOwnProperty(key)) {
          lenght++;
        }
      }
      var key;

      var divElement = document.getElementById("bigPicturePage");
      divElement.innerText = "";
      var unOnrder = document.createElement("ul");
      divElement.appendChild(unOnrder);

      unOnrder.innerHTML = "Cute comments";

      /*If any comment found, they are printed here*/
      if (lenght > 0) {
        console.log(json[0].Kommentti);


        var i;
        for (i in json) {

          var listElement = document.createElement("li");
          var comment = json[i].Kommentti;
          listElement.innerHTML = comment;
          unOnrder.appendChild(listElement);
        }
      }
      /*If there is no comments on picture, the page shows constant comment to invite user to make their own comment */
      else {
        //var unOnrder = document.createElement("ul"); //Kommentti kuviin jossa ei ole kommentteja, nimesin elementin listElement2:ksi jotta sen voi myöhemmin muotoilla css:ssä eri näköiseksi
        //divElement.appendChild(unOnrder);
        var listElement2 = document.createElement("li");
        var comment = "No comments! Do you have something to say about this cutie pie?";
        listElement2.innerHTML = comment;
        unOnrder.appendChild(listElement2);
      }
    }
  };
  number.open("GET", "http://localhost:8081/puppies?Avain=" + animalNumber);
  number.send();
}
/**Searches for chosen picture from database in bigger size.*/
function searchDatabase3(key) {
  /**Changes the string key to int animalNumber.**/
  var animalNumber =  parseInt(key);

  var number = new XMLHttpRequest();
  number.onreadystatechange = function() {
    if (number.readyState === 4 && number.status === 200) {
      json = JSON.parse(number.responseText);
      var lenght = 0;
      for (var key in json) {
        if (json.hasOwnProperty(key)) {
          lenght++;
        }
      }
      var key;
      if (lenght > 0) {


        var divElement = document.getElementById("realBigPicturePic");
        divElement.innerText = "";
        var i;
        /**Makes element and added picture on it and link to comments.*/
        for (i in json) {
          var pic = json[i].Linkki;
          makeBigPicture(pic);
        }
      }
    }
  };
  number.open("GET", "http://localhost:8081/animalbabys?id="+animalNumber);
  number.send();

  var commenttemp = document.getElementById("commentbutton");
  commenttemp.setAttribute("onclick", "addComment("+ key +")");
}

/**Adds a picture in the picture list on page.*/
function makePicture(pic, key) {

  var link = document.createElement("a");

  /**Shapes picture size and gives it information of id-number on database.*/
  link.setAttribute("class", "photovar");
  var x = document.createElement("img");
  x.setAttribute("src", pic);
  x.setAttribute("id", key);
  x.setAttribute("height", "200");
  x.setAttribute("onclick", "bigPicture(" + key + " );");
  link.appendChild(x);

  /**Adds a picture to element*/
  let resultselement = document.getElementById('results');
  resultselement.appendChild(link);
}

/**Adds a picture in the picture list on page.*/
function makePicture2(pic, key) {
  console.log("Olen täällä!");
  console.log(pic);
  var link = document.createElement("a");

  /**Shapes picture size and gives it information of id-number on database.*/
  link.setAttribute("class", "photovar");
  var x = document.createElement("img");
  x.setAttribute("src", pic);
  x.setAttribute("id", key);
  x.setAttribute("height", "200");
  x.setAttribute("onclick", "bigPicture(" + key + " );");
  link.appendChild(x);

  /**Adds a picture to element*/
  let resultselement2 = document.getElementById('results');
  resultselement2.appendChild(link);
}

/**Calls the database function and uses it to get the big picture and comments of that picture.*/
function bigPicture(key) {

  var photovar = document.getElementsByClassName("photovar");
  var i;
  for (i = 0; i < photovar.length; i++) {
    photovar[i].setAttribute("href", "#comment");
  }
  showCommentsElement();

  searchDatabase2(key);
  searchDatabase3(key); //Kutsuu funktiota jolla tehdään valittu kuva isona.
}

/**Makes an element for the big picture and formulates picture.*/
function makeBigPicture(pic) {
  var link = document.createElement("a");
  let noPic = document.getElementById("realBigPicturePic");
  var x = document.createElement("img");
  x.setAttribute("src", pic);
  x.setAttribute("width", "75%");
  link.appendChild(x);
  noPic.appendChild(link);
  console.log("Iso kuva luotu!");
  console.log(pic);
}

/**
 * Adds the photo (the link, description and animal) into the database
 */
function addPhoto() {
  var xhttp = new XMLHttpRequest();
  var data = {};
  var e = document.getElementById("description");
  data.kuvaus = e.options[e.selectedIndex].text;

  console.log("data.kuvaus: " +data.kuvaus);
  var elain = document.getElementById('animal');
  data.elain = elain.value;
  var linkki = document.getElementById('link');

  data.linkki = linkki.value;
  console.log(data.elain);
  console.log(data.linkki);
  console.log("data: " + data);
  var json1 = JSON.stringify(data);
  console.log("json:" + json1);

  /**Checks if the web address starts with http*/
  var test = linkki.value.startsWith("http");
  console.log(test);

  /**Puts the picture on database if web address starts with http*/
  if(test==true){
    /**
     * gets response from back end
     */
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("Responsetext: " + xhttp.responseText);

        var photoresponse = document.getElementById("photoresponse");
        photoresponse.innerHTML = "You have added a cute pic!"
      }
    };
    xhttp.open("POST", "http://localhost:8081/postphoto/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(json1);

    //reset values
    elain.value = "";
    linkki.value = "";

    document.getElementById("description").selectedIndex = 0;
  }
  /**Gives the error message if the address starts somehow different*/
  else {
    var photoresponse = document.getElementById("photoresponse");
    photoresponse.innerHTML = "You have wrong adress"
  }

};
/**
 * Adds a comment into the database and on the page
 */
function addComment(key){
  console.log("sisällä addcommentissa ja kuva nro " + key);

  var xhttp = new XMLHttpRequest();
  var data1 = {};

  var comment = document.getElementById('comment');
  data1.comment = comment.value;

  data1.key = key;
  console.log("data1.key = " + data1.key);
  console.log("data: " + data1);
  var json2 = JSON.stringify(data1);
  console.log("json:" + json2);


  if (!!comment.value){
    /**
     * gets response from back end
     */
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("Responsetext: " + xhttp.responseText);

        var commentresponse = document.getElementById("commentresponse");
        commentresponse.innerHTML = "You added a cute comment!";

        //shows new comment
        searchDatabase2(key);
        console.log("kommenttien pitäisi toimia, jos tähän päästään");
      }
    };
    xhttp.open("POST", "http://localhost:8081/postcomment/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(json2);

    //resets values
    comment.value = "";

  } else {
    var commentresponse = document.getElementById("commentresponse");
    commentresponse.innerHTML = "You didn't write anything!";
  }


}
/**Finds special cuties group pictures and clears the old results from element.*/
function findCutties(){

  clearBox("results");
  var choice = document.getElementById("description2").value;
  console.log(choice);
  searchDatabase4(choice);

}
/**Clears the element*/
function clearBox(elementID)
{
  document.getElementById(elementID).innerHTML = "";
}

/**Searches from database selected cuties group of pictures*/
function searchDatabase4(choice) {
  console.log("Pääsin tänne");
  console.log(choice);

  var choice2 = String(choice);
  var number = new XMLHttpRequest();
  number.onreadystatechange = function () {
    if (number.readyState === 4 && number.status === 200) {
      console.log("Täällä ollaan");
      json = JSON.parse(number.responseText);
      var lenght = 0;
      for (var key in json) {
        if (json.hasOwnProperty(key)) {
          lenght++;
        }
      }
      key = 1;
      /**Makes element for results if they exist.*/
      console.log("Olen etsimässä tietoja");
      if (lenght > 0) {
        console.log("Responsetext: " + number.responseText);

        var divElement = document.getElementById("results2");
        divElement.innerText = "";
        var i;

        /**Sets information for picture and send them to function makePicture2 which makes the picture onto the page*/
        for (i in json) {
          var pic = json[i].Linkki; /*Gives picture address to value of pic.*/
          console.log("Ollaanko vielä mukana?");
          console.log(pic);
          key = json[i].id; /* Gives picture id on databes  to value of key. */
          console.log(key);
          makePicture2(pic, key);

        }
      }
    }
  };
  number.open("GET", "http://localhost:8081/sweetassugar?Kuvaus="+choice);
  number.send();
  console.log("Yritän olla täällä");
}
