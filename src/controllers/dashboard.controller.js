'use strict';

DashboardController.$inject = ['$scope'];

function DashboardController($scope) {
  let $ctrl    = this;

  $ctrl.state = 'feed';
  $ctrl.isAuth = false;
  $ctrl.profileId = null;

  $scope.$on('session:open', function (data, profile) {
    $ctrl.isAuth = true;
    $ctrl.profileId = profile.profileId;
  });

  $scope.$on('session:close', function () {
    $ctrl.isAuth = false;
    $ctrl.profileId = null;
  });

  $scope.$on('state:change', function (data, state) {
    $ctrl.state = state.state;
  });
}

export default DashboardController;