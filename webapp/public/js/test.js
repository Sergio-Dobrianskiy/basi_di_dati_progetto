// const xhttp = new XMLHttpRequest();
// let cd;
// xhttp.onload = function () {
//     const xmlDoc = xhttp.responseXML;
//     cd = xmlDoc.getElementsByTagName("CD");
//     loadCD();
// };
// xhttp.open("GET", "js/cd_catalog.xml");
// xhttp.send();

// function loadCD() {
//     let table = "<tr><th>Artist</th><th>Title</th><th>BANNA</th></tr>";
//     for (let i = 0; i < cd.length; i++) {
//         table += "<tr onclick='displayCD(" + i + ")'><td>";
//         table += cd[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue;
//         table += "</td><td>";
//         table += cd[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
//         table += "</td><td>";
//         table += "<button type='button'>BANN!</button>"
//         table += "</td></tr>";
//     }
//     document.getElementById("cdList").innerHTML = table;
// }

// function displayCD(i) {
//     document.getElementById("showCD").innerHTML =
//         "Artist: " +
//         cd[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
//         "<br>Title: " +
//         cd[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
//         "<br>Year: " +
//         cd[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
// }
