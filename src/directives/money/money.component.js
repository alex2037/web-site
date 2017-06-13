import template from './money.component.html';

function Controller($scope, $element, $attrs) {
  let $ctrl = this;

  $ctrl.list = [
    {
      name: 'Superman',
      location: ''
    },
    {
      name: 'Batman',
      location: 'Wayne Manor'
    }
  ];

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

export const moneyComponent = {
  template	: template,
  controllerAs : '$ctrl',
  controller 	 : Controller
};
