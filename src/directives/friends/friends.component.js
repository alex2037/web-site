import template from './friends.component.html';

Controller.$inject = ['apiService'];

function Controller(api) {
  let $ctrl = this;

  $ctrl.searchName = '';
  $ctrl.isFriends  = true;
  $ctrl.isSearch   = false;

  $ctrl.messages = {
    added: 'Added to friend',
    continue: 'Continue',
    remove: 'Remove from friends'
  };

  function resetFlags() {
    $ctrl.peoples  = [];
    $ctrl.total    = null;
    $ctrl.visibleContinue = true;
  }
  resetFlags();

  $ctrl.$onInit = function () {
    $ctrl.isFriends = true;
    $ctrl.isSearch  = false;

    resetFlags();

    $ctrl.getPeoples();
  };

  $ctrl.search = function () {
    $ctrl.isSearch = true;
    $ctrl.isFriends = false;

    resetFlags();

    $ctrl.getPeoples();
  };

  $ctrl.getPeoples = function () {
    let params = {
      profileId: $ctrl.profileId,
      offset: $ctrl.peoples.length,
      limit: 20
    };

    if ($ctrl.isSearch) {
      params.name = '%' + $ctrl.searchName + '%';
    }

    if ($ctrl.isFriends) {
      params.isFriends = true;
    }

    api.getPeoples(params).then(function (res) {
      $ctrl.total = $ctrl.total || res.data.total;

      $ctrl.peoples = $ctrl.peoples.concat(res.data.items);

      if ($ctrl.total <= $ctrl.peoples.length) {
        $ctrl.visibleContinue = false;
      }
    });
  };

  $ctrl.sendRequest = function (id) {
    api.requestToFriend($ctrl.profileId, id).then(function (data) {
      //todo
    });
  };

  $ctrl.sentRefusal = function (id) {
    api.removeFromFriends($ctrl.profileId, id).then(function (data) {
      //todo
    });
  };
}

export const friendsComponent = {
  template: template,
  bindings: {
    profileId: '<'
  },
  controllerAs: '$ctrl',
  controller: Controller
};
