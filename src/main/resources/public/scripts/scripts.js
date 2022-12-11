

function refresh_page(){

    fetch("/ranking", {method: 'GET'})
        .then(res => res.text())
        .then(text => JSON.parse(text))
        .then(json => {
            console.log(json.data)

            $("#table-data tr").remove();

            for (i = 0; i < json.data.length; i++){

                if (json.data[i].name != undefined) {
                    console.log(json.data[i].name)
                    console.log(json.data[i].cars)
                    var table = document.getElementById("table-data");

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


function deleteData(){


    let password = document.getElementById('password-input').value


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

// Table Sorter für Tabelle
$(document).ready(function()
    {
        $("#table-data").tablesorter();
    }
);