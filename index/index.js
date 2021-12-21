const candidateTableBody = document.getElementById("candidate-tbody");
const baseURL = "http://localhost:8080";

fetch(baseURL + "/candidates")
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map(createCandidateTableRow)
    });

function createCandidateTableRow(candidate) {
    const candidateTableRow = document.createElement("tr");
    candidateTableRow.id = candidate.id;

    candidateTableBody.append(candidateTableRow);

    constructCandidateTableRow(candidateTableRow, candidate)
}

function constructCandidateTableRow(candidateTableRow, candidate){
    candidateTableRow.innerHTML = `
            
            <td>
                <p class="row-candidate-id">${candidate.id}</p>
            </td>
            <td>
                <p class="row-candidate-name">${candidate.name}</p>
            </td>
            <td>
                <p class="row-candidate-gender">${candidate.gender}</p>
            </td>
            <td>
                <p class="row-candidate-municipal">${candidate.municipal}</p>
            </td>
            <td>
                <p class="row-candidate-personalVotes">${candidate.personalVotes}</p>
            </td>
             <td>
                <p class="row-candidate-party">${candidate.party.partyName}</p>
            </td>
            <td>
                <button id="update-button-${candidate.id}">📝</button>                       
                <button onclick="deleteCandidate(${candidate.id})">❌</button>            
            </td>    
        `;
    document.getElementById(`update-button-${candidate.id}`)
        .addEventListener("click", () => updateCandidate(candidate));
}

th = document.getElementsByTagName('th');

for(let c = 0; c < th.length; c++){

    th[c].addEventListener('click', item(c))
}


function item(c){

    return function(){
        console.log(c)
        sortTable(c)
    }
}


function sortTable(c) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("candidate-tbody");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[c];
            y = rows[i + 1].getElementsByTagName("TD")[c];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}