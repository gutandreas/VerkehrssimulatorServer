

function refresh_page(){

    fetch("/ranking", {method: 'GET'})
        .then(res => res.text())
        .then(text => JSON.parse(text))
        .then(json => {
            console.log(json.data)

            $("#table tr").remove();

            for (i = 0; i < json.data.length; i++){

                if (json.data[i].name != undefined) {
                    console.log(json.data[i].name)
                    console.log(json.data[i].cars)
                    var table = document.getElementById("table");

                    // Create an empty <tr> element and add it to the 1st position of the table:
                    var row = table.insertRow(i);

                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);

                    // Add some text to the new cells:
                    cell1.innerHTML = json.data[i].name;
                    cell2.innerHTML = json.data[i].cars;
                    cell3.innerHTML = json.data[i].time;
                    cell4.innerHTML = new Date().toLocaleString();
                }
            }


        })

}

function sortTable(column) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[column];
            y = rows[i + 1].getElementsByTagName("TD")[column];
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function deleteData(){


    let password = prompt("Passwort:");

    fetch("/ranking", {
        method: 'DELETE',
        body: JSON.stringify({
        "password": password
    }),
        headers: {
        "Content-type": "application/json"
        }
    })
        .then(res => res.text())
        .then(text => {
            console.log(text)
            if (text == "Passwort korrekt"){
                alert("Die Daten auf dem Server wurden entfernt. Aktualisieren Sie die Tabelle.")
            }
            else {
                alert("Das Passwort ist falsch.")
            }
        })
}

// Scroll Funktion für Tabelle
$(window).on("load resize ", function() {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();