import template from './intro.component.html';

Controller.$inject = ['apiService'];

function Controller(api) {
  let $ctrl = this;

  $ctrl.messages = {
    email: 'Email',
    login: 'Login',
    password: 'Password'
  };

  $ctrl.user = {};

  $ctrl.registration = function () {
    if (!$ctrl.user.login || !$ctrl.user.password || !$ctrl.user.email) {
      return;
    }

    api.registration({
      login: $ctrl.user.login,
      password: $ctrl.user.password,
      email: $ctrl.user.email
    }).then(function () {
      //todo
    });
  }
}

export const introComponent = {
  template: template,
  controllerAs: '$ctrl',
  controller: Controller
};
