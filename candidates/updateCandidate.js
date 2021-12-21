function updateCandidate(candidate) {
    const tableRowToUpdate = document.getElementById(candidate.id)
    tableRowToUpdate.innerHTML = `
        <td>
            <p class="row-candidate-id">${candidate.id}</p>
        </td>
        <td>
            <input id="update-candidate-name-${candidate.id}" value="${candidate.name}">
        </td>
        <td>
            <input id="update-candidate-gender-${candidate.id}" value="${candidate.gender}">
        </td>
        <td>
            <input id="update-candidate-municipal-${candidate.id}" value="${candidate.municipal}">
        </td>
        <td>
            <input id="update-candidate-personalVotes-${candidate.id}" value="${candidate.personalVotes}">
        </td>
        <td>
             <input id="update-candidate-partyId-${candidate.id}" value="${candidate.partyId}">
        </td>
        <td>
            <button id="cancel-update-${candidate.id}">✖️</button>
            <button onclick="updateCandidateInDB(${candidate.id})">✅</button>
        </td>
    `;
    document.getElementById(`cancel-update-${candidate.id}`).addEventListener("click", () => undoUpdateTableRow(candidate))

}


function updateCandidateInDB(candidateId) {
    console.log(candidateId)
    const tableRowToUpdate = document.getElementById(candidateId);

    const candidateToUpdate = {
        candidateId: candidateId,
        name: document.getElementById(`update-candidate-name-${candidateId}`).value,
        gender: document.getElementById(`update-candidate-gender-${candidateId}`).value,
        municipal: document.getElementById(`update-candidate-municipal-${candidateId}`).value,
        personalVotes: document.getElementById(`update-candidate-personalVotes-${candidateId}`).value,
        party_id: {partyId: document.getElementById(`update-candidate-partyId-${candidateId}`)}.value
    };
    fetch(baseURL + "/candidates/" + candidateId, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(candidateToUpdate)
    }).then(response => {
        if (response.status === 200) {
            constructCandidateTableRow(tableRowToUpdate, candidateToUpdate);
        }
    });
}
function undoUpdateTableRow(candidate) {
    const candidateTableRow = document.getElementById(candidate.id);

    constructCandidateTableRow(candidateTableRow, candidate);
}
function deleteCandidate(candidateId) {
    fetch(baseURL + "/candidates/" + candidateId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(candidateId).remove();
        } else {
            console.log(response.status);
        }
    })
}