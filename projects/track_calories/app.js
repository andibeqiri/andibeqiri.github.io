// Storage Constroller
const StorageCtrl = (function(){
	// Public mothods
	return {
		storeItems: function(item){
			let items;
			// Check if any items in ls
			if(localStorage.getItem('items') === null){
				items = [];
				// push new item
				items.push(item);

				// set ls

				localStorage.setItem('items', JSON.stringify(items));
			}else{
				// Get what is already in ls
				items = JSON.parse(localStorage.getItem('items'));

				// Push new item
				items.push(item);

				// reset ls
				localStorage.setItem('items', JSON.stringify(items));
			}
		},
		getItemsFromStorage: function(){
			let items;
			if(localStorage.getItem('items') === null){
				items = [];
			}else{
				items = JSON.parse(localStorage.getItem('items'));
			}
			return items;
		},
		updateItemStorage: function(updatedItem){
			let items = JSON.parse(localStorage.getItem('items'));

			items.forEach(function(item, index){
				if(updatedItem.id === item.id){
					items.splice(index, 1, updatedItem);
				}
			});

			localStorage.setItem('items', JSON.stringify(items));
		},
		deleteItemFromStorage: function(id){
			let items = JSON.parse(localStorage.getItem('items'));

			items.forEach(function(item, index){
				if(id === item.id){
					items.splice(index, 1);
				}
			});

			localStorage.setItem('items', JSON.stringify(items));
		},
		clearItemsFromStorage: function(){
			localStorage.removeItem('items');
		}
	}
})();
// Item Controlloer
const ItemCtrl = (function(){
	// Item Constructor

	const Item = function(id, name, calories){
		this.id = id;
		this.name = name;
		this.calories = calories;		
	}

	// Data Structures / State
	const data = {
		items: StorageCtrl.getItemsFromStorage(),
		currentItem: null,
		totalCalories: 0
	};
	// Public Method
	return {
		getItems: function(){
			return data.items;
		},
		addItem: function(name, calories){
			// Create ID
			let ID;
			if(data.items.length > 0){
				ID = data.items[data.items.length-1].id + 1;
			}else{
				ID = 0;
			}

			// Calories to number
			calories = parseInt(calories);

			// Create new item

			newItem = new Item(ID, name, calories);

			// Add to items array
			data.items.push(newItem);

			return newItem;



		},
		getTotalCalories: function(){
			let total = 0
			data.items.forEach(function(item){
				total += item.calories;
			});
			// Set total cal in data structure
			data.totalCalories = total;
			return data.totalCalories;
		},
		getItemById: function(id){
			let found = null;
			// Loop through items
			data.items.forEach(function(item){
				if(item.id === id){
					found = item;
				}
			});
			return found;
		},
		updateItem: function(name, calories){
			// Caloris to number
			calories = parseInt(calories);

			let found = null;
			data.items.forEach(function(item){
				if(item.id === data.currentItem.id){
					item.name = name;
					item.calories = calories;
					found = item;
				}
			});
			return found;
		},
		deleteItem: function(id){
			// Get ids
			ids = data.items.map(function(item){
				return item.id
			});

			// Get index
			const index = ids.indexOf(id);

			// Remove item
			data.items.splice(index, 1);

		},
		clearAllItems: function(){
			data.items = [];
		},
		setCurrentItem: function(item){
			data.currentItem = item;
		},
		getCurrentItem: function(){
			return data.currentItem;
		},
		logData: function(){
			return data;
		}
	}
})();

// Ui Controller

const UICtrl = (function(){
	const UISelectors = {
		itemList: "#item-list",
		listItems: "#item-list li",
		addBtn: ".add-btn",
		updateBtn: ".update-btn",
		deleteBtn: ".delete-btn",
		backBtn: ".back-btn",		
		clearBtn: '.clear-btn',
		itemNameInput: "#item-name",
		itemCaloriesInput: "#item-calories",
		totalCalories: ".total-calories"
	}
	return {
		populateItemList: function(items){
			let html = '';
			items.forEach(function(item){
				html += `<li id="item-${item.id}" class="collection-item"><strong>${item.name}: </strong><em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="edit-item fas fa-pencil-alt"></i></a></li>`;
			});
			// Insert list items
			document.querySelector(UISelectors.itemList).innerHTML = html;

		},		
		getItemInput: function(){
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value
			}
		},
		addListItem: function(item){
			// SHow the list
			document.querySelector(UISelectors.itemList).style.display = 'block';

			// Create li element
			const li = document.createElement('li');
			// Add class
			li.className = "collection-item";
			li.id = `item-${item.id}`;

			// Add Html
			li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="edit-item fas fa-pencil-alt"></i></a>`
			// insert item
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
		},
		updateListItem: function(item){
			let listItems = document.querySelectorAll(UISelectors.listItems);

			// Turn Node list to array
			listItems = Array.from(listItems);
			listItems.forEach(function(listItem){
				const itemID = listItem.getAttribute('id');
				if(itemID === `item-${item.id}`){
					document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="edit-item fas fa-pencil-alt"></i></a>`;
				} 
			});
		},
		deleteListItem: function(id){
			const itemID = `#item-${id}`;
			const item = document.querySelector(itemID);
			item.remove();
		},
		clearInput: function(){
			document.querySelector(UISelectors.itemNameInput).value = "";
			document.querySelector(UISelectors.itemCaloriesInput).value = "";
		},
		addItemToForm: function(){
			document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
			UICtrl.showEditState();
		},
		removeItems: function(){
			let listItems = document.querySelectorAll(UISelectors.listItems);
			// Turn Node list into array
			listItems = Array.from(listItems);
			listItems.forEach(function(item){
				item.remove();
			});
		},
		hideList:function(){
			document.querySelector(UISelectors.itemList).style.display = 'none';

		},
		showTotalCalories: function(total){
			document.querySelector(UISelectors.totalCalories).textContent = total;
		},
		clearEditState: function(){
			UICtrl.clearInput();
			document.querySelector(UISelectors.updateBtn).style.display = 'none';
			document.querySelector(UISelectors.deleteBtn).style.display = 'none';
			document.querySelector(UISelectors.backBtn).style.display = 'none';
			document.querySelector(UISelectors.addBtn).style.display = 'inline';

		},
		showEditState: function(){
			document.querySelector(UISelectors.updateBtn).style.display = 'inline';
			document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
			document.querySelector(UISelectors.backBtn).style.display = 'inline';
			document.querySelector(UISelectors.addBtn).style.display = 'none';

		},

		getSelectors: function(){
			return UISelectors;
		}
	}
})();



// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
	// Load event listeners
	const loadEventListeners = function(){
		// Get Ui Selector
		const UISelectors = UICtrl.getSelectors();
		
		// Add item event
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
		// Disable submit on enter
		document.addEventListener('keypress',function(e){
			if(e.keyCode === 13 || e.which === 13){
				e.preventDefault();
				return false;

			}
		});

		// Edit icon click event
		document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

		// Update item event
		document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

		// Delete button event
		document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
		// Back button event		
		document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

		// Clear items event
		document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);		
				

	}
	// Add item submit
	const itemAddSubmit = function(e){
		// Get form input from UIControler
		const input = UICtrl.getItemInput();

		// Check for name and calories input
		if(input.name !== '' && input.calories){
			// Add Item
			const newItem = ItemCtrl.addItem(input.name, input.calories);
			// Add item to Ui list
			UICtrl.addListItem(newItem);

			// Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();
			UICtrl.showTotalCalories(totalCalories);

			// Store in localStorage
			StorageCtrl.storeItems(newItem);
			// Clear Fields
			UICtrl.clearInput();
		}
		e.preventDefault();		
	}

	// Click edit item
	const itemEditClick = function(e){
		if(e.target.classList.contains('edit-item')){
			// Get list item id
			const listID = e.target.parentNode.parentNode.id;

			// Break into an array
			const listIdArray = listID.split('-');

			// Get the ID
			const id = parseInt(listIdArray[1]);

			// Get item

			const itemToEdit = ItemCtrl.getItemById(id);

			// Set currnt item
			ItemCtrl.setCurrentItem(itemToEdit);

			// Add item to form
			UICtrl.addItemToForm();
		}
		e.preventDefault();


	}

	// Update item submit
	const itemUpdateSubmit = function(e){
		// Get item input
		const input = UICtrl.getItemInput();

		// Update item
		const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

		// Update UI
		UICtrl.updateListItem(updatedItem);

		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();
		UICtrl.showTotalCalories(totalCalories);

		// Update localStorage
		StorageCtrl.updateItemStorage(updatedItem);
		UICtrl.clearEditState();
		e.preventDefault();
	}

	// Delete button event
	const itemDeleteSubmit = function(e){
		const currentItem = ItemCtrl.getCurrentItem();

		// Delete from data structure
		ItemCtrl.deleteItem(currentItem.id);

		// Delete from UI
		UICtrl.deleteListItem(currentItem.id);

		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();
		UICtrl.showTotalCalories(totalCalories);

		// Delete from local storage
		StorageCtrl.deleteItemFromStorage(currentItem.id);
		UICtrl.clearEditState();
		e.preventDefault();
	}
	const clearAllItemsClick = function(e){
		// Delete all items from data structure
		ItemCtrl.clearAllItems();

		// Remove from ui
		UICtrl.removeItems();

		// Clear from Local storage
		StorageCtrl.clearItemsFromStorage();

		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();
		UICtrl.showTotalCalories(totalCalories);

		// Clear Fields
		UICtrl.clearInput();

		// Hide Ul
		UICtrl.hideList();
		e.preventDefault();
	}

	return {
		init: function(){
			// Set init state
			UICtrl.clearEditState();
			// Fetch items from data structures
			const items = ItemCtrl.getItems();
           
            
			// Check if any items

			if(items.length === 0){
				UICtrl.hideList();
			}else{
				// Populate list with items
				UICtrl.populateItemList(items);	
			}

			// Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();
			// Show Total calories
			UICtrl.showTotalCalories(totalCalories);
			

			// Load event listeners
			loadEventListeners();
		}
	}
})(ItemCtrl, StorageCtrl, UICtrl);


// Initialize App
App.init();
