'use strict';

import api from './api.service';

let angular = require('angular');

export default angular.module('web-service').service('apiService', api);