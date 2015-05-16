var app = angular.module("newsApp", [])
app.controller("MainCtrl", function($scope) {
  $scope.posts = [
    {title: 'post1', upvotes: 5},
    {title: 'post2', upvotes: 2},
    {title: 'post3', upvotes: 16},
    {title: 'post4', upvotes: 9},
    {title: 'post5', upvotes: 4},
  ]

  // Add an object into the posts array
  $scope.addPost = function() {
    if(!$scope.title || $scope.title=="") { return; }
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0
    })
    $scope.title = ""
    $scope.link = ""
  }

  // Add upvoting functionality
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1
  }
})
