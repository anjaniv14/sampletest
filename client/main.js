var app=angular.module('fileUpload', ['ngFileUpload']);

// app.factory('httpq', function($http, $q) {
//   return {
//     get: function() {
//       var deferred = $q.defer();
//       $http.get.apply(null, arguments)
//       .success(deferred.resolve)
//       .error(deferred.resolve);
//       return deferred.promise;
//     }
//   }
// });
// app.controller('MyCtrl',function($http,$scope){
//   $scope.category=[];
//     $http.get("http://localhost:3000/list")
//          // $http({
//          //  method:'GET',
//          //  url:"",

//          .then(function(result){
//           $scope.category=result.data;
//          });
// });
    app.controller('MyCtrl',['Upload','$window','$http','$scope',function(Upload,$window,$http,$scope){


       $scope.selectedCategory = {
        category_name:"",
        category_id:"",
        file:"",
        category_title:""
       };      
        // var vm = this;
         // vm.category=["c1","c2"];
         $scope.category=[{category_name:'c1',category_id:'123'},
         {category_name:'c2',category_id:'12345'}];
        
         
         $http.get('/')
         .then(function(result){
          console.log("result:"+JSON.parse(JSON.stringify(result)));
          console.log(result.data);
          $scope.category=result.data;       
         },function(err)
         {
            console.log('error!');
         });

         // vm.title="progressPercentage(Enter TITLE here";


         $scope.upload = function (file,selectedCategory) {
          console.log('check the file length', file.length);
          var dataresult = [];
             for(var i=0; i<file.length ; i++)
             {
              // selectedCategory.file="";
                var data = {};   
                Upload.upload({
                    url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
                    data:{file:file[i]} //pass file as data, should be user ng-model
                }).then(function (resp) { //upload function returns a promise
                    console.log(resp);
                  console.log('resp',resp.data.error_code)

                        if(resp.data.error_code === 0)
                           {

                            var data1={
                                category_name:selectedCategory.category_name.category_name,
                                category_id:selectedCategory.category_name.category_id,
                                category_title:selectedCategory.category_title,
                                file:'/uploads'+'/'+file[i].name
                              };
                               $http.post('/upload_file',data1).then(function(res){
                                  if(res.data=="success")
                                    $window.alert("UPLOADED successfully");
                              });

                            data.messsage = "file success";
                            data.file =file[i];
                            data.successcode = 200;
                            dataresult[i]=data;
   
                           }
                           else {
                                 data.messsage = "Error In fileUpload";
                                 data.file = file[i];
                                data.count = i;
                                 data.successcode = 400;                            
                                 dataresult[i]=data;
                           }
                         })
                 }
                 // console.log('checking the counter', i++);
                  console.log('checking the dataresult',dataresult);
                };        





         

        $scope.submit = function(selectedCategory){ //function to call on form submit
        // console.log('check category_name',selectedCategory);
        // console.log('check category_name',selectedCategory.category_name.category_id);
        

            //  if (selectedCategory.file.$valid && selectedCategory.file) { //check if from is valid
                // console.log('checking the values',data);               
                $scope.upload(selectedCategory.file,selectedCategory); //call upload function
               
            // }
            // else
            //   $window.alert("insert valid file ");
        };
        
        
        
        // $http.post('http://localhost:3000/upload',data).then(function(res){
        //   if(res=="success")
        //     $window.alert("UPLOADED successfully");
        // });



                 }]);
                         
    //                 // if(resp.data.error_code === 0){ //validate success
    //                 //     $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
    //                 // } else {
    //                 //     $window.alert('an error occured');
    //                 // }
    //             })   

    //             // }, function (evt) { 
    //             //     console.log(evt);
    //             //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //             //     console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //             //     vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
    //             // });

    //          }

            


        
   
    