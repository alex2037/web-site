import template from './footer.component.html';

Controller.$inject = ['$cookies', 'apiService', '$rootScope'];

function Controller($cookies, api, $rootScope) {
  let $ctrl = this;

  $ctrl.isLog = false;

  $ctrl.message = {
    logIn: 'Log in',
    logOut: 'Log out',
    login: 'Login',
    password: 'Password'
  };

  $ctrl.user = {};

  $ctrl.logOut = function () {
    api.closeSession().then(function () {
      $ctrl.isLog = false;

      $cookies.remove('token');
      $rootScope.$broadcast('session:close');
    });
  };

  $ctrl.logIn = function () {
    if (!$ctrl.user.login || !$ctrl.user.password) {
      return;
    }

    api.openSession({
      login: $ctrl.user.login,
      password: $ctrl.user.password
    }).then(function (res) {
      $ctrl.isLog = true;
      $ctrl.isAuth = false;

      $cookies.put('token', res.data.token);
      $rootScope.$broadcast('session:open', {profileId: res.data.profileId});
    });
  };
}

export const footerComponent = {
  template: template,
  controllerAs: '$ctrl',
  controller: Controller
};
