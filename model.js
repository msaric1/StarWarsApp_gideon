"use strict;"


var data = {
    people: [

    ],
    planets: [

    ],
    starships: [

    ]
};

var dataUrls = {
    people: [

    ]
    ,
    planets: [

    ],
    starships: [

    ]
};

var display = {
    people: {
        lastIndex: 0,
        counter: 0
    },
    planets: {
        lastIndex: 0,
        counter: 0
    },
    starships: {
        lastIndex: 0,
        counter: 0
    }
};



const numberOfCards = 12;

var ratio = Math.ceil(numberOfCards / 10);


function getApiData(entity, page) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var cardsData = JSON.parse(this.responseText);
            setData(entity, cardsData.results, page);
        }

    }

    xmlhttp.open("GET", "https://swapi.co/api/" + entity + "/?page=" + page, true);
    xmlhttp.send();
}


function setData(entity, apiData, page) {

    if (entity === "people") {

        data.people = data.people.concat(apiData);

        renderData("people", "1", "fa-user-o", page);
        if (data.people.length >= numberOfCards) {
            for (x in data[entity]) {
                for (k in data[entity][x]) {
                    if (k != "url" && k != "created" && k != "edited" && k != "isRendered") {
                        fillTable(entity, "1");
                    }
                }
            }
        }

    }
    else if (entity === "planets") {

        data.planets = data.planets.concat(apiData);

        renderData("planets", "2", "fa-sun-o", page);
        if (data.planets.length >= numberOfCards) {
            for (x in data[entity]) {
                for (k in data[entity][x]) {
                    if (k != "url" && k != "created" && k != "edited" && k != "isRendered") {
                        fillTable(entity, "2");
                    }
                }
            }
        }
    }

    else {

        data.starships = data.starships.concat(apiData);

        renderData("starships", "3", "fa-anchor", page);
        if (data.starships.length >= numberOfCards) {

            for (x in data[entity]) {

                for (k in data[entity][x]) {

                    if (k != "url" && k != "created" && k != "edited" && k != "isRendered") {
                        fillTable(entity, "3");
                    }
                }
            }
        }
    }

}



function renderData(entity, sectionNumber, iconName, page) {

    var section = document.getElementById("section" + sectionNumber);

    if (data[entity] !== undefined && data[entity].length > 0) {

        for (var i = display[entity].lastIndex; i < data[entity].length; i++) {

            if (data[entity][i] !== undefined && display[entity].counter <= numberOfCards) {

                if (data[entity][i].isRendered === undefined || data[entity][i].isRendered === false) {

                    var div = document.createElement("div");
                    div.setAttribute("id", entity + '_' + i);
                    div.setAttribute("data-index", i);
                    div.setAttribute("data-entity", entity);
                    div.setAttribute("onmouseenter", "getCardLocation(this)");
                    var icon = document.createElement("i");
                    var tbody = document.createElement("tbody");
                    tbody.setAttribute("id", entity + 'tb' + i);
                    var table = document.createElement("table");
                    table.setAttribute("id", entity + 'tbl' + i);

                    table.className = 'table-condensed table-hover ';
                    div.className = "card col-lg-3 col-sm-6 col-md-4 col-12";
                    icon.className = "fa " + iconName + " fa-4x";
                    table.appendChild(tbody);
                    div.appendChild(icon);
                    div.appendChild(table);
                    section.appendChild(div);


                }

                data[entity][i].isRendered = true;
                display[entity].counter++;
                display[entity].lastIndex = i;

            }
        }

    }

}

function findUrls(data) {


    if (typeof data == "string") {

        return data.search("http");

    }
    else if (typeof data == "object" && typeof data[0] == "string") {

        return (data[0].search("http"));

    }

}
function getData(array) {
    var thisData = array.slice(0, numberOfCards);
    return thisData;
}
function getIndexNumber(entity) {
    var singleDataIndex = data[entity].indexOf(data[entity][x]);
    return singleDataIndex;
}



function fillTable(entity, sectionNumber) {

    var i = getIndexNumber(entity);
    if (i < numberOfCards) {
        var txtEntityKeys = document.createTextNode(k.replace(/_/g, " ") + ":");
        var txtEntitydatas = document.createTextNode(data[entity][x][k]);

        if (data[entity][x][k] == "") {
            var txtEntitydatas = document.createTextNode(["----"]);
        }
        if (findUrls(data[entity][x][k]) > -1) {
            saveUrls(data[entity][x][k], entity);

            var txtEntitydatas = document.createElement("i");
            txtEntitydatas.className = "fa fa-spinner fa-pulse fa-fw";
            txtEntitydatas.setAttribute("data-name", k);


        }


        var tr = document.createElement("tr");
        var td_keys = document.createElement("td")
        var td_datas = document.createElement("td")

        var tbody = document.getElementById(entity + 'tb' + i);
        var table = document.getElementById(entity + 'tbl' + i);

        tr.appendChild(td_keys);
        td_keys.appendChild(txtEntityKeys);
        tbody.appendChild(tr);
        tr.appendChild(td_datas);
        td_datas.appendChild(txtEntitydatas);
        tbody.appendChild(tr);
        table.appendChild(tbody);
        txtEntitydatas.parentElement.setAttribute("data-name", k);

    }
}

function getCardLocation(card) {
    var loc = card.getAttribute("id");
    var data_entity = card.getAttribute("data-entity");
    var data_index = card.getAttribute("data-index");

    if (data_entity === "people") {
        getRelatedData(dataUrls.people, data_entity, data_index, loc);
    }
    else if (data_entity === "planets") {

        getRelatedData(dataUrls.planets, data_entity, data_index, loc);
    }
    else {

        getRelatedData(dataUrls.starships, data_entity, data_index, loc);
    }


    return data_index;

}



function saveUrls(url, entity) {
    var i = getIndexNumber(entity);
    if (typeof url === "string") {
        if (entity === "people") {
            dataUrls.people.push({ index: i, [k]: url });


        }
        else if (entity === "planets") {
            dataUrls.planets.push({ index: i, [k]: url });

        }
        else {
            dataUrls.starships.push({ index: i, [k]: url });

        }
    }
    
    if (typeof url ==="object" && typeof url!="number") {

        if (entity === "people") {
            dataUrls.people.push({ index: i, [k]: url });

        }
        else if (entity === "planets") {
            dataUrls.planets.push({ index: i, [k]: url });

        }
        else {
            dataUrls.starships.push({ index: i, [k]: url });

        }
    }
    /*  if (dataUrls[entity].length > 0) {
          for (var i = 0; i < dataUrls[entity].length; i++) {
              for (var j = i + 1; j < dataUrls[entity].length; j++) {
                  if (dataUrls[entity][i].index === dataUrls[entity][j].index) {
                       array.assign(dataUrls[entity][i], dataUrls[entity][j]);
                      
                  }
              }
             
          }
  
      }*/
}



function getRelatedData(array, data_entity, data_index, loc) {
    var div = document.getElementById(loc);
    var table = div.lastChild;
    var tbody = table.firstChild;
    for (j = 0; j < tbody.children.length; j++) {

        var check = tbody.children[j].lastChild.childNodes[0].nodeName;
        var place = tbody.children[j].lastChild;

        if (check === "I") {
            var attribute = tbody.children[j].lastChild.childNodes[0].parentElement.getAttribute("data-name");
            for (i = 0; i < array.length; i++) {

                if (array[i].index.toString() === data_index) {
                    for (x in array[i]) {

                        if (x != "index" && x === attribute) {

                            if (typeof array[i][x] === "string") {

                                getStringData(array, tbody.children[j].lastChild);
                            }

                             if (typeof array[i][x] ==="object" ) {
                               
                                 for (k = 0; k <array[i][x].length; k++) {
                                      
                                getArrayData(array[i][x][k],tbody.children[j].lastChild);
                            }

                           
                        }



                    }
                }
            }
        }
    }
}
}

function getStringData(array, place) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var dataResults = JSON.parse(this.responseText);

            if (Object.values(dataResults)[0]) {
                var p = document.createElement("p");
                var text = document.createTextNode(Object.values(dataResults)[0]);

                p.appendChild(text);
                p.style.margin = "auto"
                place.replaceWith(p);
            }

        }
    };

    xhttp.open("GET", array[i][x], true);
    xhttp.send();
}


function getArrayData(array,place) {
    var urlsInArray = array;
   
       var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var dataResults = JSON.parse(this.responseText);
                if (Object.values(dataResults)[0]) {
                    if(place.firstChild.nodeName==="I"){
                        place.removeChild(place.firstChild);
                    }
                    var p = document.createElement("p");
                    var text = document.createTextNode(Object.values(dataResults)[0]);
                    p.appendChild(text);
                    p.style.margin = "auto"
                    place.appendChild(p)
                }

            }
        };
    
        xhttp.open("GET", urlsInArray, true);
        xhttp.send();
    
    
}