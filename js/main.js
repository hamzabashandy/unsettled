 var camera, scene, renderer;

            var fov = 75,
            texture_placeholder,
            isUserInteracting = false,
            onMouseDownMouseX = 0, onMouseDownMouseY = 0,
            lon = 0, onMouseDownLon = 0,
            lat = 0, onMouseDownLat = 0,
            phi = 0, theta = 0;

            init();
            animate();

            function init() {

                var container, mesh;

                container = document.getElementById( 'container' );

                camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 1, 1100 );
                camera.target = new THREE.Vector3( 0, 0, 0 );

                scene = new THREE.Scene();

                mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/Index/360_Qustul.jpg' ) } ) );
                mesh.scale.x = -1;
                scene.add( mesh );
                document.getElementById("container").style.opacity = "0.9";


                renderer = new THREE.WebGLRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );

                container.appendChild( renderer.domElement );

                document.addEventListener( 'mousedown', onDocumentMouseDown, false );
                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'mouseup', onDocumentMouseUp, false );
                document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
                document.addEventListener( 'DOMMouseScroll', onDocumentMouseWheel, false);

                //

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }

            function onDocumentMouseDown( event ) {

                event.preventDefault();

                isUserInteracting = true;

                onPointerDownPointerX = event.clientX;
                onPointerDownPointerY = event.clientY;

                onPointerDownLon = lon;
                onPointerDownLat = lat;

            }

            function onDocumentMouseMove( event ) {

                if ( isUserInteracting ) {

                    lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
                    lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

                }
            }

            function onDocumentMouseUp( event ) {

                isUserInteracting = false;

            }

            function onDocumentMouseWheel( event ) {

                // WebKit

                if ( event.wheelDeltaY ) {

                    fov -= event.wheelDeltaY * 0.05;

                // Opera / Explorer 9

                } else if ( event.wheelDelta ) {

                    fov -= event.wheelDelta * 0.05;

                // Firefox

                } else if ( event.detail ) {

                    fov += event.detail * 1.0;

                }
                
                

                
                
                

            }

            function animate() {

                requestAnimationFrame( animate );
                render();

            }

            function render() {

                lat = Math.max( - 85, Math.min( 85, lat ) );
                phi = THREE.Math.degToRad( 78 - lat );
                theta = THREE.Math.degToRad( lon );

                camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
                camera.target.y = 500 * Math.cos( phi );
                camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

                camera.lookAt( camera.target );

                /*
                // distortion
                camera.position.x = - camera.target.x;
                camera.position.y = - camera.target.y;
                camera.position.z = - camera.target.z; 
                */

                renderer.render( scene, camera );
                
                

            }
