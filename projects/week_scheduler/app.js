const selectDay = document.querySelector('#day-id');
const selectHour = document.querySelector('#hour-id');
const scheduleTable = document.querySelectorAll('.table');
const scheduleForm = document.querySelector("#form-id");
const subjectName = document.querySelector('#subject-name');
const dayId = document.querySelector('#day-id');
const hourId = document.querySelector('#hour-id');

const days = [
    { value: 'mon', label: 'Monday' },
    { value: 'tue', label: 'Tuesday' },
    { value: 'wed', label: 'Wednesday' },
    { value: 'thur', label: 'Thursday' },
    { value: 'fri', label: 'Friday' }
  ];
const hours = [
    { value: '08to09', label: '08:00-09:00' },
    { value: '09to10', label: '09:00-10:00' },
    { value: '10to11', label: '10:00-11:00' },
    { value: '11to12', label: '11:00-12:00' },
    { value: '12to13', label: '12:00-13:00' },
    { value: '13to14', label: '13:00-14:00' },
    { value: '14to15', label: '14:00-15:00' },
    { value: '15to16', label: '15:00-16:00' },
    { value: '16to17', label: '16:00-17:00' },
    { value: '17to18', label: '17:00-18:00' },
    { value: '18to19', label: '18:00-19:00' },
    { value: '19to20', label: '19:00-20:00' },
  ];




loadEventListeners();

function loadEventListeners(){
	// Dom load event
	document.addEventListener('DOMContentLoaded', populateSelect(days, selectDay));
  document.addEventListener('DOMContentLoaded', populateSelect(hours, selectHour));
  document.addEventListener('DOMContentLoaded', popullateTable());
  scheduleForm.addEventListener('submit', addToTable);


}


function populateSelect(data, selectElement){

	data.forEach(function(item){
		const option = document.createElement('option');
		option.value = item.value;
		option.label = item.label;
		selectElement.appendChild(option);
	});

}

function popullateTable(){
  days.forEach(function(day){
    let tr = document.querySelectorAll('.hours');
    hours.forEach(function(hour, i){
    let td = document.createElement('td');
    td.id = day.value+ '-' + hour.value;
    tr[i].appendChild(td);
    });
  });
}

function addToTable(e) {

  if(subjectName.value === ""){
    console.log("Write Subjet Name");
  }else {
    let subject = document.querySelector('#' + dayId.value + '-' + hourId.value);
    if(!subject.firstChild){
      subject.className = 'bg-info text-light';    
      subject.appendChild(document.createTextNode(subjectName.value));
    }
    
  }

  e.preventDefault();

}


