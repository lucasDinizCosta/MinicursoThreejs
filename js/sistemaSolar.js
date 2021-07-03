function main() {
    const scene = new THREE.Scene();    // Cria a cena principal que irá armazenar os elementos
    const renderer = new THREE.WebGLRenderer({
        antialias: true,                // Remove o serrilhado da imagem
        alpha: true,                    // Permite objetos transparentes
    });
    renderer.setClearColor(new THREE.Color("rgb(0, 0, 0)"));
    renderer.setSize(window.innerWidth, window.innerHeight);
    const textureLoader = new THREE.TextureLoader();


    // Ativa as sombras
    renderer.shadowMap.enabled = false;

    // Adiciona o renderizador na div que irá comportar a aplicação
    document.getElementById("Mundo").appendChild(renderer.domElement);

    // Setting Camera
    var camera = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 0.1, 10000
    );
    camera.lookAt(0, 0, 0);
    camera.position.set(10, 30, 300);
    camera.up.set(0, 1, 0);

    //  Setting the Lights
    var ambientLight = new THREE.AmbientLight(0x343434);
    ambientLight.name = "ambientLight";
    scene.add(ambientLight);

    var pointlight = new THREE.PointLight({
        color: 0xffffff, 
    });
    pointlight.position.set(0, 0, 0);
    scene.add(pointlight);

    // Show axes (parameter is size of each axis)
    var axes = new THREE.AxesHelper(1000);
    axes.name = "AXES";
    axes.visible = true;
    scene.add(axes);

    // Enable mouse rotation, pan, zoom etc.
    var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 0, 0);

    // Skybox of galaxy
    let skyBoxMaterial = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: textureLoader.load("../assets/textures/space/2k_stars_milky_way.jpg"),
    });
    let skyBoxGeometry = new THREE.SphereGeometry(800, 128, 128);
    let skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);

    const sizePlanets = 12;

    // Add objects to scene
    let objectArray = new Array();

    function createSolarSystem(objectArray, index){
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
        mercury.position.set(0, 0, 100 * index);
        scene.add(mercury);
        index++;

        // Venus
        let venusGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let venusMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_venus.jpg")
        });
        let venus = new THREE.Mesh(venusGeometry, venusMaterial);
        venus.position.set(0, 0, 100 * index);
        objectArray.push(venus);
        scene.add(venus);          
        index++;  
        
        // Moon
        let moonGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let moonMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_moon.jpg")
        });
        let moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(0, 0, 100 * index);
        objectArray.push(moon);
        scene.add(moon);
        index++;
        
        // Earth
        let earthGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let earthMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_earth.jpg")
        });
        let earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.position.set(0, 0, 100 * index);
        objectArray.push(earth);
        scene.add(earth);
        index++;
        
        // Mars
        let marsGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let marsMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_mars.jpg")
        });
        let mars = new THREE.Mesh(marsGeometry, marsMaterial);
        mars.position.set(0, 0, 100 * index);
        mars.rotation.y = (1/6) * Math.PI;
        objectArray.push(mars);
        scene.add(mars);
        index++;
        
        // Jupiter
        let jupiterGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let jupiterMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_jupiter.jpg")
        });
        let jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
        jupiter.rotation.y = (1/6) * Math.PI;
        objectArray.push(jupiter);
        scene.add(jupiter);
        index++;
        
        // Saturn
        let saturnGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let saturnMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_saturn.jpg")
        });
        let saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
        saturn.rotation.y = (1/6) * Math.PI;
        objectArray.push(saturn);
        scene.add(saturn);
        index++;
        
        // Saturn ring
        let saturnRingGeometry = new THREE.RingBufferGeometry(13, 20, 64, 64, 0, Math.PI * 2);
        let saturnRingMaterial = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: textureLoader.load("../assets/textures/space/saturn-Ring-1024x1024.png")
        });
        let saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
        saturnRing.rotation.x = Math.PI/2;
        saturnRing.material.opacity = 0.6;
        saturnRing.material.transparent = true;
        saturn.add(saturnRing);
        
        // Uranus
        let uranusGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let uranusMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_uranus.jpg")
        });
        let uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
        objectArray.push(uranus);
        scene.add(uranus);
        index++;
        
        // Neptune
        let neptuneGeometry = new THREE.SphereGeometry(sizePlanets, 50, 50);
        let neptuneMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("../assets/textures/space/2k_neptune.jpg")
        });
        let neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
        objectArray.push(neptune);
        scene.add(neptune);
        index++;
    }

    // Creating de planets and stars
    createSolarSystem(objectArray, 1);

    // Reajuste da renderização com base na mudança da janela
    function onResize(){
        camera.aspect = window.innerWidth / window.innerHeight;  //Atualiza o aspect da camera com relação as novas dimensões
        camera.updateProjectionMatrix();                         //Atualiza a matriz de projeção
        renderer.setSize(window.innerWidth, window.innerHeight); //Define os novos valores para o renderizador
        //console.log('Resizing to %s x %s.', window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', onResize, false);         // Ouve os eventos de resize
    
    // Controla o looping de animação
    renderer.setAnimationLoop(animation);
    
    function animation(time) {
        // Atualiza o posicionamento da camera
        orbitControls.update();
        
        // Desenha na tela
        renderer.render(scene, camera);
    }
}