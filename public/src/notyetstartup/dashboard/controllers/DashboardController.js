angular.module('Notyetstartup.Dashboard')
  .controller('DashboardCtrl',
    function(ProjectsModel, STORY_STATUSES, STORY_TYPES) {
      var dashboard = this;
      dashboard.types = STORY_TYPES;
      dashboard.statuses = STORY_STATUSES;
      dashboard.stories = [];

      ProjectsModel.all()
        .then(function(projects) {
          var arr = [];
          for (var key in projects) {
            arr.push(projects[key]);
          }
          dashboard.projects = arr;
        });
    });
