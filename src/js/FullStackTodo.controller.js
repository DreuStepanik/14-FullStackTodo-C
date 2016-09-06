(function() {
    'use strict';

    angular
        .module('todoListApp')
        .controller('todoListCtrl', todoListCtrl);

    todoListCtrl.$inject = ['todoListFactory', '$filter'];
    // The above filter will be used for angular-toArrayFilter

    /* @ngInject */
    function todoListCtrl(todoListFactory, $filter) {
        var vm = this;
        var todos = {};
        var edit = {};

        activate();

        ////////////////

        function activate() {
        // Now, add the user input to the table.
        	vm.addNew = function() {
        		todoListFactory.todoPost(vm.newTodo).then(
        			function() {
        				vm.newTodo.task = null;
        				// Clears the users input after being submitted.
        				vm.newTodo.priority = 0;
        				// Now, refer to the GET function, to ensure that the list is on track with the database index.
        				todoListFactory.todoGet().then(
        					function(data) {
        						vm.todos = data;
        					},
        					function(error) {
        						alert('There was an error generating the ToDo List');
        					}
        				)
        			});
        	};
        	// Inititate the Todo List from the Database server.
        	todoListFactory.todoGet().then (
        		function(data) {
        			vm.todos = data;
        		},
        		function(error) {
        			alert('There was an error getting the ToDo List');
        	});
      		 	// Now, remove the user input from the todo List.
        		vm.removeRow = function(todo) {
        			todoListFactory.todoDelete(todo).then(
        				function() {
        					// Now, refer to the GET function, to ensure that the list is on track with the database index.
        					todoListFactory.todoGet().then(
							function(data) {
								vm.todos = data;
							},  
							function(error) {
								alert('There was am error deleting the ToDo List');
							}
						)	
						});

        		};
        		// Now, update the user input from the todo List.
        		vm.editRow = function(id, todo) {
        			edit = angular.toJson(todo);
        			// The above, removed the $$hashkey Syntax.
        			todoListFactory.todoEdit(id, edit).then(
        				function() {
        					// Now, refer to the GET function, to ensure that the list is on track with the database index.
        					todoListFactory.todoGet().then(
        					function(data) {
        						vm.todos = data;
        					},
        					function(error) {
        						alert('There was an error updating the ToDo within the list');
        					}
        				)	
        				});
        		};

        }
    }
})();