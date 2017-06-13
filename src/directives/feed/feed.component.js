import template from './feed.component.html';

Controller.$inject = ['apiService'];

function Controller(api) {
  let $ctrl = this;

  $ctrl.messages = {
    like: 'Like',
    continue: 'Continue',
    sentPost: 'Sent post',
    dislike: 'Dislike'
  };

  function resetFlags() {
    $ctrl.posts           = [];
    $ctrl.total           = null;
    $ctrl.visibleContinue = true;
  }

  resetFlags();

  $ctrl.$onInit = function () {
    resetFlags();

    $ctrl.getPost();
  };

  $ctrl.getPost = function () {
    let params = {
      profileId: $ctrl.profileId,
      offset: $ctrl.posts.length,
      limit: 20
    };

    api.getPosts(params).then(function (res) {
      $ctrl.total = $ctrl.total || res.data.total;

      $ctrl.posts = $ctrl.posts.concat(res.data.items);

      if ($ctrl.total <= $ctrl.posts.length) {
        $ctrl.visibleContinue = false;
      }
    });
  };

  $ctrl.sentPost = function () {
    if (!$ctrl.post) {
      return;
    }

    let params = {
      profileId: $ctrl.profileId,
      text: $ctrl.post
    };

    $ctrl.post = null;

    api.sentPost(params).then($ctrl.$onInit);
  };

  $ctrl.sendLike = function (post) {
    post.isDislike = post.isDislike && post.isLike;
    post.isLike = !post.isLike;

    api.requestLike(post.id, post.isLike).then(function (res) {
      post = res.data;
    });
  };

  $ctrl.sentDislike = function (post) {
    post.isLike = post.isLike && post.isDislike;
    post.isDislike = !post.isDislike;

    api.requestDislike(post.id, post.isDislike).then(function (res) {
      post = res.data;
    });
  };
}

export const feedComponent = {
  template: template,
  bindings: {
    profileId: '<'
  },
  controllerAs: '$ctrl',
  controller: Controller
};
