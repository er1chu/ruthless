/* globals $:false */

$(function () {
	var app = {
		init: function () {

			this._initScrollFunctions();
			this._init3D();

		},
		_initScrollFunctions: function () {
			$(document).ready(function() {
				$(this).scrollTop(80);
			});
			$(window).scroll(function(){
				if ($(window).scrollTop() > $('.main1').offset().top *.75) {
					$('.logo').addClass('hidden');
					$('#flower').addClass('hidden');

				} else {
					$('.logo').removeClass('hidden');
				}
			});

			
			$('.logo').click(function() {
			    $('html, body').animate({
			        scrollTop: $('.main1').offset().top
			    }, 200);
			});


			$('.clicker').click(function() {
			    $('html, body').animate({
			        scrollTop: $('.main1').offset().top
			    }, 200);
			});


		},
		_init3D: function () {
			// Detect WebGL
			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			// Initialize Variables
			var container, stats;
			var camera, scene, renderer;
			var mesh, geometry;
			var loader;
			var mouseX = 0;
			var mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			document.addEventListener('mousemove', onDocumentMouseMove, false);

			init();
			animate();

			function init() {

				container = document.getElementById('hero');

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
				camera.position.z = 1000;

				//

				path = "textures/cube/sky3/";
				format = '.jpg';
				format2 ='.jpg';
				urls = [
						path + 'px' + format, path + 'nx' + format,
						path + 'py' + format, path + 'ny' + format,
						path + 'pz' + format, path + 'nz' + format
					];

				reflectionCube = new THREE.CubeTextureLoader().load( urls );
				reflectionCube.format = THREE.RGBFormat;
				reflectionCube.minFilter = THREE.LinearFilter;

				scene = new THREE.Scene();
				scene.background = reflectionCube;

				// LIGHTS

				var ambient = new THREE.AmbientLight( 0xffffff,1.1 );
				scene.add( ambient );

				// light representation

				var sphere = new THREE.SphereGeometry( 100, 16, 8 );

				mesh = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) );
				mesh.scale.set( 0.02, 0.02, 0.02 );

				var refractionCube = new THREE.CubeTextureLoader().load( urls );
				refractionCube.mapping = THREE.CubeRefractionMapping;
				refractionCube.format = THREE.RGBFormat;
				var cubeMaterial1 = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube, } );

				//



				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				loader = new THREE.JSONLoader();
				loader.load( "obj/peony_low.js", function( geometry ) { createScene( geometry, cubeMaterial1) } );
				window.addEventListener( 'resize', onWindowResize, false );

			}

			function controlPanel() {
				var panel = new dat.GUI({
					width: 310
				})

				var folder1 = panel.addFolder('Model');
				var folder2 = panel.addFolder('Scene');

				settings = {
					'show model': true,
					'rotation speed': 5
				};

				folder1.add(settings, 'show model');
				folder2.add( settings, 'rotation speed', 0.01, 0.1, 0.001 );
				
				folder1.open();
				folder2.open();
				console.log('dat gui');

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function createScene( geometry, m1, m2, m3 ) {

				var s = 12;

				mesh = new THREE.Mesh( geometry, m1 );
				mesh.position.z = - 100;
				mesh.position.y = - 1000;
				mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
				scene.add( mesh );

			}

			function onDocumentMouseMove(event) {

				mouseX = ( event.clientX - windowHalfX ) * 4;
				mouseY = ( event.clientY - windowHalfY ) * 4;

			}


			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				var timer = -0.0002 * Date.now();
				mesh.rotation.y += 0.003;
				camera.position.x += ( mouseX - camera.position.x ) * .001;
				camera.position.y += ( - mouseY - camera.position.y ) * .001;
				if (camera.position.x >= 80) {
					camera.position.x = 80;
				} else if (camera.position.x <= -80) {
					camera.position.x = -80;
				}

				camera.lookAt( scene.position );
				renderer.render( scene, camera );

			}
		}
	};

	app.init();
});