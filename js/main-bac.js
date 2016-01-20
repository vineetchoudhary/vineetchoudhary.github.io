angular
    .module('site', [])
    .factory('Backend', ['$http',
        function($http) {
            var get = function(url) {
                return function() {
                    return $http.get(url).then(function(resp) {
                        return resp.data;
                    });
                }
            };

            return {
                featured: get('https://raw.githubusercontent.com/vineetchoudhary/VCPersonal/master/data/featured.json'),
                projects: get('https://raw.githubusercontent.com/vineetchoudhary/VCPersonal/master/data/allprojects.json'),
                orgs: get('https://raw.githubusercontent.com/vineetchoudhary/VCPersonal/master/data/organization.json')
            }
        }
    ])
    .controller('MainCtrl', ['Backend',
        function(Backend) {
            var self = this;
            Backend.orgs().then(function(data) {
                self.orgs = data;
            });

            Backend.projects().then(function(data) {
                self.projects = data.AllProjects;
            }).then(function(){
                return Backend.featured();
            }).then(function(data){
                self.featured = data;
                self.featuredProjects = new Array();
                
                self.featured.forEach(function (name) {
                    for (var i = 0; i < self.projects.length; i++) {
                        var project = self.projects[i];
                        if (project.Name == name) {
                            self.featuredProjects.push(project);
                            return;
                        }
                    }
                 });
            });
        }
    ]);