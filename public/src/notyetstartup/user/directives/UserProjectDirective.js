angular.module('Notyetstartup.User')
  .directive('userproject',
    function($rootScope, ProjectsModel, $log) {
      var linker = function(scope, element, attrs) {
        // element
        //     .mouseover(function () {
        //         element.css({ 'opacity': 0.9 });
        //     })
        //     .mouseout(function () {
        //         element.css({ 'opacity': 1.0 })
        //     });
      };

      var controller = function() {
        var userProject = this;
        userProject.deleteProject = function(id) {
          ProjectsModel.destroy(id)
            .then(function(result) {
              $rootScope.$broadcast('projectDeleted');
              $log.debug('RESULT', result);
            }, function(reason) {
              $log.debug('ERROR', reason);
            });
        };
      };

      return {
        restrict: 'A',
        controller: controller,
        controllerAs: 'userProject',
        link: linker
      };
    });
