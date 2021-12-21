const partyResultTableBody = document.getElementById("election-result-tbody");
const baseURL = "http://localhost:8080";

fetch(baseURL + "/parties")
    .then(response => response.json())
    .then(result => {
        result.map(createPartyTableRow)
    });

function createPartyTableRow(party) {
    const partyTableRow = document.createElement("tr");
    partyTableRow.id = party.id;

    partyResultTableBody.append(partyTableRow);
    constructPartyTableRow(partyTableRow, party)
}

function constructPartyTableRow(partyTableRow, party) {
    partyTableRow.innerHTML = `
    <td>
        <p class="row-party-name">${party.partyName}</p>
    </td>
    <td>
        <p class="row-party-votes">${party.votes}</p>
    </td>
    <td>
        <p class="row-party-percentage-of-votes">${party.votesPercentage}%</p>
    </td> 
    `;
}