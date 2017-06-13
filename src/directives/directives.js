'use strict';

import {footerComponent} from './footer/footer.component';
import {feedComponent} from './feed/feed.component';
import {friendsComponent} from './friends/friends.component';
import {profileComponent} from './profile/profile.component';
import {introComponent} from './intro/intro.component';
import {menuComponent} from './menu/menu.component';
import {moneyComponent} from './money/money.component';

let angular = require('angular');

export default angular.module('web-service')
  .component('footer', footerComponent)
  .component('menu', menuComponent)
  .component('feed', feedComponent)
  .component('friends', friendsComponent)
  .component('profile', profileComponent)
  .component('intro', introComponent)
  .component('money', moneyComponent);
