angular.module('starter')

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
})

.controller('ECoacherCtrl',
  [ '$scope',
    '$stateParams',
    '$cordovaSQLite',
    'MainService',
    function(
      $scope,
      $stateParams,
      $cordovaSQLite,
      MainService
      ) {

      checkAvatarData();

      $scope.title = $scope.avatarData.name + " - " + MainService.title();

      $scope.actualComment = MainService.generateComment();

      $scope.generateComment = function() {
        $scope.actualComment = MainService.generateComment();
      }

      $scope.avatarPath = function() {
        return "img/" + $scope.avatarData.type + "/" + $scope.actualComment.avatar + ".png";
      }

      // Check if the type is COMENTARIO
      $scope.isComentario = function() {
        return $scope.actualComment.type == "COMENTARIO";
      }

      // Check if the type is INFO of subtype text
      $scope.isInfoText = function() {
        return $scope.actualComment.type == "INFO" && $scope.actualComment.subtype == "text";
      }

      // Check if the type is INFO of subtype number
      $scope.isInfoNumber = function() {
        return $scope.actualComment.type == "INFO" && $scope.actualComment.subtype == "number";
      }

      // Check if the type is INFO of subtype yes_no
      $scope.isInfoYesNo = function() {
        return $scope.actualComment.type == "INFO" && $scope.actualComment.subtype == "yes_no";
      }

      // Check if the type is RETO
      $scope.isReto = function() {
        return $scope.actualComment.type == "RETO";
      }

      // Check if the type is SABIASQUE
      $scope.isSabiasQue = function() {
        return $scope.actualComment.type == "SABIASQUE";
      }

      $scope.acceptReto = function() {
        var title = $scope.actualComment.title;
        var mins = $scope.actualComment.minutesAsk;

        var now = new Date().getTime(),
          min_from_now = new Date(now + mins*60*1000);

        app.localNotification.schedule({
            id: 1,
            at: min_from_now,
            text: "¿Has cumplido el reto: '" + title + "'?"
        });
      }

      // FUNCTIONS

      function checkAvatarData() {
        if (window.localStorage.getItem("avatarData") !== undefined) {
          var avatarData = MainService.generateAvatar();

          window.localStorage.setItem('avatarData', JSON.stringify(avatarData));

          /*var query = "INSERT INTO data (key, value) VALUES (?,?)";
          $cordovaSQLite.execute(db, query, ["avatarType", avatarData.type]).then(function(res) {
            console.log("insertId: " + res.insertId);
          }, function (err) {
            console.error(err);
          });
          $cordovaSQLite.execute(db, query, ["avatarName", avatarData.name]).then(function(res) {
            console.log("insertId: " + res.insertId);
          }, function (err) {
            console.error(err);
          });*/
        }

        $scope.avatarData = JSON.parse(window.localStorage.getItem("avatarData"));
      }

}])


.controller('DashboardCtrl',
  [ '$scope',
    '$stateParams',
    '$cordovaSQLite',
    'MainService',
    function(
      $scope,
      $stateParams,
      $cordovaSQLite,
      MainService
      ) {

      checkAvatarData();

      $scope.title = $scope.avatarData.name + " - " + MainService.title();

      $scope.actualComment = MainService.generateComment();

      $scope.generateComment = function() {
        $scope.actualComment = MainService.generateComment();
      }

      $scope.avatarPath = function() {
        return "img/" + $scope.avatarData.type + "/" + $scope.actualComment.avatar + ".png";
      }

      // Check if the type is COMENTARIO
      $scope.isComentario = function() {
        return $scope.actualComment.type == "COMENTARIO";
      }

      // Check if the type is INFO of subtype text
      $scope.isInfoText = function() {
        return $scope.actualComment.type == "INFO" && $scope.actualComment.subtype == "text";
      }

      // Check if the type is INFO of subtype number
      $scope.isInfoNumber = function() {
        return $scope.actualComment.type == "INFO" && $scope.actualComment.subtype == "number";
      }

      // Check if the type is INFO of subtype yes_no
      $scope.isInfoYesNo = function() {
        return $scope.actualComment.type == "INFO" && $scope.actualComment.subtype == "yes_no";
      }

      // Check if the type is RETO
      $scope.isReto = function() {
        return $scope.actualComment.type == "RETO";
      }

      // Check if the type is SABIASQUE
      $scope.isSabiasQue = function() {
        return $scope.actualComment.type == "SABIASQUE";
      }

      $scope.acceptReto = function() {
        var title = $scope.actualComment.title;
        var mins = $scope.actualComment.minutesAsk;

        var now = new Date().getTime(),
          min_from_now = new Date(now + mins*60*1000);

        app.localNotification.schedule({
            id: 1,
            at: min_from_now,
            text: "¿Has cumplido el reto: '" + title + "'?"
        });
      }

      // FUNCTIONS

      function checkAvatarData() {
        if (window.localStorage.getItem("avatarData") !== undefined) {
          var avatarData = MainService.generateAvatar();

          window.localStorage.setItem('avatarData', JSON.stringify(avatarData));

          /*var query = "INSERT INTO data (key, value) VALUES (?,?)";
          $cordovaSQLite.execute(db, query, ["avatarType", avatarData.type]).then(function(res) {
            console.log("insertId: " + res.insertId);
          }, function (err) {
            console.error(err);
          });
          $cordovaSQLite.execute(db, query, ["avatarName", avatarData.name]).then(function(res) {
            console.log("insertId: " + res.insertId);
          }, function (err) {
            console.error(err);
          });*/
        }

        $scope.avatarData = JSON.parse(window.localStorage.getItem("avatarData"));
      }

}])


.controller('LogrosCtrl',
  [ '$scope',
    '$stateParams',
    '$cordovaSQLite',
    'MainService',
    function(
      $scope,
      $stateParams,
      $cordovaSQLite,
      MainService
      ) {

      checkAvatarData();

      $scope.title = $scope.avatarData.name + " - " + MainService.title();

      $scope.actualComment = MainService.generateComment();

      $scope.generateComment = function() {
        $scope.actualComment = MainService.generateComment();
      }

      $scope.avatarPath = function() {
        return "img/" + $scope.avatarData.type + "/" + $scope.actualComment.avatar + ".png";
      }

      // Check if the type is COMENTARIO
      $scope.isComentario = function() {
        return $scope.actualComment.type == "COMENTARIO";
      }

      // Check if the type is INFO of subtype text
      $scope.isInfoText = function() {
        return $scope.actualComment.type == "INFO" && $scope.actualComment.subtype == "text";
      }

      // Check if the type is INFO of subtype number
      $scope.isInfoNumber = function() {
        return $scope.actualComment.type == "INFO" && $scope.actualComment.subtype == "number";
      }

      // Check if the type is INFO of subtype yes_no
      $scope.isInfoYesNo = function() {
        return $scope.actualComment.type == "INFO" && $scope.actualComment.subtype == "yes_no";
      }

      // Check if the type is RETO
      $scope.isReto = function() {
        return $scope.actualComment.type == "RETO";
      }

      // Check if the type is SABIASQUE
      $scope.isSabiasQue = function() {
        return $scope.actualComment.type == "SABIASQUE";
      }

      $scope.acceptReto = function() {
        var title = $scope.actualComment.title;
        var mins = $scope.actualComment.minutesAsk;

        var now = new Date().getTime(),
          min_from_now = new Date(now + mins*60*1000);

        app.localNotification.schedule({
            id: 1,
            at: min_from_now,
            text: "¿Has cumplido el reto: '" + title + "'?"
        });
      }

      // FUNCTIONS

      function checkAvatarData() {
        if (window.localStorage.getItem("avatarData") !== undefined) {
          var avatarData = MainService.generateAvatar();

          window.localStorage.setItem('avatarData', JSON.stringify(avatarData));

          /*var query = "INSERT INTO data (key, value) VALUES (?,?)";
          $cordovaSQLite.execute(db, query, ["avatarType", avatarData.type]).then(function(res) {
            console.log("insertId: " + res.insertId);
          }, function (err) {
            console.error(err);
          });
          $cordovaSQLite.execute(db, query, ["avatarName", avatarData.name]).then(function(res) {
            console.log("insertId: " + res.insertId);
          }, function (err) {
            console.error(err);
          });*/
        }

        $scope.avatarData = JSON.parse(window.localStorage.getItem("avatarData"));
      }

}])

;