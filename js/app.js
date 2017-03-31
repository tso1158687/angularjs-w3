(function() {
    "use strict"
    angular.module("NarrowItDownApp", [])
        .controller("NarrowItDownController", NarrowItDownController)
        .service("MenuSearchService", MenuSearchService)
        // .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
        .directive('narrowItDown', NarrowItDownDirective);

    function NarrowItDownDirective() {
        var ddo = {
            templateUrl: "founditem.html",
            scope: {
                narrow: "=items"
            }
        };
        return ddo;
    }



    NarrowItDownController.$inject = ["MenuSearchService"];

    function NarrowItDownController(MenuSearchService) {

        var narrow = this;
        narrow.title = "hahahaha";
        narrow.input = "";

        narrow.resultItems = MenuSearchService.getResultItems();
        narrow.checkButton = function() {
            MenuSearchService.checkButton(narrow.input);
        }

        narrow.delete = function(itemIndex) {
            MenuSearchService.delete(itemIndex);
        };

        narrow.error = MenuSearchService.getError();



    }

    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        var service = this;
        service.resultItems = [];

        service.getMatchedMenuItems = function() {
            var response = $http({
                method: "GET",
                url:"https://davids-restaurant.herokuapp.com/menu_items.json"
            });

            return response;
        };


        var a = service.getMatchedMenuItems();
        a.then(function(response) {
            service.categories = response.data.menu_items;
            //推資料
            for (var i = 0; i < service.categories.length; i++) {
                var output = service.categories[i].nam

                var pushItems = {
                    name: service.categories[i].name,
                    short_name: service.categories[i].short_name,
                    description: service.categories[i].description
                };
                service.resultItems.push(pushItems);
            };

        })



        service.checkButton = function(narrowInput) {
            var resultItems = [];
            service.resultItems.length = 0;

            console.log(narrowInput.length);
            if (narrowInput.length > 0) {
                for (var i = 0; i < service.categories.length; i++) {
                    var output = service.categories[i].name;

                    if (output.toLowerCase().indexOf(narrowInput) !== -1) {

                        var pushItems = {
                            name: service.categories[i].name,
                            short_name: service.categories[i].short_name,
                            description: service.categories[i].description
                        };
                        service.resultItems.push(pushItems);
                        console.log(service.resultItems);
                        console.log(service.resultItems.length);



                    } else {
                        console.log("false");
                    };
                };
            };
        };

        service.getResultItems = function() {
            return service.resultItems;
        };


        service.delete = function(itemIndex) {
            console.log("service delete");
            service.resultItems.splice(itemIndex, 1);
        };

        service.getError = function() {
            return service.resultItems;
        };

    }
})()
