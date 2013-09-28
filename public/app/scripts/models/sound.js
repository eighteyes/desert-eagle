"use strict";

angular.module("de")
.service("SoundService", function SoundService( $http ){
	return {
		getList : function() {
			return $http({
        url: 'http://localhost:8000/list',
        method: 'GET'
      })
			.success({})
			.error({})
		},
		getWaveData: function ( soundId ) {
			return $http({
        url: 'http://localhost:8000/sound/' + soundId + '/wave/',
        method: 'GET'
      })
			.success( function (resp) {
        console.log('[sound-d]>', resp);
      })
			.error( function (resp) {
        console.error('[sound-d]', resp)
      })
		},
    getRegions: function ( soundId ){
      return $http({
        url: 'http://localhost:8000/sound/' + soundId + '/region/',
        method: 'GET'
      })
      .success( function (resp) {
        console.log('[sound-i]>', resp);
      })
      .error( function (resp) {
        console.error('[sound-i]', resp)
      })
    },
		saveSound: function( soundId, soundData ) {
			return $http({})
			.success({})
			.error({})
		},

});
