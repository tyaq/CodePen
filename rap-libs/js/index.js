(function() {
  var rapHTML;
  var app = angular.module('modelStore', ['ngSanitize', 'ngMaterial']).config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
  });
  app.controller('StoreController', function() {
    this.products = models;
  });

  app.controller('SearchCtrl', DemoCtrl);

  function DemoCtrl($timeout, $http, $q) {
    var self = this;
    // list of `state` value/display objects
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;

    function querySearch(query) {
      query = encodeURI(query);
      var request = "https://api.genius.com/search?q=" + query + "&access_token=HyucTvmfghWDptTQX4pB6XTgX__JORD-AQWyJfCmQ5wYdi8mCfLx9Y8GtsYy-THY";
      console.log(request);
      var results = [];
      return $http.get(request).then(function(response) {
        return response.data.response.hits;
      })
    }
    /**
     * Build `states` list of key/value pairs
     */
    
  };

  app.controller('rapCtrl', function($scope, $sce, $compile, $http) {
    
    $scope.demo = function demo() {
      var verse = "Good dude, I know you love me like cooked food * Even though a nigga gotta move like a crook move * We was together on the block since free lunch * We should've been together having Four Seasons brunch * We used to use umbrellas to face the bad weather * So now we travel first class to change the forecast * Never in bunches, just me and you * I loved your point of view cause you held no punches * Still I left you for months on end * It's been months since I checked back in * We're somewhere in a small town, somewhere locking a mall down * Woodgrain, four and change, Armor All'd down * I can understand why you want a divorce now * Though I can't let you know it, pride won't let me show it * Pretend to be heroic, that's just one to grow with * But deep inside a nigga so sick *";
      // Credit to Sam Samskies for libberfy api at https://github.com/SamSamskies/libberfy
      var request = "http://libberfy.herokuapp.com?q=" + verse;
      return $http.get(request)
        .then(function(response) {
          rapHTML = response.data.madlib.replace(/\*/g, "[line]<br />").replace(/<noun>/g, "<md-input-container class='md-primary' flex><label>Noun</label><input required></md-input-container>").replace(/<plural_noun>/g, "<md-input-container class='md-accent' flex><label>Plural Noun</label><input required></md-input-container>").replace(/<proper_noun>/g, "<md-input-container class='md-primary' flex><label>Proper Noun</label><input required></md-input-container>").replace(/<verb>/g, "<md-input-container class='md-primary' flex><label>Verb</label><input required></md-input-container>").replace(/<verb_past_tense>/g, "<md-input-container class='md-primary' flex><label>Verb Past Tense</label><input required></md-input-container>").replace(/<verb_ending_with_ing>/g, "<md-input-container class='md-primary' flex><label>Verb Ending with ing</label><input required></md-input-container>").replace(/<adjective>/g, "<md-input-container class='md-primary' flex><label>Adjective</label><input required></md-input-container>").replace(/<adverb>/g, "<md-input-container class='md-primary' flex><label>Adverb</label><input required></md-input-container>").replace(/<interjection>/g, "<md-input-container class='md-primary' flex><label>Interjection</label><input required></md-input-container>");
          
          var compiled = $compile('<p>'+rapHTML+'</p>')($scope);
angular.element(document.getElementById('madlibForm')).children().remove();              
        angular.element(document.getElementById('madlibForm')).append(compiled);
        });
    }
  });

  app.directive('rapForm', function() {
    return {
      restrict: 'AE',
      template: '<div flex-sm="100" flex-gt-sm="80" layout-sm="column"> <form id="madlibForm" name="madlibForm" data-ng-submit="sendMail()"><div layout="row" layout-align="center center"> <md-progress-circular md-mode="indeterminate"></md-progress-circular> </div> </form> </div>'
    };
  });

  app.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default').primaryPalette('blue', {
            'default': '500',
        })
            .accentPalette('yellow', { 'default': 'A400', });
    });

})();