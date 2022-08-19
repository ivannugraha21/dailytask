odoo.define('rumah_sakit.odoo_tutorial', function (require) {
	'use.strict';

	console.log('popup.js is loaded!');



	if (this.modelName = 'pasien.daftarkunjungan') {

		var script = document.createElement('script');
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_lpKogCAaDgO7BouHlPEUMqM1XlqVxEI&callback=initMap';
		script.async = true;

		var ele = document.getElementById("map");

		if (ele != null) {
			window.initMap = function initMap() {
				map = new google.maps.Map(ele, {
			    	center: { lat: -34.397, lng: 150.644 },
			   		zoom: 8,
			  	});
			}
		}

		document.head.appendChild(script);


	}













	var FromController = require('web.FormController');

	FromController.include({
		saveRecord: function () {
			// console.log("Record telah di save!");
			var res = this._super.apply(this, arguments);


			//
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


			if (this.modelName == 'pasien.daftarkunjungan') {
				// Munculin notifikasi setelah klik save
				this.displayNotification({
				    title: "Success",
				    message: "Your signature request has been sent."
				});
				//
				/* querySelector hanya berlaku untuk input, untuk select/many2one tidak berlaku
				var in_nama = document.querySelector('[name="id"]');
				*/
				//var fields = 
				var url = window.location.href;
				var page_url = url.replace("#", "?");
				var params = parseURLParams(page_url);
				console.log(params)


				this._rpc({
					model: 'pasien.daftarkunjungan',
					method: 'search_read',
					fields: ['nama', 'penanggung_jawab'],
					domain: [['id', '=', params.id[0]]],
					//context: this,
				}).then(function(res){
					console.log(res);
				});
			}

			return res;
		}
	});
});