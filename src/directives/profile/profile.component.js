import template from './profile.component.html';

Controller.$inject = ['apiService'];

function Controller(api) {
  let $ctrl = this;

  $ctrl.messages = {
    email: 'Email',
    suname: 'Suname',
    name: 'Name',
    login: 'Login',
    interests: 'Interests',
    change: 'Change',
    password: 'Password'
  };

  $ctrl.interests = [];
  $ctrl.profile   = {};
  $ctrl.isChange  = false;

  $ctrl.$onInit = function () {
    $ctrl.getInterests()
  };

  $ctrl.getInterests = function () {
    $ctrl.interests = [];
    $ctrl.profile   = {};
    $ctrl.isChange  = false;

    api.getInterests($ctrl.profileId).then(function (res) {
      debugger;
      $ctrl.interests = [];

      angular.forEach(res.data.items, function (item) {
        $ctrl.interests.push({
          text: item.text,
          id: item.id,
          isActive: false
        })
      });
    })['finally'](function () {
      $ctrl.getProfile();
    });
  };

  $ctrl.getProfile = function () {
    api.getProfile($ctrl.profileId).then(function (res) {
      $ctrl.profile = res.data;

      let interests = res.data.interests || [];

      angular.forEach(interests, function (item) {
        angular.forEach($ctrl.interests, function (item2) {
          if (item2.id === item.id) {
            item2.isActive = true;
          }
        });
      });
    });
  };

  $ctrl.editProfile = function () {
    let interests = [];

    angular.forEach($ctrl.interests, function (item) {
      if (item.isActive) {
        interests.push({
          id: item.id,
          text: item.text
        });
      }
    });

    $ctrl.profile.interests = interests;

    api.editProfile({
      profileId: $ctrl.profileId,
      profile: $ctrl.profile
    }).then($ctrl.getInterests);
  }
}

export const profileComponent = {
  template: template,
  bindings: {
    profileId: '<'
  },
  controllerAs: '$ctrl',
  controller: Controller
};
