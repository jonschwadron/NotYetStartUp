angular.module('Notyetstartup.Common')
  .service('ProjectsModel',
    function($http, EndpointConfigService, UtilsService) {
      var service = this,
        MODEL = '/projects/';

      service.all = function() {
        return $http.get(EndpointConfigService.getUrl(
            MODEL + EndpointConfigService.getCurrentFormat()))
          .then(
            function(result) {
              return UtilsService.objectToArray(result);
            }
          );
      };

      service.fetch = function(project_id) {
        return $http.get(
          EndpointConfigService.getUrlForId(MODEL, project_id)
        );
      };

      service.create = function(project) {
        return $http.post(
          EndpointConfigService.getUrl(MODEL + EndpointConfigService.getCurrentFormat()),
          project
        );
      };

      service.update = function(project_id, project) {
        return $http.put(
          EndpointConfigService.getUrlForId(MODEL, project_id), project
        );
      };

      service.destroy = function(project_id) {
        return $http.delete(
          EndpointConfigService.getUrlForId(MODEL, project_id)
        );
      };
    });
