var app = angular.module("newsApp", ['ui.router'])

app.controller("MainCtrl", ['$scope', 'posts', function($scope, posts) {
  $scope.posts = posts.posts

  // Add an object into the posts array
  $scope.addPost = function() {
    if(!$scope.title || $scope.title=="") { return; }
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [
        {author: 'Joe', body: 'Cool post!', upvotes: 0},
        {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
      ]
    })
    $scope.title = ""
    $scope.link = ""
  }

  // Add upvoting functionality
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1
  }
}])

// Add service to store the posts
app.factory("posts", [function(){
  var obj = {
    posts: []
  }
  return obj
}])

app.controller("PostCtrl", ['$scope', '$stateParams', 'posts'], function($scope, $stateParams, posts) {
  $scope.post = posts.post[$stateParams.id]

  $scope.addComment = function() {
    if($scope.body === '') { return; }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    })
    $scope.body = ''
  }
})

// Setup states with ui-router
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostCtrl'
      })
    $urlRouterProvider.otherwise('home')
  }
])
