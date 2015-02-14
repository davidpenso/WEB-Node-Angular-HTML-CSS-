//This is basically setting up our top level app.
var todoApp = angular.module('todoApp', []);

todoApp.run(function($rootScope) {
	Parse.initialize("NadlNjUewSAr5NATyWvTclajLbG1NOlv9ZRGvjYc", "Zr9CbbrMeYZ6SdgYZggETuxCOlcRdOHLO5Yfx9LX");
});

//moves this to directives.js
todoApp.directive('avatar', function($http) {
	return {
		restrict: 'A', //E: element, C: class name, M: comments
		template: '<div class="thumbnail" style="width: 48px;height:48px;margin-bottom: 30px;">' + 
			'<div><img ng-src="{{data.owner.avatar_url}}"/></div>' + 
			'<div class="caption"><p>{{data.name}}</p></div></div>', //use templateUrl
		//scope: true, //prototypically inherits
		link: function(scope, element, attrs) {
	      /*$http.get('https://github.com/Syerram/angularjs-intro').success(function(data) {
	        scope.data = data;
	      });*/
		  scope.data = {owner: {avatar_url: '../static/img/avatar.jpg'}, name: 'Sai'};
	  }
    }
});

todoApp.factory('Data', function() {
	var Todo = Parse.Object.extend("Todo");
	var query = new Parse.Query(Todo);

	return {
		fetch_incomplete: function(cb) {
			//query.equalTo("completed", false);
			query.find({
				success: function(results) {
					cb(results);
				},
				error: function(error) {
					alert(error);
				}
			});
		}, 
		save: function(todo_raw, cb) {
			var todo = new Todo();
			todo.set("title", todo_raw.title);
			todo.set("completed", false);
			todo.save(null, {
				success: function(saved_todo) {
					cb(saved_todo);
				},
				error: function(todo, error) {
					alert(error);
				}
			});
		}
	}
});

todoApp.controller('TodoCtrl', function($scope, Data) {
	$scope.todos = {
		new_todo: {
			title: '',
			save: function() {
				Data.save({title: $scope.todos.new_todo.title}, function(saved_todo) {
					$scope.$apply(function() {
						$scope.todos.list.push(saved_todo);
						$scope.todos.new_todo.title = '';	
					});
				});
			}
		},
		list: [],
	};

	$scope.init = function() {
		Data.fetch_incomplete(function(results) {
			$scope.$apply(function() {
				$scope.todos.list = results;
				console.log($scope.todos.list);
			});
		})
	}
});