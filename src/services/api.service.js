'use strict';

apiService.$inject = ['$http'];

function apiService($http) {
  let service = this;

  service.closeSession = function (profileId) {
    return $http.get('http://ws-fpm.ru/auth/close', {params: {profileId: profileId}});
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
    return $http.get('http://ws-fpm.ru/posts/like', {params: {postId: postId, isActive: isActive}});
  };

  service.requestDislike = function (postId, isActive) {
    return $http.get('http://ws-fpm.ru/posts/dislike', {params: {postId: postId, isActive: isActive}});
  };

  service.getProfile = function (profileId) {
    return $http.get('http://ws-fpm.ru/profile', {params: {profileId: profileId}});
  };

  service.editProfile = function (params) {
    return $http.post('http://ws-fpm.ru/profile', params);
  };

  service.getInterests = function (profileId) {
    return $http.post('http://ws-fpm.ru/interests/search', {params: {profileId: profileId}});
  };
}

export default apiService;