var json = null;

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
  document.getElementById('Comments').style.display = 'block';
  document.getElementById('addPage').style.display = 'none';
  document.getElementById('showPage').style.display = 'none';
  document.getElementById('frontPage').style.display = 'none';
}

//**Search image information from database

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
      /**Make element for results if their exist.*/
      if (lenght > 0) {

        var divElement = document.getElementById("results");
        divElement.innerText = "";
        var i;

        /**Put information for picture and send them function makePicture(), which make pictures to page.*/
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

/**Search added comments for picture from database or give supportive message to write own comment to picture if there is non comments.*/

function searchDatabase2(key) {
  /**Change string key to int animalNumber.**/
  var animalNumber = parseInt(key);
  var number = new XMLHttpRequest();
  number.onreadystatechange = function () {
    if (number.readyState === 4 && number.status === 200) {
      json = JSON.parse(number.responseText);
      var lenght = 0;

      /**Search how many comments found from database*/
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
      //tämä lisätty keskiviikkona
      unOnrder.innerHTML = "Cute comments";

      /*If any comment founds they printing here*/
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
      /*If there is no comments on picture, page show constant comment to support user to make own comment */
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
/**Search chosen picture from database in bigger size.*/
function searchDatabase3(key) {
  /**Change string key to int animalNumber.**/
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
        /*Make element and added picture on it and link to comments.*/
        for (i in json) {
          //seuraavat kolme riviä pois keskiviikko
          //var unOnrder = document.createElement("ul");
          // divElement.appendChild(unOnrder);
          //var listElement = document.createElement("li");
          var pic = json[i].Linkki;
          //console.log(json[i].Linkki);
          makeBigPicture(pic);
        }
      }
    }
  };
  number.open("GET", "http://localhost:8081/animalbabys?id="+animalNumber);
  number.send();

  //essi kokeilee
  var commenttemp = document.getElementById("commentbutton");
  commenttemp.setAttribute("onclick", "addComment("+ key +")");
}

/**Add picture in the picture list on page.*/
function makePicture(pic, key) {

  var link = document.createElement("a");

  /**Shape picture size and gives it information of id-number on database.*/
  link.setAttribute("class", "photovar");
  var x = document.createElement("img");
  x.setAttribute("src", pic);
  x.setAttribute("id", key);
  x.setAttribute("height", "200");
  x.setAttribute("onclick", "bigPicture(" + key + " );");
  link.appendChild(x);

  /**Add picture to element*/
  let resultselement = document.getElementById('results');
  resultselement.appendChild(link);
}

/**Add picture in the picture list on page.*/
function makePicture2(pic, key) {
  console.log("Olen täällä!");
  console.log(pic);
  var link = document.createElement("a");

  /**Shape picture size and gives it information of id-number on database.*/
  link.setAttribute("class", "photovar");
  var x = document.createElement("img");
  x.setAttribute("src", pic);
  x.setAttribute("id", key);
  x.setAttribute("height", "200");
  x.setAttribute("onclick", "bigPicture(" + key + " );");
  link.appendChild(x);

  /**Add picture to element*/
  let resultselement2 = document.getElementById('results');
  resultselement2.appendChild(link);
}

/**Call database function and use it get big picture and comments of that picture.*/
function bigPicture(key) {

  //essi kokeilee kommenttielementtijuttua
  var photovar = document.getElementsByClassName("photovar");
  var i;
  for (i = 0; i < photovar.length; i++) {
    photovar[i].setAttribute("href", "#comment");
  }
  showCommentsElement();

  searchDatabase2(key);
  searchDatabase3(key); //Kutsuu funktiota jolla tehdään valittu kuva isona.
  //var bigPic = document.getElementById("bigPicturePage");
  //var realBigPic = document.getElementById("realBigPicturePage");
  //var text = document.createTextNode(key); //Tekee tekstille elementin
  //bigPic.appendChild(text); //Tulostaa kuvan id:n elementtiin
}


/**Make element for big picture and formulata picture.*/
function makeBigPicture(pic) {
  var link = document.createElement("a");
  let noPic = document.getElementById("realBigPicturePic");
  var x = document.createElement("img");
  x.setAttribute("src", pic);
  x.setAttribute("height", "400");
  link.appendChild(x);
  noPic.appendChild(link);
  console.log("Iso kuva luotu!");
  console.log(pic);
}


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

  /**Check if web address stars http*/
  var test = linkki.value.startsWith("http");
  console.log(test);

  /**Put picture on database if web address stars http*/
  if(test==true){
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
  /**Give error message if address starting somehow different*/
  else {
    var photoresponse = document.getElementById("photoresponse");
    photoresponse.innerHTML = "You have wrong adress"
  }



};

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
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("Responsetext: " + xhttp.responseText);

        var commentresponse = document.getElementById("commentresponse");
        commentresponse.innerHTML = "You added a cute comment!";

        //show new comment
        searchDatabase2(key);
        console.log("kommenttien pitäisi toimia, jos tähän päästään");
      }
    };
    xhttp.open("POST", "http://localhost:8081/postcomment/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(json2);

    //reset values
    comment.value = "";

  } else {
    var commentresponse = document.getElementById("commentresponse");
    commentresponse.innerHTML = "You didn't write anything!";
  }


}
/**Find special cuties group pictures and clear the old results from element.*/
function findCutties(){

  clearBox("results");
  var choice = document.getElementById("description2").value;
  console.log(choice);
  searchDatabase4(choice);

}
/**Clear the element*/
function clearBox(elementID)
{
  document.getElementById(elementID).innerHTML = "";
}

/**Search from database selected cuties group of pictures*/
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
      /**Make element for results if their exist.*/
      console.log("Olen etsimässä tietoja");
      if (lenght > 0) {
        console.log("Responsetext: " + number.responseText);

        var divElement = document.getElementById("results2");
        divElement.innerText = "";
        var i;

        /**Set information for picture and sent them to function makePicture2 which make picture to the page*/
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
