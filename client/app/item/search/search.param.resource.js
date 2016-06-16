/**
 * Created by mirko on 8.12.15..
 */
(function () {
  'use strict';

  angular.module('skywarriorApp')
    .factory('searchParamResource', searchParamResource);

  searchParamResource.$inject = [];

  function searchParamResource() {
    return {
      exteriors: exteriors,
      knives: knives,
      smgs: smgs,
      heavies: heavies,
      pistols: pistols,
      rifles: rifles,
      containers: containers,
    };

    function exteriors() {
      return [{name: 'Field-Tested'}, {name: 'Minimal Wear'}, {name: 'Battle-Scarred'}, {name: 'Well-Worn'}, {name: 'Factory New'}, {name: 'Not Painted'}];
    }

    function knives() {
      return [
        {name: 'Bayonet Knife'},
        {name: 'Butterfly Knife'},
        {name: 'Falchion Knife'},
        {name: 'Flip Knife'},
        {name: 'Gut Knife'},
        {name: 'Huntsman Knife'},
        {name: 'Karambit Knife'},
        {name: 'M9 Bayonet Knife'},
        {name: 'Shadow Daggers Knife'}
      ];
    }

    function pistols() {
      return [
        {name: 'CZ75-Auto'},
        {name: 'Desert Eagle'},
        {name: 'Dual Berettas'},
        {name: 'Five-SeveN'},
        {name: 'Glock-18'},
        {name: 'P250'},
        {name: 'P2000'},
        {name: 'Tec-9'},
        {name: 'USP-S'}
      ];
    }

    function rifles() {
      return [
        {name: 'AK-47'},
        {name: 'AUG'},
        {name: 'AWP'},
        {name: 'FAMAS'},
        {name: 'G3SG1'},
        {name: 'Galil AR'},
        {name: 'M4A1-S'},
        {name: 'M4A4'},
        {name: 'SCAR-20'},
        {name: 'SG 553'},
        {name: 'SSG 08'}
      ];
    }

    function heavies() {
      return [
        {name: 'M249'},
        {name: 'MAG-7'},
        {name: 'Negev'},
        {name: 'Nova'},
        {name: 'Sawed-Off'},
        {name: 'XM1014'}
      ];
    }

    function smgs() {
      return [
        {name: 'MAC-10'},
        {name: 'MP7'},
        {name: 'MP9'},
        {name: 'P90'},
        {name: 'PP-Bizon'},
        {name: 'UMP-45'}
      ];
    }

    function containers() {
      return [
        {name: 'CS:GO Weapon Case'},
        {name: 'CS:GO Weapon Case 2'},
        {name: 'CS:GO Weapon Case 3'},
        {name: 'Chroma Case'},
        {name: 'eSports 2013 Case'},
        {name: 'eSports 2013 Winter Case'},
        {name: 'eSports 2014 Summer Case'},
        {name: 'Falchion Case'},
        {name: 'Huntsman Weapon Case'},
        {name: 'Operation Bravo Case'},
        {name: 'Operation Breakout Weapon Case'},
        {name: 'Operation Phoenix Weapon Case'},
        {name: 'Operation Vanguard Weapon Case'},
        {name: 'Winter Offensive Weapon Case'}
      ]
    }

  }

})();
