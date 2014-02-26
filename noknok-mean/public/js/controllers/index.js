'use strict';

angular.module('mean.system').controller('IndexController', ['$scope','$location', 'Global', function ($scope, $location, Global) {
        $scope.global = Global;
        //============== DRAG & DROP =============
        // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/
        var dropbox = document.getElementById("dropbox");

        $scope.dropText = 'Drop presentations here...'

        // init event handlers
        function dragEnterLeave(evt) {
            evt.stopPropagation()
            evt.preventDefault()
            $scope.$apply(function () {
                $scope.dropText = 'Drop presentations here...'
                $scope.dropClass = ''
            })
        }

        dropbox.addEventListener("dragenter", dragEnterLeave, false)
        dropbox.addEventListener("dragleave", dragEnterLeave, false)
        dropbox.addEventListener("dragover", function (evt) {
            evt.stopPropagation()
            evt.preventDefault()
            var clazz = 'not-available'
            var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
            $scope.$apply(function () {
                $scope.dropText = ok ? 'Drop presentations here...' : 'Only ppt, pps or pptx are allowed!'
                $scope.dropClass = ok ? 'over' : 'not-available'
            })
        }, false)
        dropbox.addEventListener("drop", function (evt) {
            console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
            evt.stopPropagation()
            evt.preventDefault()
            $scope.$apply(function () {
                $scope.dropText = 'Drop presentations here...'
                $scope.dropClass = ''
            })
            var files = evt.dataTransfer.files
            if (files.length > 0) {
                $scope.$apply(function () {
                    $scope.files = []
                    for (var i = 0; i < files.length; i++) {
                        if (files[i].name.endsWith(".ppt") || files[i].name.endsWith(".pps") || files[i].name.endsWith(".pptx")) {
                            $scope.files.push(files[i])
                        }
                        else {
                            alert("Only ppt, pps or pptx files are allowed");
                        }
                    }
                })
            }
        }, false)
        //============== DRAG & DROP =============

        $scope.setFiles = function (element) {
            $scope.$apply(function ($scope) {
                console.log('files:', element.files);
                // Turn the FileList object into an Array
                $scope.files = []
                for (var i = 0; i < element.files.length; i++) {
                    $scope.files.push(element.files[i])
                }
                $scope.progressVisible = false
            });
        };

        $scope.uploadFile = function () {
            /*var fd = new FormData()
             for (var i in $scope.files) {
             fd.append("uploadedFile", $scope.files[i])
             }
             var xhr = new XMLHttpRequest()
             xhr.upload.addEventListener("progress", uploadProgress, false)
             xhr.addEventListener("load", uploadComplete, false)
             xhr.addEventListener("error", uploadFailed, false)
             xhr.addEventListener("abort", uploadCanceled, false)
             xhr.open("POST", "/fileupload")
             $scope.progressVisible = true
             xhr.send(fd)
             */
            for (var i in $scope.files) {
                console.log($scope.files[i]);
            }
            $location.path('/');
        }

        function uploadProgress(evt) {
            $scope.$apply(function () {
                if (evt.lengthComputable) {
                    $scope.progress = Math.round(evt.loaded * 100 / evt.total)
                } else {
                    $scope.progress = 'unable to compute'
                }
            })
        }

        function uploadComplete(evt) {
            /* This event is raised when the server send back a response */
            //alert(evt.target.responseText)
            alert("Upload complete");
        }

        function uploadFailed(evt) {
            alert("There was an error attempting to upload the file.")
        }

        function uploadCanceled(evt) {
            $scope.$apply(function () {
                $scope.progressVisible = false
            })
            alert("The upload has been canceled by the user or the browser dropped the connection.")
        }




    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };

}]);