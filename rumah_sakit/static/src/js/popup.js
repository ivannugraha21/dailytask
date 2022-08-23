odoo.define('rumah_sakit.odoo_tutorial', function (require) {
	'use.strict';

	console.log('popup.js is loaded!');

	if (this.modelName = 'pasien.daftarkunjungan') {

		$(document).ready(function(){
			$('body').on('click', '#ClickTest', function() {
				alert('AAAAAA');
				console.log($('#map')[0]);
			});
		});

		var script = document.createElement('script');
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_lpKogCAaDgO7BouHlPEUMqM1XlqVxEI&callback=initMap';
		script.async = true;

		// My Maps API Key
		// AIzaSyC_lpKogCAaDgO7BouHlPEUMqM1XlqVxEI
		// Tripisia Maps API Key
		// AIzaSyD89gujBhgSGGf9q0ROLsFuuOL7s0APxOE

		
		window.initMap = function initMap() {

			var map, marker = [], geocoder;

			function parseURLParams(url) {
				var queryStart = url.indexOf("?") + 1,
				    queryEnd = url.indexOf("#") + 1 || url.length + 1,
				    query = url.slice(queryStart, queryEnd - 1),
				    pairs = query.replace(/\+/g, " ").split("&"),
				    parms = {}, i, n, v, nv;

				if (query === url || query === "") return;

				for (i = 0; i < pairs.length; i++) {
					nv = pairs[i].split("=", 2);
					n = decodeURIComponent(nv[0]);
					v = decodeURIComponent(nv[1]);

					if (!parms.hasOwnProperty(n)) parms[n] = [];
					parms[n].push(nv.length === 2 ? v : null);
				}
				return parms;
			}


			$(document).on('click', '#openMap', function(){
				// Include RPC
				var rpc = require('web.rpc')
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
					// Set Latitude & Longitude
					latlong = {
						lat: res[0].partner_latitude,
						lng: res[0].partner_longitude
					}


					// =========================== ERROR API KEY
					// =========================== Harus buat billing jadi ke block feature API nya
					// Set based on Address on Google Map API
					// ==============================================================================
					// geocoder = new google.maps.Geocoder();
					// var address = res[0].country_id[1];
					// 	address += ' ' + res[0].city;
					// 	address += ' ' + res[0].state_id[1];
					// 	address += ' ' + res[0].street;
					// 	address += ' ' + res[0].street2;
					// console.log(address)
					// geocoder.geocode( { 'address': address}, function(results, status) {
				 //      	if (status == google.maps.GeocoderStatus.OK) {
				 //      		latlong = {
				 //      			lat: results[0].geometry.location.lat(),
				 //      			lng: results[0].geometry.location.lng()
				 //      		}
				 //      		//alert("Latitude: "+results[0].geometry.location.lat());
				 //      		//alert("Longitude: "+results[0].geometry.location.lng());
				 //      		// Update Result data to database
					// 		console.log('RPCing to function UpdateLatLong')
					// 		//
					// 		list_data = {
					// 			'id': params.id[0],
					// 			'lat': results[0].geometry.location.lat(),
					// 			'long': results[0].geometry.location.lng()
					// 		}
					// 		//var latLng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
					// 	    map.setCenter(latlong);
					// 	    //
					// 	    if (marker.length != 0) {
					// 	    	for (i = 0; i < marker.length; i++) {
					// 	    		marker[i].setMap(null);
					// 	    	}
					// 	    	marker = [];
					// 	    }
					// 	    //
					// 	    // Set Marker on Map
					// 		var mapMarker = new google.maps.Marker({
					// 		    position: latlong,
					// 		    map,
					// 		    title: res[0].name,
					// 		});
					// 		//
					// 		marker.push(mapMarker);

					// 		rpc.query({
					// 			model: 'google.maps.wizard',
					// 			method: 'updateLatLong',
					// 			args: [list_data],
					// 		}).then(function(res){
					// 			console.log(res);
					// 		}).catch(function (reason){
			  //                   var error = reason.message;
			  //                   console.log(error);
			  //               });
				 //     	} 
				 //     	else {
				 //       		alert("Geocode was not successful for the following reason: " + status);
				 //      	}
				 //    });
					// ==============================================================================
					
					// Draw Map
					map = new google.maps.Map($('#map')[0], {
						center: latlong,
						zoom: 12,
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

			 });

			
		}
		
		document.head.appendChild(script);


	}



});