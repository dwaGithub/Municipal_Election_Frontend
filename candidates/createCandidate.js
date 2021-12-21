const candidateFormDiv = document.getElementById("create-candidate-form");
const candidateFormExpandButton = document.getElementById("expand-candidate-form");

const createCandidateForm = `
    <div>
        <label>Navn</label>
        <input id="create-candidate-name" placeholder="Navn">
    </div>
    <div>
        <label>Køn</label>
        <select name="candidate-gender" id="create-candidate-gender">Køn
        <option value="MALE">Mand</option> 
        <option value="FEMALE">Kvinde</option> 
        <option value="OTHER">Andet</option>
        </select>
    </div>
    <div>
        <label>Kommune</label>
        <input id="create-candidate-municipal" placeholder="Kommune">    
    </div>
    <div>
        <label>Antal stemmer</label>
        <input id="create-candidate-personalVotes" placeholder="Personlige stemmer">    
    </div>
    <div>
        <label>Parti</label>
        <select name="candidate-partyName" id="create-candidate-partyId">
        <option value="1">Socialdemokratiet</option> 
        <option value="2">Det konservative Folkeparti"</option>
        <option value="3">SF</option>
        <option value="4">Dansk Folkeparti</option>
        <option value="5">Venstre</option>
        <option value="6">Enhedslisten</option>
        </select>
    </div>
    <div>
        <button onclick="createCandidate()">Opret ny Kandidat</button>
        <button onclick="removeCandidateForm()">Annuller</button>
    </div>`;

function showCandidateForm() {
    candidateFormExpandButton.style.display = "none";
    candidateFormDiv.innerHTML = createCandidateForm;
}

function removeCandidateForm() {
    candidateFormExpandButton.style.display = "block";
    candidateFormDiv.innerHTML = "";
}

function createCandidate() {
    const name = document.getElementById("create-candidate-name").value;
    const gender = document.getElementById("create-candidate-gender").value;
    const municipal = document.getElementById("create-candidate-municipal").value;
    const personalVotes = document.getElementById("create-candidate-personalVotes").value;
    const party_id = document.getElementById("create-candidate-partyId").value;


    const newCandidate = {
        name: name,
        gender: gender,
        municipal: municipal,
        personalVotes: personalVotes
    };

    fetch(baseURL + "/candidates/" + party_id, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(newCandidate)
    }).then(response => {
        if (response.status === 200) {
            location.reload();
            return false;
            removeCandidateForm();
            console.log(response);
        }else {
            console.log("Candidate not created", response.status)
        }
    })

}
document.getElementById("expand-candidate-form").addEventListener("click", showCandidateForm);