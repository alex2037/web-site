import template from './menu.component.html';

Controller.$inject = ['$rootScope'];

function Controller($rootScope) {
  let $ctrl = this;

  $ctrl.messages = {
    profile: 'Profile',
    friends: 'Friends',
    feed: 'Feed'
  };

  $ctrl.changeState = function(state) {
    $rootScope.$broadcast('state:change', {state: state});
  }
}

export const menuComponent = {
  template	: template,
  controllerAs : '$ctrl',
  controller 	 : Controller
};
