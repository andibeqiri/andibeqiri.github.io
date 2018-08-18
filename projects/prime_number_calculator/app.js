const form = document.querySelector('#form-id');
const numberInput = document.querySelector('#number-input');
const container = document.querySelector('.container');
const card = document.querySelector('#card-id');
const checkBtn = document.querySelector('#btn-id');

form.addEventListener('submit', evaluate);


function Prime(n){
	this.n = n;
}

Prime.prototype.check_prime = function(){
	if(this.n === 2){
		return true;
	}
	if(this.n % 2 === 0 || this.n < 2){
		return false;
	}
	let number = Math.sqrt(this.n);
	for(let i = 3; i <= number; i+=2){
		if(this.n % i === 0){
			return false;
		}
	}
	return true;
}

function Ui(){};

Ui.prototype.clearField = function(){
	numberInput.value = "";
}

Ui.prototype.showAlert = function(msg, className){
	const div = document.createElement('div');
	div.className = 'alert ' + className;
	div.appendChild(document.createTextNode(msg));
	container.insertBefore(div, form);
	setTimeout(function(){
		document.querySelector('.alert').remove();
	}, 3000);

}


Ui.prototype.showAnswer = function(answer){
	const yes = document.querySelector('#yes-id')
	const no = document.querySelector('#no-id')
	const primeNumber = document.querySelector('#prime-id');
	const compositeNumber = document.querySelector('#composite-id');
	if(primeNumber.firstChild){
		primeNumber.firstChild.remove();
	}else if(compositeNumber.firstChild){
		compositeNumber.firstChild.remove();
	}
	card.style.display = 'block';
	if(answer){		
		primeNumber.appendChild(document.createTextNode(numberInput.value));
		yes.style.display = 'block';		
		no.style.display = 'none';
				
	}else{
		
		compositeNumber.appendChild(document.createTextNode(numberInput.value));
		no.style.display = 'block';
		yes.style.display = 'none';
		
	}
}

function evaluate(e){
	const ui = new Ui();
	const number = parseInt(numberInput.value);
	
	if(isNaN(number)){
		ui.showAlert('Invalid Input', 'text-danger');
	}else {
		const prime = new Prime(number);
		const answer = prime.check_prime();
		console.log(answer);
		ui.showAnswer(answer);	
		ui.clearField();
	}
	
	e.preventDefault();
}

