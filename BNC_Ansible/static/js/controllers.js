'use strict';

var ansibleControllers = angular.module('ansibleControllers', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'md.time.picker']);

  /////////////////////////////////
 ////  Controller for header  ////
/////////////////////////////////

//angular.module('ansibleControllers').requires.push('ngMaterial');

angular.module('ansibleControllers').controller('portAutomate', ['$scope', '$http', '$mdSidenav', '$timeout', '$mdpTimePicker',function($scope, $http, $mdSidenav, $timeout, $mdpTimePicker) {

    $scope.submissionTime = new Date();

    $scope.project = {};

    $scope.project.portNegotiation = true;

    // Temp hardcoded list of equipment
    var equipmentInfo = [
      {building: '671 de la Gauchetiere', floor: '6th floor', device: 'C3750-Ansible-Lab'},
      {building: '671 de la Gauchetiere', floor: '6th floor', device: 'N7631-Lab'},
      {building: '671 de la Gauchetiere', floor: '1st floor', device: 'Elevator'},
      {building: '1 Carrefour Alexander Graham Bell', floor: '3rd floor', device: 'HP-PC'}
    ];

    $scope.interfaceInfo = [
      "GigabitEthernet1/0/1",
      "GigabitEthernet1/0/2",
      "GigabitEthernet1/0/3",
      "GigabitEthernet1/0/4",
      "GigabitEthernet1/0/5",
      "GigabitEthernet1/0/6",
      "GigabitEthernet1/0/7",
      "GigabitEthernet1/0/8",
      "GigabitEthernet1/0/9",
      "GigabitEthernet1/0/10",
      "GigabitEthernet1/0/11",
      "GigabitEthernet1/0/12",
      "GigabitEthernet1/0/13",
      "GigabitEthernet1/0/14",
      "GigabitEthernet1/0/15",
      "GigabitEthernet1/0/16",
      "GigabitEthernet1/0/17",
      "GigabitEthernet1/0/18",
      "GigabitEthernet1/0/19",
      "GigabitEthernet1/0/20",
      "GigabitEthernet1/0/21",
      "GigabitEthernet1/0/22",
      "GigabitEthernet1/0/23",
      "GigabitEthernet1/0/24",
      "GigabitEthernet1/0/25",
      "GigabitEthernet1/0/26",
      "GigabitEthernet1/0/27",
      "GigabitEthernet1/0/28",
      "GigabitEthernet1/0/29",
      "GigabitEthernet1/0/30",
      "GigabitEthernet1/0/31",
      "GigabitEthernet1/0/32",
      "GigabitEthernet1/0/33",
      "GigabitEthernet1/0/34",
      "GigabitEthernet1/0/35",
      "GigabitEthernet1/0/36",
      "GigabitEthernet1/0/37",
      "GigabitEthernet1/0/38",
      "GigabitEthernet1/0/39",
      "GigabitEthernet1/0/40",
      "GigabitEthernet1/0/41",
      "GigabitEthernet1/0/42",
      "GigabitEthernet1/0/43",
      "GigabitEthernet1/0/44",
      "GigabitEthernet1/0/45",
      "GigabitEthernet1/0/46",
      "GigabitEthernet1/0/47",
      "GigabitEthernet1/0/48"
    ];

    // Dropdown statuses
    $scope.floorVisible = false;
    $scope.deviceVisible = false;
    $scope.portVisible = false;
    $scope.portSettingsVisible = false;

    // Populate available buildings
    var unique = {};
    $scope.buildings = [];

    for (var i in equipmentInfo){
      if (typeof(unique[equipmentInfo[i].building]) == "undefined") {
        $scope.buildings.push(equipmentInfo[i].building);
      }
      unique[equipmentInfo[i].building] = 0;
    }

    // Change done on building dropdown - enable floor dropdown and populate available floors.
    $scope.buildingSelectChange = function () {
      // TODO : Clear input on all children dropdowns
      $scope.floorVisible = true;
      $scope.floors = listFloors();

      // Clear inpput on all children dropdown
    }

    // Change done on floor dropdown - enable device dropdown and populate available devices.
    $scope.floorSelectChange = function () {
      // TODO : Clear input on all children dropdowns
      $scope.deviceVisible = true;
      $scope.devices = listDevices();
    }

    // Change done on device dropdown - enable port dropdown and populate available ports.
    $scope.deviceSelectChange = function () {
      // TODO : Clear input on all children dropdowns
      $scope.portVisible = true;
      //$scope.devices = listDevices();
    }

    // Change done on port dropdown - display port config
    $scope.portSelectChange = function () {
      //$scope.devices = listDevices();
      getPortConfig();
    }

    function listFloors() {
      var unique = {};
      var floors = [];
      for (var i in equipmentInfo) {
        if (angular.equals(equipmentInfo[i].building, $scope.project.building) && typeof(unique[equipmentInfo[i].floor]) == "undefined") {
          floors.push(equipmentInfo[i].floor);
        }
        unique[equipmentInfo[i].floor] = 0;
      }
      return floors;
    }

    function listDevices() {
      var unique = {};
      var devices = [];
      for (var i in equipmentInfo) {
        if (angular.equals(equipmentInfo[i].building, $scope.project.building)
            && angular.equals(equipmentInfo[i].floor, $scope.project.floor)
            && typeof(unique[equipmentInfo[i].device]) == "undefined") {
          devices.push(equipmentInfo[i].device);
        }
        unique[equipmentInfo[i].device] = 0;
      }
      return devices;
    }

    function getPortConfig() {
      $http.get('/api/getPortInfo').
      success(function(data, status, headers, config) {
        $scope.portInfo = data;
        $scope.portSettingsVisible = true;
      }).
      error(function(data, status, headers, config) {
        // log error
      });
    }

}]);
