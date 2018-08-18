const form = document.querySelector("#form-id"),
	  	applianceTable = document.querySelector("#appliance-list"),
	  	clearBtn = document.querySelector("#clear-btn"),
	  	dayLi = document.querySelector("#total-day-cost"),
	  	monthLi = document.querySelector("#total-month-cost"),
	  	yearLi = document.querySelector("#total-year-cost");

	  	
let totalDayCost = 0,
		totalMonthCost = 0,
		totalYearCost = 0;
// Load Event Listeners
loadEventListeners();

function loadEventListeners(){
	// Dom Load event local storage
	// TODO

	// Add apliance to list
	form.addEventListener('submit', addAppliance);

	// Remove Appliance from list
	applianceTable.addEventListener('click', removeAppliance);

	// Clear List
	clearBtn.addEventListener('click', clearList);
}


// LocalStorage
// TODO


function addAppliance(e) {
	let applianceName = e.target.elements[0].value,
	    powerUsage = e.target.elements[1].value, 
	    hoursDay = e.target.elements[2].value, 
	    costWatt = e.target.elements[3].value, 
	    currency = e.target.elements[4].value;		  	 
	if(applianceName === "" ||
		powerUsage === "" ||
		hoursDay === "" ||
		costWatt === ""){
		// Display error
		showAlert("Please fill in all the fields", "error");


	
	}else{
		const day = 24, month = 30.42, year = 12; // 24hour, 30days, 12 months
		let costDay = calculatePowerCost(powerUsage, hoursDay, costWatt);
		if(costDay === -1){
			showAlert('An error occurred','error');
			
		}else {
			let costMonth = parseFloat((costDay * month).toFixed(4));
			let costYear = parseFloat((costMonth * year).toFixed(4));
			
			addToTotalCost(costDay, costMonth, costYear);
			
			createNewTableRow(applianceName,costDay, costMonth, costYear);		
		}
	}
	// clear inputs TODO: make this into a separate function
	e.target.elements[0].value = "",
  e.target.elements[1].value = "", 
  e.target.elements[2].value = "", 
  e.target.elements[3].value = "",   


	e.preventDefault();
}

function removeAppliance(e){
	
	if(e.target.className.includes("remove")){
		let dayCost, monthCost, yearCost;
		yearCost = parseFloat(e.target.parentElement.previousSibling.innerText);
		monthCost = parseFloat(e.target.parentElement.previousSibling.previousSibling.innerText);
		dayCost = parseFloat(e.target.parentElement.previousSibling.previousSibling.previousSibling.innerText);
		substractTotalCost(dayCost, monthCost, yearCost);
		e.target.parentElement.parentElement.remove()
	}
}

function clearList() {
	if(!applianceTable.firstChild.nextSibling.nextSibling){
		return;
	}
	while(applianceTable.firstChild.nextSibling.nextSibling){
		applianceTable.removeChild(applianceTable.firstChild.nextSibling.nextSibling);
		listHasItems = true;
	}
	
	showAlert('List Cleared', 'success');
	
	totalDayCost = 0;
	totalMonthCost = 0;
	totalYearCost = 0;
	liTotalCost();


}

function createNewTableRow(applianceName, costDay, costMonth, costYear){
	// Create tr element
		const tr = document.createElement('tr');
		
		// Create th element
		const th = document.createElement('th');
		// Create  3 td element costDay, costMonth, costYear
		const tdDay = document.createElement('td'),
			  	tdMonth = document.createElement('td'),
			  	tdYear = document.createElement('td'),
			  	tdRemove = document.createElement('td'),
			  	removeBtn = document.createElement('a');
		removeBtn.className = 'remove cursor';
		
		th.appendChild(document.createTextNode(applianceName));
		tdDay.appendChild(document.createTextNode(costDay));
		tdMonth.appendChild(document.createTextNode(costMonth));
		tdYear.appendChild(document.createTextNode(costYear));
		removeBtn.appendChild(document.createTextNode('x'));

		tr.appendChild(th);
		tr.appendChild(tdDay);
		tr.appendChild(tdMonth);
		tr.appendChild(tdYear);

		tdRemove.appendChild(removeBtn);
		tr.appendChild(tdRemove);

		
		applianceTable.appendChild(tr);
}
// (watts * hour) / 1000 -> kWh day
// (watts * hour / 1000) * 30 -> khw month
// (watts * hour / 1000) * 12 -> khw year
// (wats * hour) / 1000) * cost -> cost day
// ((wats * hour) / 1000) * 30) * cost -> cost day
// ((wats * hour) / 1000) * 30) * 12) * cost -> cost day

function calculatePowerCost(watts, hour, cost) {
	if(watts > 0 && hour > 0 && cost > 0){
		return (((watts * hour)/1000) * cost).toFixed(4);;  // returns cost
	}else {
		return -1; // negative number will be interpreted as an error
	}
}

function addToTotalCost(costDay, costMonth, costYear){
	totalDayCost += parseFloat(costDay);
	totalMonthCost += parseFloat(costMonth);
	totalYearCost	+= parseFloat(costYear);
	liTotalCost();
}

function substractTotalCost(costDay, costMonth, costYear){
	totalDayCost -= costDay;
	totalMonthCost -= costMonth;
	totalYearCost -= costYear;
	liTotalCost();
}

function liTotalCost(){
	dayLi.textContent = totalDayCost.toFixed(4);
	monthLi.textContent = totalMonthCost.toFixed(4);
	yearLi.textContent = totalYearCost.toFixed(4);
}

function showAlert(msg, className){
	// Create Div
	const div = document.createElement('div');
	// Add classes
	div.className = `alert ${className}`;
	// Add text
	div.appendChild(document.createTextNode(msg));
	// Get Parent
	const container = document.querySelector('.container');
	const form = document.querySelector('#title-id');
	// Insert alert
	container.insertBefore(div, form);

	// Timout after 3s
	setTimeout(function(){
		document.querySelector('.alert').remove();
	}, 3000);

}