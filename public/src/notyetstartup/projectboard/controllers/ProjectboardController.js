angular.module('Notyetstartup.Projectboard')
  .controller('ProjectboardCtrl',
    function($scope, $log, ProjectsModel, UsersModel,
      ROLE_TYPES) {
      var projectboard = this;

      projectboard.detailsVisible = true;
      projectboard.currentProjectId = null;
      projectboard.currentProject = null;
      projectboard.editedProject = {};
      projectboard.projects = [];

      projectboard.roleTypes = ROLE_TYPES;

      projectboard.users = {};

      UsersModel.all()
        .then(function(result) {
          projectboard.users = (result !== null && result.length > 0) ?
            result : [{
              name: 'Please create a user'
            }];
          $log.debug('RESULT', result);
        }, function(reason) {
          $log.debug('REASON', reason);
        });

      projectboard.findUserById = function(id) {
        for (var i = 0, len = projectboard.users.length; i < len; i++) {
          if (projectboard.users[0].id === id) {
            return projectboard.users[0];
          }
        }
      };

      projectboard.getNameFromId = function(id) {
        return projectboard.findUserById(id).name;
      };

      projectboard.getEmailFromId = function(id) {
        return projectboard.findUserById(id).email;
      };

      projectboard.setCurrentProject = function(project) {
        $log.debug(project);
        projectboard.currentProjectId = project.id;
        projectboard.currentProject = project;
        projectboard.editedProject = angular.copy(projectboard.currentProject);
      };

      projectboard.getProjects = function() {
        ProjectsModel.all()
          .then(function(result) {
            projectboard.projects = (result !== 'null') ? result : {};
            $log.debug('RESULT', result);
          }, function(reason) {
            $log.debug('REASON', reason);
          });
      };

      projectboard.createProject = function() {
        projectboard.editedProject.contact = projectboard.getEmailFromId(
          projectboard.editedProject.requestor);
        projectboard.editedProject.requestorName = projectboard.getNameFromId(
          projectboard.editedProject.requestor);
        ProjectsModel.create(projectboard.editedProject)
          .then(function(result) {
            projectboard.getProjects();
            projectboard.resetForm();
            $log.debug('RESULT', result);
          }, function(reason) {
            $log.debug('ERROR', reason);
          });
      };

      projectboard.updateProject = function() {
        var fields = ['requestor', 'requestorRole', 'roleNeeded',
          'description', 'assignee'
        ];

        fields.forEach(function(field) {
          projectboard.currentProject[field] = projectboard.editedProject[
            field]
        });

        projectboard.editedProject.contact = projectboard.getEmailFromId(
          projectboard.editedProject.requestor);
        projectboard.editedProject.requestorName = projectboard.getNameFromId(
          projectboard.editedProject.requestor);

        ProjectsModel.update(projectboard.currentProjectId, projectboard.editedProject)
          .then(function(result) {
            projectboard.getProjects();
            projectboard.resetForm();
            $log.debug('RESULT', result);
          }, function(reason) {
            $log.debug('REASON', reason);
          });
      };

      projectboard.updateCancel = function() {
        projectboard.resetForm();
      };

      projectboard.showMessages = function(field) {
        return projectboard.detailsForm[field].$touched && projectboard.detailsForm[
          field].$invalid;
      };

      projectboard.resetForm = function() {
        projectboard.currentProject = null;
        projectboard.editedProject = {};

        projectboard.detailsForm.$setPristine();
        projectboard.detailsForm.$setUntouched();
      };

      projectboard.setDetailsVisible = function(visible) {
        projectboard.detailsVisible = visible;
      };

      projectboard.isEmptyRoleType = function(roleType) {
        var empty = true;
        if (projectboard.projects) {
          projectboard.projects.forEach(function(project) {
            if (project.roleType === roleType) empty = false;
          });
        }

        return empty;
      };

      projectboard.insertAdjacent = function(target, project, insertBefore) {
        if (target === project) return;

        var fromIdx = projectboard.projects.indexOf(project);
        var toIdx = projectboard.projects.indexOf(target);

        if (!insertBefore) toIdx++;

        if (fromIdx >= 0 && toIdx >= 0) {
          projectboard.projects.splice(fromIdx, 1);

          if (toIdx >= fromIdx) toIdx--;

          projectboard.projects.splice(toIdx, 0, project);

          project.roleType = target.roleType;
        }
      };

      projectboard.finalizeDrop = function(project) {
        ProjectsModel.update(project.id, project)
          .then(function(result) {
            $log.debug('RESULT', result);
          }, function(reason) {
            $log.debug('REASON', reason);
          });
      };

      projectboard.changeRoleType = function(project, roleType) {
        project.roleType = roleType.name;
      };

      $scope.$on('projectDeleted', function() {
        projectboard.getProjects();
        projectboard.resetForm();
      });

      projectboard.getProjects();
    });
