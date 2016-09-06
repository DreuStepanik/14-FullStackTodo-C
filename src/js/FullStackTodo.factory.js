(function() {
    'use strict';

    angular
        .module('todoListApp')
        .factory('todoListFactory', todoListFactory);

    todoListFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function todoListFactory($http, $q) {
        var service = {
           todoGet: todoGet,
           todoPost: todoPost,
           // todoEdit: todoEdit,
           // todoDelete: todoDelete,
            
        };
        return service;

        ////////////////
		// declare a function for the GET method.
        function todoGet() {
        	// Inititate the promise to be returned.
        	var defer = $q.defer();
        	// Use $http.get to put the generated API key to use. 
         	$http.get('http://localhost:60401/api/VSTDAs').then(
	         	function(response) {
	         		// If the promise succeeds, return the data using the following code.
					if(typeof response.data === 'object') {
						defer.resolve(response.data);
					// If the promise fails, reject the data using the following.
					} else {
						defer.reject(response.data);
					}
	         	},
	         	function(error) {
	         		defer.reject(error);
	         	}
	        );
         	return defer.promise;
        }
        // declare a function for the POST method.
        function todoPost(todo) {
        	// Inititate the promise to be returned.
        	var defer = $q.defer();
        	// Use $http.post to put the generated API key to use. 
        	$http.post('http://localhost:60401/api/VSTDAs', todo).then(
        		// If the promise succeeds, return the data using the following code.
        		function(response) {
        			defer.resolve(response.datat);
        		},
        		// If the promise fails, reject the data using the following.
        		function(error) {
        			defer.reject(error);
        		}
        	);
        	return defer.promise; 
        }
        // declare a function for the Edit method.
        function todoEdit(id, todo) {
        	// Inititate the promise to be returned.
        	var defer = $q.defer();
        	// Use $http.put to put the generated API key to use, for the edit function.
        	$http.put('http://localhost:60401/api/VSTDAs' + '/' + id, todo).then(
        		// If the promise succeeds, return the data using the following code.
        		function(response) {
        			defer.resolve(response.data);
        		},
        		// If the promise fails, reject the data using the following.
        		function(error) {
        			defer.reject(error);
        		}
        	);
        	return defer.promise;
        }
        // declare a function for the Delete method.
        function todoDelete(id) {
        	// Inititate the promise to be returned.
        	var defer = $q.defer();
        	// Use $http.delete to put the generated API key to use, for the delete function.
        	$http.delete('http://localhost:60401/api/VSTDAs' + '/' + id). then(
        		// If the promise succeeds, return the data using the following code.
        		function(response) {
        			defer.resolve(response.data);
        		},
        		// If the promise fails, reject the data using the following.
        		function(error) {
        			defer.reject(error);
        		}
        	);
        	return defer.promise;	
        }
    }
})();