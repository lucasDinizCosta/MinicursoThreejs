function main(){
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    renderer.setClearColor(new THREE.Color("rgb(0, 0, 0)"));
    renderer.setSize(window.innerWidth, innerHeight);

    // Faz o carregamento das texturas
    const textureLoader = new THREE.TextureLoader();

    // Adiciona na pagina
    document.getElementById("Mundo").appendChild(renderer.domElement);

    // Criar a camera
    let camera = new THREE.PerspectiveCamera(
        45,     // Angulo de visao
        window.innerWidth/window.innerHeight,
        0.1,
        10000,
    );
    camera.lookAt(0, 0, 0);
    camera.position.set(10, 30, 300);

    // Controladora da camera
    let orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    // Luz ambiente
    let ambientLight = new THREE.AmbientLight("rgb(40,40,40)");
    scene.add(ambientLight);

    // Skybox da galaxia
    let skyBoxGeometry = new THREE.SphereGeometry(1000, 64, 64);
    let skyBoxMaterial = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: textureLoader.load("../assets/textures/space/2k_stars_milky_way.jpg"),
    });
    let skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);

    // Eixos das coordenadas
    let axes = new THREE.AxesHelper(1000);
    scene.add(axes);

    // Lista de corpos celestes --> Para fazer a rotação
    let objectArray = new Array();

    // Lista de grupos --> Para fazer a translação
    let groupArray = new Array();

    // Lista de velocidades de translação
    let speedTranslation = new Array();

    const sizePlanets = 12;

    function createSolarSystem(objectArray, sizePlanets, groupArray){
        let indexPosition = 1;
        let sunGeometry = new THREE.SphereGeometry(20, 50, 50);
        let sunMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_sun.jpg")
        });
        let sun = new THREE.Mesh(sunGeometry, sunMaterial);
        objectArray.push(sun);
        scene.add(sun);

        // Mercury
        let mercuryGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let mercuryMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_mercury.jpg")
        });
        let mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
        objectArray.push(mercury);
        mercury.position.set(0, 0, 100 * indexPosition);
        let groupAuxMecury = new THREE.Group();
        groupAuxMecury.add(mercury);
        groupArray.push(groupAuxMecury);
        scene.add(groupAuxMecury);
        indexPosition++;
        
        // Venus
        let venusGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let venusMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_venus.jpg")
        });
        let venus = new THREE.Mesh(venusGeometry, venusMaterial);
        venus.position.set(0, 0, 100 * indexPosition);
        objectArray.push(venus);
        let groupAuxVenus = new THREE.Group();
        groupAuxVenus.add(venus);
        groupArray.push(groupAuxVenus);
        scene.add(groupAuxVenus);          
        indexPosition++;  
        
        // Earth
        let earthGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let earthMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_earth.jpg")
        });
        let earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.position.set(0, 0, 100 * indexPosition);
        objectArray.push(earth);
        let groupAuxEarth = new THREE.Group();
        groupAuxEarth.add(earth);
        groupArray.push(groupAuxEarth);
        scene.add(groupAuxEarth);   
        indexPosition++;

        // Moon
        let moonGeometry = new THREE.SphereGeometry(sizePlanets/4, 50, 50);
        let moonMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_moon.jpg")
        });
        let moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(0, 0, sizePlanets + (sizePlanets/4)*8);
        objectArray.push(moon);
        earth.add(moon);

        // Mars
        let marsGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let marsMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_mars.jpg")
        });
        let mars = new THREE.Mesh(marsGeometry, marsMaterial);
        mars.position.set(0, 0, 100 * indexPosition);
        objectArray.push(mars);
        let groupAuxMars = new THREE.Group();
        groupAuxMars.add(mars);
        groupArray.push(groupAuxMars);
        scene.add(groupAuxMars);
        indexPosition++;
        
        // Jupiter
        let jupiterGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let jupiterMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_jupiter.jpg")
        });
        let jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
        jupiter.position.set(0, 0, 100 * indexPosition);
        objectArray.push(jupiter);
        let groupAuxJupiter = new THREE.Group();
        groupAuxJupiter.add(jupiter);
        groupArray.push(groupAuxJupiter);
        scene.add(groupAuxJupiter);
        indexPosition++;
        
        // Saturn
        let saturnGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let saturnMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_saturn.jpg")
        });
        let saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
        saturn.position.set(0, 0, 100 * indexPosition);
        objectArray.push(saturn);
        let groupAuxSaturn = new THREE.Group();
        groupAuxSaturn.add(saturn);
        groupArray.push(groupAuxSaturn);
        scene.add(groupAuxSaturn);
        indexPosition++;
        
        // Saturn ring
        let saturnRingGeometry = new THREE.RingBufferGeometry(13, 20, 64, 64, 0, Math.PI * 2);
        let saturnRingMaterial = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: textureLoader.load("../assets/textures/space/saturn-Ring-1024x1024.png")
        });
        let saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
        saturnRing.material.opacity = 0.6;
        saturnRing.material.transparent = true;
        saturnRing.rotation.x = Math.PI/2;
        saturn.add(saturnRing);
        
        // Uranus
        let uranusGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let uranusMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_uranus.jpg")
        });
        let uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
        objectArray.push(uranus);
        uranus.position.set(0, 0, 100 * indexPosition);
        let groupAuxUranus = new THREE.Group();
        groupAuxSaturn.add(uranus);
        groupArray.push(groupAuxUranus);
        scene.add(groupAuxUranus);
        indexPosition++;
        
        // Neptune
        let neptuneGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let neptuneMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_neptune.jpg")
        });
        let neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
        neptune.position.set(0, 0, 100 * indexPosition);
        objectArray.push(neptune);
        let groupAuxNeptune = new THREE.Group();
        groupAuxSaturn.add(neptune);
        groupArray.push(groupAuxNeptune);
        scene.add(groupAuxNeptune);
        indexPosition++;
    }

    createSolarSystem(objectArray, sizePlanets, groupArray);

    function defineSpeedTranslation(speedTranslation){
        let beginSpeed = 5;

        for(let i = 0; i < groupArray.length; i++){
            speedTranslation.push(beginSpeed);
            beginSpeed = beginSpeed / 2 - 0.01;
        }
    }

    defineSpeedTranslation(speedTranslation);

    // Movimento de rotação dos planetas
    function rotationMoviment(objectArray){
        for(let i = 0; i < objectArray.length; i++){
            objectArray[i].rotateY(THREE.Math.degToRad(0.5));
        }
    }

    // Movimento de translação dos planetas
    function translationMoviment(groupArray){
        for(let i = 0; i < groupArray.length; i++){
            let speed = speedTranslation[i];
            groupArray[i].rotateY(THREE.Math.degToRad(speed));
        }
    }

    renderer.setAnimationLoop(animation);

    function animation(time){
        orbitControls.update();

        rotationMoviment(objectArray);
        translationMoviment(groupArray);

        renderer.render(scene, camera);
    }
}