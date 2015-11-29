angular.module('Notyetstartup.User')
  .controller('UserCtrl',
    function($routeParams, user, projects) {
      var myUser = this;

      myUser.userId = $routeParams['userId'];
      myUser.user = user.data;


      myUser.getAssignedProjects = function(userId, projects) {
        var assignedProjects = {};

        Object.keys(projects, function(key, value) {
          if (value.assignee == userId) assignedProjects[key] = projects[
            key];
        });

        return assignedProjects;
      };

      myUser.projects = myUser.getAssignedProjects(myUser.userId, projects);
    });
