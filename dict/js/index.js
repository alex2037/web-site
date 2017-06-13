webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/3b1e5e17d5f0800def4d6d92574a68c9.jpg";

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(21);

__webpack_require__(11);

__webpack_require__(13);

__webpack_require__(23);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dashboard = __webpack_require__(12);

var _dashboard2 = _interopRequireDefault(_dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var angular = __webpack_require__(0);

exports.default = angular.module('web-service').controller('dashboardCtrl', _dashboard2.default);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
DashboardController.$inject = ['$scope'];

function DashboardController($scope) {
  var $ctrl = this;

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

exports.default = DashboardController;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _footer = __webpack_require__(15);

var _feed = __webpack_require__(14);

var _friends = __webpack_require__(16);

var _profile = __webpack_require__(20);

var _intro = __webpack_require__(17);

var _menu = __webpack_require__(18);

var _money = __webpack_require__(19);

var angular = __webpack_require__(0);

exports.default = angular.module('web-service').component('footer', _footer.footerComponent).component('menu', _menu.menuComponent).component('feed', _feed.feedComponent).component('friends', _friends.friendsComponent).component('profile', _profile.profileComponent).component('intro', _intro.introComponent).component('money', _money.moneyComponent);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.feedComponent = undefined;

var _feedComponent = __webpack_require__(33);

var _feedComponent2 = _interopRequireDefault(_feedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Controller.$inject = ['apiService'];

function Controller(api) {
  var $ctrl = this;

  $ctrl.messages = {
    like: 'Like',
    continue: 'Continue',
    sentPost: 'Sent post',
    dislike: 'Dislike'
  };

  function resetFlags() {
    $ctrl.posts = [];
    $ctrl.total = null;
    $ctrl.visibleContinue = true;
  }

  resetFlags();

  $ctrl.$onInit = function () {
    resetFlags();

    $ctrl.getPost();
  };

  $ctrl.getPost = function () {
    var params = {
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

    var params = {
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

var feedComponent = exports.feedComponent = {
  template: _feedComponent2.default,
  bindings: {
    profileId: '<'
  },
  controllerAs: '$ctrl',
  controller: Controller
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footerComponent = undefined;

var _footerComponent = __webpack_require__(34);

var _footerComponent2 = _interopRequireDefault(_footerComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Controller.$inject = ['$cookies', 'apiService', '$rootScope'];

function Controller($cookies, api, $rootScope) {
  var $ctrl = this;

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
      $rootScope.$broadcast('session:open', { profileId: res.data.profileId });
    });
  };
}

var footerComponent = exports.footerComponent = {
  template: _footerComponent2.default,
  controllerAs: '$ctrl',
  controller: Controller
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.friendsComponent = undefined;

var _friendsComponent = __webpack_require__(35);

var _friendsComponent2 = _interopRequireDefault(_friendsComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Controller.$inject = ['apiService'];

function Controller(api) {
  var $ctrl = this;

  $ctrl.searchName = '';
  $ctrl.isFriends = true;
  $ctrl.isSearch = false;

  $ctrl.messages = {
    added: 'Added to friend',
    continue: 'Continue',
    remove: 'Remove from friends'
  };

  function resetFlags() {
    $ctrl.peoples = [];
    $ctrl.total = null;
    $ctrl.visibleContinue = true;
  }
  resetFlags();

  $ctrl.$onInit = function () {
    $ctrl.isFriends = true;
    $ctrl.isSearch = false;

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
    var params = {
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

var friendsComponent = exports.friendsComponent = {
  template: _friendsComponent2.default,
  bindings: {
    profileId: '<'
  },
  controllerAs: '$ctrl',
  controller: Controller
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.introComponent = undefined;

var _introComponent = __webpack_require__(36);

var _introComponent2 = _interopRequireDefault(_introComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Controller.$inject = ['apiService'];

function Controller(api) {
  var $ctrl = this;

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
  };
}

var introComponent = exports.introComponent = {
  template: _introComponent2.default,
  controllerAs: '$ctrl',
  controller: Controller
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuComponent = undefined;

var _menuComponent = __webpack_require__(37);

var _menuComponent2 = _interopRequireDefault(_menuComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Controller.$inject = ['$rootScope'];

function Controller($rootScope) {
  var $ctrl = this;

  $ctrl.messages = {
    profile: 'Profile',
    friends: 'Friends',
    feed: 'Feed'
  };

  $ctrl.changeState = function (state) {
    $rootScope.$broadcast('state:change', { state: state });
  };
}

var menuComponent = exports.menuComponent = {
  template: _menuComponent2.default,
  controllerAs: '$ctrl',
  controller: Controller
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moneyComponent = undefined;

var _moneyComponent = __webpack_require__(38);

var _moneyComponent2 = _interopRequireDefault(_moneyComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Controller($scope, $element, $attrs) {
  var $ctrl = this;

  $ctrl.list = [{
    name: 'Superman',
    location: ''
  }, {
    name: 'Batman',
    location: 'Wayne Manor'
  }];

  $ctrl.updateHero = function (hero, prop, value) {
    hero[prop] = value;
  };

  $ctrl.deleteHero = function (hero) {
    var idx = $ctrl.list.indexOf(hero);
    if (idx >= 0) {
      $ctrl.list.splice(idx, 1);
    }
  };
}

var moneyComponent = exports.moneyComponent = {
  template: _moneyComponent2.default,
  controllerAs: '$ctrl',
  controller: Controller
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileComponent = undefined;

var _profileComponent = __webpack_require__(39);

var _profileComponent2 = _interopRequireDefault(_profileComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Controller.$inject = ['apiService'];

function Controller(api) {
  var $ctrl = this;

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
  $ctrl.profile = {};
  $ctrl.isChange = false;

  $ctrl.$onInit = function () {
    $ctrl.getInterests();
  };

  $ctrl.getInterests = function () {
    $ctrl.interests = [];
    $ctrl.profile = {};
    $ctrl.isChange = false;

    api.getInterests($ctrl.profileId).then(function (res) {
      debugger;
      $ctrl.interests = [];

      angular.forEach(res.data.items, function (item) {
        $ctrl.interests.push({
          text: item.text,
          id: item.id,
          isActive: false
        });
      });
    })['finally'](function () {
      $ctrl.getProfile();
    });
  };

  $ctrl.getProfile = function () {
    api.getProfile($ctrl.profileId).then(function (res) {
      $ctrl.profile = res.data;

      var interests = res.data.interests || [];

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
    var interests = [];

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
  };
}

var profileComponent = exports.profileComponent = {
  template: _profileComponent2.default,
  bindings: {
    profileId: '<'
  },
  controllerAs: '$ctrl',
  controller: Controller
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = angular.module('web-service', ['ngCookies', 'ngAnimate', 'ui.bootstrap']);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
apiService.$inject = ['$http'];

function apiService($http) {
  var service = this;

  service.closeSession = function (profileId) {
    return $http.get('http://ws-fpm.ru/auth/close', { params: { profileId: profileId } });
  };

  service.openSession = function (data) {
    return $http.post('http://ws-fpm.ru/auth/search', data);
  };

  service.registration = function (data) {
    return $http.post('http://ws-fpm.ru/auth/registration', data);
  };

  service.getPeoples = function (params) {
    return $http.post('http://ws-fpm.ru/peoples/search', params);
  };

  service.requestToFriend = function (profileId, userId) {
    return $http.get('http://ws-fpm.ru/peoples/added', {
      params: {
        profileId: profileId,
        userId: userId
      }
    });
  };

  service.removeFromFriends = function (profileId, userId) {
    return $http.get('http://ws-fpm.ru/peoples/remove', {
      params: {
        profileId: profileId,
        userId: userId
      }
    });
  };

  service.getPosts = function (params) {
    return $http.post('http://ws-fpm.ru/posts/search', params);
  };

  service.sentPost = function (params) {
    return $http.post('http://ws-fpm.ru/post', params);
  };

  service.requestLike = function (postId, isActive) {
    return $http.get('http://ws-fpm.ru/posts/like', { params: { postId: postId, isActive: isActive } });
  };

  service.requestDislike = function (postId, isActive) {
    return $http.get('http://ws-fpm.ru/posts/dislike', { params: { postId: postId, isActive: isActive } });
  };

  service.getProfile = function (profileId) {
    return $http.get('http://ws-fpm.ru/profile', { params: { profileId: profileId } });
  };

  service.editProfile = function (params) {
    return $http.post('http://ws-fpm.ru/profile', params);
  };

  service.getInterests = function (profileId) {
    return $http.post('http://ws-fpm.ru/interests/search', { params: { profileId: profileId } });
  };
}

exports.default = apiService;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = __webpack_require__(22);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var angular = __webpack_require__(0);

exports.default = angular.module('web-service').service('apiService', _api2.default);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/2ca694416bb1b836ad868211968e3815.png";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/cf64ee578688090ef7332fe67ec1a251.png";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/2e193f99bf939bb45b65db335080ec94.png";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/d4254027e6f4e6bad90c7c6455789154.png";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/88e16898b01d0c892d3f6ae3fd2a3fa2.png";

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/111c58670bc58c63f1e423df8ff5dbd1.png";

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/d7d10f0db6c8d8a646d4fa7d5499e7eb.png";

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/9712f17cd2c09c8f1b998d86c7521874.png";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/83a7805e755c15bfe51ba35ad70c7ed5.jpg";

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=col-sm-12> <div class=\"col-sm-12 form-group\"> <textarea class=form-control style=height:120px;max-height:120px;overflow:auto ng-model=$ctrl.post>\r\n        </textarea> <div class=\"col-sm-12 navigation\" style=\"padding:10px 0 0 0\"> <img class=\"people-card__active navigation\" style=margin:0 src=" + __webpack_require__(30) + " title={{$ctrl.messages.sentPost}} ng-click=$ctrl.sentPost()> </div> </div> <div class=\"col-sm-12 dashboard-friends\"> <div class=card style=margin-top:40px ng-repeat=\"post in $ctrl.posts\"> <div class=card-block> <p class=card-text ng-bind=post.text></p> </div> <div class=\"row navigation\"> <img ng-if=post.isLike class=people-card__active src=" + __webpack_require__(27) + " title={{$ctrl.messages.like}} ng-click=$ctrl.sendLike(post)> <img ng-if=!post.isLike class=people-card__active src=" + __webpack_require__(28) + " title={{$ctrl.messages.like}} ng-click=$ctrl.sendLike(post)> <img ng-if=post.isDislike class=people-card__active src=" + __webpack_require__(25) + " title={{$ctrl.messages.dislike}} ng-click=$ctrl.sentDislike(post)> <img ng-if=!post.isDislike class=people-card__active src=" + __webpack_require__(26) + " title={{$ctrl.messages.dislike}} ng-click=$ctrl.sentDislike(post)> </div> </div> </div> <div class=col-sm-12 ng-if=$ctrl.visibleContinue style=margin-top:40px> <div class=row> <div class=col-sm-2></div> <div class=\"list-group-item col-sm-8 registration-button d-flex justify-content-center\" ng-click=$ctrl.getPost()> <label ng-bind=::$ctrl.messages.continue></label> </div> </div> </div> </div>";

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-sm-12 row back-side\" style=height:55px> <div class=\"col-sm-12 row\"></div> <div class=\"col-sm-12 row\"></div> <div class=\"col-sm-12 row navigation\"> <div style=margin-right:0> <div class=\"list-group-item footer-button\" ng-if=$ctrl.isLog ng-click=$ctrl.logOut()> <label ng-bind=$ctrl.message.logOut></label> </div> <div class=\"list-group-item footer-button\" ng-if=!$ctrl.isLog ng-click=\"$ctrl.isAuth = true;\"> <label ng-bind=$ctrl.message.logIn></label> </div> </div> </div> <div class=\"col-sm-12 row navigation\"> <div class=auth ng-if=$ctrl.isAuth> <div class=\"col-sm-12 row navigation\" style=padding:0> <div class=\"form-group row\"> <label class=\"col-1 col-form-label\" ng-bind=$ctrl.message.login></label> <div class=col-11> <input class=form-control type=text ng-model=$ctrl.user.login> </div> </div> </div> <div class=\"col-sm-12 row navigation\" style=padding:0> <div class=\"form-group row\"> <label class=\"col-1 col-form-label\" ng-bind=$ctrl.message.password></label> <div class=col-11> <input class=form-control type=password ng-model=$ctrl.user.password> </div> </div> </div> <div class=\"col-sm-12 row\"> <div class=\"list-group-item auth-button\" style=margin-right:20px ng-click=$ctrl.logIn()> <label>Open</label> </div> <div class=\"list-group-item auth-button\" ng-click=\"$ctrl.isAuth = false;\"> <label>Close</label> </div> </div> </div> </div> </div>";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"col-sm-12 dashboard-friends\"> <div class=\"col-sm-12 row\"> <input class=\"col-sm-11 form-control\" type=text ng-model=$ctrl.searchName> <img class=search-people src=" + __webpack_require__(29) + " ng-click=$ctrl.search()> </div> <div class=card style=margin-top:40px ng-repeat=\"people in $ctrl.peoples\"> <div class=row> <div class=people-card__foto> <svg width=100% height=100%> <polygon points=\"112,85 100,128 59,98\" style=fill:#fadfaa /> <polygon points=\"112,85 100,128 132,111\" style=fill:#eaba8c /> <polygon points=\"59,98 100,128 60,140\" style=fill:#fad398 /> <polygon points=\"59,98 60,140 29,142\" style=fill:#dfa387 /> <polygon points=\"59,98 29,142 6,133\" style=fill:#f9d8ad /> <polygon points=\"112,85 132,111 163,101\" style=fill:#dbb08e /> <polygon points=\"132,111 100,128 122,132\" style=fill:#ce8670 /> </svg> </div> <div class=card-block> <label ng-bind=\"people.name + ' ' + people.suname\"></label> <div class=navigation style=padding-top:120px> <img class=people-card__active src=" + __webpack_require__(24) + " ng-if=!people.isFriend title={{$ctrl.messages.added}} ng-click=$ctrl.sendRequest(people.id)> <img class=people-card__active src=" + __webpack_require__(31) + " ng-if=people.isFriend title={{$ctrl.messages.remove}} ng-click=$ctrl.sentRefusal(people.id)> </div> </div> </div> </div> <div class=col-sm-12 ng-if=$ctrl.visibleContinue style=margin-top:40px> <div class=row> <div class=col-sm-2></div> <div class=\"list-group-item col-sm-8 registration-button d-flex justify-content-center\" ng-click=$ctrl.getPeoples()> <label ng-bind=::$ctrl.messages.continue></label> </div> </div> </div> </div>";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=col-sm-12> <div class=row style=height:70px></div> <div class=row> <div class=col-sm-2></div> <div class=col-sm-9 style=background-color:#f7f7f9> <div class=row style=height:270px> <img class=col-sm-12 src=" + __webpack_require__(32) + "> </div> <div class=\"form-group row\"> <div class=col-1></div> <div class=col-10> <label class=\"col-4 col-form-label\" ng-bind=$ctrl.messages.login></label> <div class=col-12> <input class=form-control type=text ng-model=$ctrl.user.login> </div> </div> <div class=col-1></div> </div> <div class=\"form-group row\"> <div class=col-1></div> <div class=col-10> <label class=\"col-4 col-form-label\" ng-bind=$ctrl.messages.password></label> <div class=col-12> <input class=form-control type=password ng-model=$ctrl.user.password> </div> </div> <div class=col-1></div> </div> <div class=\"form-group row\"> <div class=col-1></div> <div class=col-10> <label class=\"col-4 col-form-label\" ng-bind=$ctrl.messages.email></label> <div class=col-12> <input class=form-control type=text ng-model=$ctrl.user.email> </div> </div> <div class=col-1></div> </div> <div class=row> <div class=col-sm-2></div> <div class=\"list-group-item col-sm-8 registration-button d-flex justify-content-center\" ng-click=$ctrl.registration()> <label>Registration</label> </div> </div> <div class=row style=height:20px></div> </div> </div> </div>";

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "<div> <div class=back-side style=width:100%;height:200px;margin-bottom:40px> <svg width=100% height=100%> <polygon points=\"112,85 100,128 59,98\" style=fill:#fadfaa /> <polygon points=\"112,85 100,128 132,111\" style=fill:#eaba8c /> <polygon points=\"59,98 100,128 60,140\" style=fill:#fad398 /> <polygon points=\"59,98 60,140 29,142\" style=fill:#dfa387 /> <polygon points=\"59,98 29,142 6,133\" style=fill:#f9d8ad /> <polygon points=\"112,85 132,111 163,101\" style=fill:#dbb08e /> <polygon points=\"132,111 100,128 122,132\" style=fill:#ce8670 /> </svg> </div> <ul class=list-group> <li class=\"list-group-item list-menu-btn\" ng-click=\"$ctrl.changeState('profile')\"><label ng-bind=::$ctrl.messages.profile></label></li> <li class=\"list-group-item list-menu-btn\" ng-click=\"$ctrl.changeState('friends')\"><label ng-bind=::$ctrl.messages.friends></label></li> <li class=\"list-group-item list-menu-btn\" ng-click=\"$ctrl.changeState('feed')\"><label ng-bind=::$ctrl.messages.feed></label></li> </ul> </div>";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=col-sm-12> <div class=row style=padding-top:50px> <div class=col-sm-12> <div class=card style=border-color:transparent> <div class=card-block> <img class=col-sm-12 src=" + __webpack_require__(1) + "> </div> </div> </div> </div> <div class=row style=padding-top:50px> <div class=col-sm-12> <div class=card style=border-color:transparent> <div class=card-block> <img class=col-sm-12 src=" + __webpack_require__(1) + "> </div> </div> </div> </div> <div class=row style=padding-top:50px> <div class=col-sm-12> <div class=card style=border-color:transparent> <div class=card-block> <img class=col-sm-12 src=" + __webpack_require__(1) + "> </div> </div> </div> </div> </div>";

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = "<div class=col-sm-12 style=overflow:auto> <div class=\"form-group row\"> <div class=col-1></div> <div class=col-10> <label class=\"col-4 col-form-label\" ng-bind=$ctrl.messages.name></label> <div class=col-12> <input class=form-control type=text ng-model=$ctrl.profile.name ng-change=\"$ctrl.isChange = true\"> </div> </div> <div class=col-1></div> </div> <div class=\"form-group row\"> <div class=col-1></div> <div class=col-10> <label class=\"col-4 col-form-label\" ng-bind=$ctrl.messages.suname></label> <div class=col-12> <input class=form-control type=password ng-model=$ctrl.profile.suname ng-change=\"$ctrl.isChange = true\"> </div> </div> <div class=col-1></div> </div> <div class=\"form-group row\"> <div class=col-1></div> <div class=col-10> <label class=\"col-4 col-form-label\" ng-bind=$ctrl.messages.login></label> <div class=col-12> <input class=form-control type=text ng-model=$ctrl.profile.login ng-change=\"$ctrl.isChange = true\"> </div> </div> <div class=col-1></div> </div> <div class=\"form-group row\"> <div class=col-1></div> <div class=col-10> <label class=\"col-4 col-form-label\" ng-bind=$ctrl.messages.password></label> <div class=col-12> <input class=form-control type=password ng-model=$ctrl.profile.password ng-change=\"$ctrl.isChange = true\"> </div> </div> <div class=col-1></div> </div> <div class=\"form-group row\"> <div class=col-1></div> <div class=col-10> <label class=\"col-4 col-form-label\" ng-bind=$ctrl.messages.email></label> <div class=col-12> <input class=form-control type=text ng-model=$ctrl.profile.email ng-change=\"$ctrl.isChange = true\"> </div> </div> <div class=col-1></div> </div> <div class=\"form-group row\"> <div class=col-1></div> <div class=col-10> <label class=\"col-4 col-form-label\" ng-bind=$ctrl.messages.interests></label> <ul class=\"col-12 list-group\" style=padding-left:20px;max-height:225px;overflow:auto> <li class=list-group-item ng-class=\"{'list-group-item-success': interest.isActive}\" ng-repeat=\"interest in $ctrl.interests\"> <label class=\"custom-control custom-checkbox\"> <input type=checkbox class=custom-control-input ng-model=interest.isActive ng-change=\"$ctrl.isChange = true\"> <span class=custom-control-indicator></span> <span class=custom-control-description ng-bind=interest.text></span> </label> </li> </ul> </div> <div class=col-1></div> </div> <div class=row ng-if=$ctrl.isChange> <div class=col-sm-2></div> <div class=\"list-group-item col-sm-8 registration-button d-flex justify-content-center\" ng-click=$ctrl.editProfile()> <label ng-bind=$ctrl.messages.change></label> </div> </div> <div class=row style=height:20px></div> </div>";

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = __webpack_require__(6);


/***/ })
],[40]);