const tryRegister = async () => {
	var res = document.getElementById("response");
	var emailInput = document.getElementById("emailInput");
	var codeInput = document.getElementById("codeInput");

	var email = emailInput.value;
	var code = codeInput.value;

	if (email===''||code==='') return;
	if (!emailInput.checkValidity()) return;
	if (!codeInput.checkValidity()) return;

	let url = "http://localhost:2000/api/register";
	let body = {
		email: email,
		code: code
	}
	jsonResponse = await postData(url, body);
	if (jsonResponse) res.innerHTML = JSON.parse(jsonResponse);
	else res.innerHTML = "ERROR";
}


async function postData(url = '', data = {}) {
	const response = await fetch(url, {
	  method: 'POST', 
	  cache: 'no-cache',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	console.log(response);
	return response.json(); // parses JSON response into native JavaScript objects
  }