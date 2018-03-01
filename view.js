"use strict;"


function sectionPart(entity) {

    if (entity == "people") {
        for (var i = 1; i <= ratio; i++) {
            getApiData("people", i);

        }




    }


    else if (entity == "planets") {
        for (var i = 1; i <= ratio; i++) {
            getApiData("planets", i);

        }

    }
    else {
        for (var i = 1; i <= ratio; i++) {
            getApiData("starships", i);

        }

    }
}

sectionPart("people");
sectionPart("planets");
sectionPart("ships");

