(function (window, document) {
    "use strict";
    window.addEventListener("load", function() {

        const datei = "../data/colorSets.json";

        ajaxGet(datei, function(resp) {
            const colorFile = JSON.parse(resp);
            // console.log(colorFile.colorsets.length);
            getColorSet(colorFile);
        })


        /////////////////////////////////////////////////
        // Verschieben der Boxen
        /////////////////////////////////////////////////

        const btn = document.getElementsByClassName("btn");
        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener("click", changePosition);
        }

        /////////////////////////////////////////////////
        // Verschieben der Boxen: Funktionen
        /////////////////////////////////////////////////

        function changePosition(e) {

            const columns = document.getElementsByClassName("column");

            ///////////////////////////////////////
            // Alle Top-Buttons gangbar machen
            //////////////////////////////////////
            if (this.parentElement.classList.contains("top")) {
                if (this.classList.contains("toRight")) {

                    if (this.parentElement.parentElement === columns[2] &&
                        this.parentElement.nextElementSibling.hasChildNodes() === false) {
                        jumpRightToLeftTop(this);

                        // schaue ob das folgende Element (die zu verschiebenden Boxen)
                        // ein, oder mehrere Kinder haben. Die Boxen haben keine, die 
                        // Bottom-Navigation aber schon. Falls nein, dann führe Funktion aus.
                        // Bzw. verschiebe Elemente bis die Boxen alle weg sind.
                    } else if (this.parentElement.nextElementSibling.hasChildNodes() === false) {
                        moveRightTop(this);
                    }
                }
                if (this.classList.contains("toLeft")) {
                    if (this.parentElement.parentElement === columns[0] &&
                        // verhindert, dass die Buttons mit verschoben werden
                        this.parentElement.nextElementSibling.hasChildNodes() === false) {
                        jumpLeftToRightTop(this);

                        // verhindert, dass die Buttons mit verschoben werden
                    } else if (this.parentElement.nextElementSibling.hasChildNodes() === false) {
                        moveLeftTop(this);
                    }
                }
            } // Ende if contains "top"

            ///////////////////////////////////////
            // Alle Bottom-Buttons gangbar machen
            //////////////////////////////////////
            if (this.parentElement.classList.contains("bottom")) {
                if (this.classList.contains("toRight")) {

                    if (this.parentElement.parentElement === columns[2] &&
                        this.parentElement.previousElementSibling.hasChildNodes() === false) {
                        jumpRightToLeftBottom(this);

                        // schaue ob das folgende Element (die zu verschiebenden Boxen)
                        // ein, oder mehrere Kinder haben. Die Boxen haben keine, die 
                        // Bottom-Navigation aber schon. Falls nein, dann führe Funktion aus.
                        // Bzw. verschiebe Elemente bis die Boxen alle weg sind.
                    } else if (this.parentElement.previousElementSibling.hasChildNodes() === false) {
                        moveRightBottom(this);
                    }
                }
                if (this.classList.contains("toLeft")) {
                    if (this.parentElement.parentElement === columns[0] &&
                        // verhindert, dass die Buttons mit verschoben werden
                        this.parentElement.previousElementSibling.hasChildNodes() === false) {
                        jumpLeftToRightBottom(this);

                        // verhindert, dass die Buttons mit verschoben werden
                    } else if (this.parentElement.previousElementSibling.hasChildNodes() === false) {
                        moveLeftBottom(this);
                    }
                }
            } // Ende if contains "top"

        }
    });


    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    //// Funktionen
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    function ajaxGet(file, fn) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", file, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                fn(xhr.responseText);
            }
        };
        xhr.send();
    }

    function getColorSet(colorFile) {
        // einen zufälligen Index aus dem Array auswählen
        var randomSetNumber = Math.floor(Math.random() * colorFile.colorsets.length);

        // mithilfe der zufällig ausgewählten Nummer ein Element/Objekt auswählen
        const randomSet = colorFile.colorsets[randomSetNumber];

        attachColor(randomSet);

    } // ende getColorSet 

    ///////////////////////////////////////////////////////
    // Farben zuweisen
    //////////////////////////////////////////////////////
   
    // weist den div die farben zu und sorgt dafür, dass die Farben auch gleichmäßig verteilt werden
    function attachColor(randomSet) {

        var zero = 0,
            one = 0,
            two = 0;
        var boxes = document.getElementsByClassName("box");

        for (let i = 0; i < boxes.length; i++) {
            var hex = "";
            var rand = (Math.floor(Math.random() * 3));

            // Variable zur Bestimmung wie viele Boxen jeweils 
            // die gleiche Farbe haben dürfen
            var full = boxes.length / 3;

            if (zero >= full && one >= full && two >= full) {
                break;
            }

            switch (rand) {
                case 0:
                    // wenn die farbe 1/3 der boxen zugewiesen wurde, 
                    // wird die Zuweisung abgebrochen und die Schleife wird neugestartet
                    if (zero >= full) {
                        i--;
                        break;
                    }
                    // farbe aus Objekt wird der Variablen übergeben
                    hex = randomSet.colorOne;
                    zero++;
                    boxes[i].style.backgroundColor = hex;
                    break;
                case 1:
                    if (one >= full) {
                        i--;
                        break;
                    }
                    hex = randomSet.colorTwo;
                    one++;
                    boxes[i].style.backgroundColor = hex;
                    break;
                case 2:
                    if (two >= full) {
                        i--;
                        break;
                    }
                    hex = randomSet.colorThree;
                    two++;
                    boxes[i].style.backgroundColor = hex;
                    break;
            }

        } // ende for-schleife        
    } // ende attachColor

    ///////////////////////////////////////////////////////
    // Elemente verschieben
    //////////////////////////////////////////////////////

    // Top-Bereich //////////////////////////////////////

    function moveRightTop(element) {
        // if (element.classList.contains("toRight")) {
        const moveRightTop =
            element
            .parentElement
            .nextElementSibling;
        const takeFromLeftTop =
            element
            .parentElement
            .parentElement
            .nextElementSibling
            .firstElementChild
            .nextElementSibling;

        element
            .parentElement
            .parentElement
            .nextElementSibling
            .insertBefore(
                moveRightTop, takeFromLeftTop
            )
    } // Ende function moveRightTop

    // Schiebt das Top-Element von der äußeren rechten Spalte zur ersten Spalte
    function jumpRightToLeftTop(element) {
        const column1 = document.getElementsByClassName("column")[0];

        const jumpRightToLeftTop =
            element
            .parentElement
            .nextElementSibling;

        const takeJumpFromOuterRightTop =
            column1
            .firstElementChild
            .nextElementSibling;

        column1
            .insertBefore(
                jumpRightToLeftTop, takeJumpFromOuterRightTop
            )
    } // Ende function jumpRightToLeftTop

    function moveLeftTop(element) {
        const moveLeftTop =
            element
            .parentElement
            .nextElementSibling;
        const takeFromRightTop =
            element
            .parentElement
            .parentElement
            .previousElementSibling
            .firstElementChild
            .nextElementSibling;

        element
            .parentElement
            .parentElement
            .previousElementSibling
            .insertBefore(
                moveLeftTop, takeFromRightTop
            )
    } // Ende function moveLeftTop

    // Schiebt das Top-Element von der äußeren rechten Spalte zur ersten Spalte
    function jumpLeftToRightTop(element) {
        const column1 = document.getElementsByClassName("column")[2];

        const jumpLeftToRightTop =
            element
            .parentElement
            .nextElementSibling;

        const takeJumpFromOuterLeftTop =
            column1
            .firstElementChild
            .nextElementSibling;

        column1
            .insertBefore(
                jumpLeftToRightTop, takeJumpFromOuterLeftTop
            )
    } // Ende function jumpRightToLeftTop


    // Bottom-Bereich //////////////////////////////////////

    function moveRightBottom(element) {
        // if (element.classList.contains("toRight")) {
        const moveRightBottom =
            element
            .parentElement
            .previousElementSibling;
        const takeFromLeftBottom =
            element
            .parentElement
            .parentElement
            .nextElementSibling
            .lastElementChild;

        element
            .parentElement
            .parentElement
            .nextElementSibling
            .insertBefore(
                moveRightBottom, takeFromLeftBottom
            )
    } // Ende function moveRightTop


    // Schiebt das Top-Element von der äußeren rechten Spalte zur ersten Spalte
    function jumpRightToLeftBottom(element) {
        const column1 = document.getElementsByClassName("column")[0];

        const jumpRightToLeftBottom =
            element
            .parentElement
            .previousElementSibling;

        const takeJumpFromOuterRightBottom =
            column1
            .lastElementChild

        column1
            .insertBefore(
                jumpRightToLeftBottom, takeJumpFromOuterRightBottom
            )
    } // Ende function jumpRightToLeftTop

    function moveLeftBottom(element) {
        const moveLeftBottom =
            element
            .parentElement
            .previousElementSibling;
        const takeFromRightBottom =
            element
            .parentElement
            .parentElement
            .previousElementSibling
            .lastElementChild

        element
            .parentElement
            .parentElement
            .previousElementSibling
            .insertBefore(
                moveLeftBottom, takeFromRightBottom
            )
    } // Ende function moveLeftTop

    // Schiebt das Bottom-Element von der äußeren rechten Spalte zur ersten Spalte
    function jumpLeftToRightBottom(element) {
        const column1 = document.getElementsByClassName("column")[2];

        const jumpLeftToRightBottom =
            element
            .parentElement
            .previousElementSibling;

        const takeJumpFromOuterLeftBottom =
            column1
            .lastElementChild

        column1
            .insertBefore(
                jumpLeftToRightBottom, takeJumpFromOuterLeftBottom
            )
    } // Ende function jumpRightToLeftTop

}(window, document));