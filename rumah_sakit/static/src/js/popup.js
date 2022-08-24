odoo.define('rumah_sakit.odoo_tutorial', function (require) {
	'use.strict';

	console.log('popup.js is loaded!');
	// My Map API Key 			AIzaSyC_lpKogCAaDgO7BouHlPEUMqM1XlqVxEI
	// Tripisia Map API Key 	AIzaSyD89gujBhgSGGf9q0ROLsFuuOL7s0APxOE
	// Global Variable
	var rpc = require('web.rpc')
	var FromController = require('web.FormController');
	//
	var self = this;
	//
	function parseURLParams(url) {
		var queryStart = url.indexOf("?") + 1,
		    queryEnd = url.indexOf("#") + 1 || url.length + 1,
		    query = url.slice(queryStart, queryEnd - 1),
		    pairs = query.replace(/\+/g, " ").split("&"),
		    parms = {}, i, n, v, nv;
		//
		if (query === url || query === "") return;
		//
		for (i = 0; i < pairs.length; i++) {
			nv = pairs[i].split("=", 2);
			n = decodeURIComponent(nv[0]);
			v = decodeURIComponent(nv[1]);
		//
		if (!parms.hasOwnProperty(n)) parms[n] = [];
			parms[n].push(nv.length === 2 ? v : null);
		}
		return parms;
	}

	//
	FromController.include({
		init: function() {
			var res = this._super.apply(this, arguments);
			//
			if (this.modelName == "res.partner") {
				//console.log("Init telah dipanggil!")	
				var apiKey = false;
				var script = document.createElement('script');
				
				rpc.query({
					model: 'google.maps.wizard',
					method: 'get_setting_map_key',
					fields: [],
				}).then(function(res){
					//console.log(res);
					//
					apiKey = res;
					//
					script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=initMap';
					script.async = true;
					//
					document.head.appendChild(script);
					//
				}).catch(function (reason){
					var error = reason.message;
					console.log(error);
				});
				//
				window.initMap = function initMap() {
					//
					var map, marker = [], geocoder;
					//
					$(document).on('click', '#openMap', function(){
						//
						if (apiKey != false || apiKey != '') {
							// Vaariables
							var url = window.location.href;
							var page_url = url.replace("#", "?");
							var params = parseURLParams(page_url);
							//
							rpc.query({
								model: 'res.partner',
								method: 'search_read',
								fields: [],
								domain: [['id', '=', params.id[0]]],
								//context: this,
							}).then(function(res){
								//console.log(res[0]);
								var lat = (res[0].add_latitude != false) ? +res[0].add_latitude : 0;
								var lng = (res[0].add_longitude != false) ? +res[0].add_longitude : 0;
								var latlong = {lat: lat,lng: lng}
								var geocoder = new google.maps.Geocoder();

								// Filter Adress From res.partner
								var address = '';
									address += (res[0].country_id != false) ? ' ' + res[0].country_id[1] : '';
									address += (res[0].city != false) ? ' ' + res[0].city : '';
									address += (res[0].state_id != false) ? ' ' + res[0].state_id[1] : '';
									address += (res[0].street != false) ? ' ' + res[0].street : '';
									address += (res[0].street2 != false) ? ' ' + res[0].street2 : '';
								//console.log(address)
								geocoder.geocode( { 'address': address}, function(results, status) {
							      	if (status == google.maps.GeocoderStatus.OK) {
							      		latlong = {
							      			lat: results[0].geometry.location.lat(),
							      			lng: results[0].geometry.location.lng()
							      		}
										//
										list_data = {
											'id': params.id[0],
											'lat': results[0].geometry.location.lat(),
											'long': results[0].geometry.location.lng()
										}
									    map.setCenter(latlong);
									    //
									    if (marker.length != 0) {
									    	for (i = 0; i < marker.length; i++) {
									    		marker[i].setMap(null);
									    	}
									    	marker = [];
									    }
									    //
									    // Set Marker on Map
										var mapMarker = new google.maps.Marker({
										    position: latlong,
										    map,
										    title: res[0].name,
										});
										//
										marker.push(mapMarker);
										//
										$("[name='add_latitude']").text(results[0].geometry.location.lat())
										$("[name='add_longitude']").text(results[0].geometry.location.lng())
										//
										rpc.query({
											model: 'google.maps.wizard',
											method: 'updateLatLong',
											args: [list_data],
										}).then(function(res){
											//console.log(res);
										}).catch(function (reason){
						                    var error = reason.message;
						                    console.log(error);
						                });
							     	} 
							     	else {
							       		alert("Geocode was not successful for the following reason: " + status);
							      	}
							    });
								// ==============================================================================
								// Draw Map
								map = new google.maps.Map($('#map')[0], {
									center: latlong,
									zoom: 13,
								});
								// Set Marker on Map
								var mapMarker = new google.maps.Marker({
								    position: latlong,
								    map,
								    title: res[0].name,
								});
								//
								marker.push(mapMarker);
								// Show Div
								$('#map').show();
							});
						} else {
							alert('You need Google Maps API Key to use this function!')
						}
					 });	
				}
			}
		}
	});
});