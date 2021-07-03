function main(){
    const scene = new THREE.Scene();    // Cria a cena principal que irá armazenar os elementos
    const renderer = new THREE.WebGLRenderer({
        antialias: true,                // Remove o serrilhado da imagem
        alpha: true,                    // Permite objetos transparentes
    });

    renderer.setClearColor(new THREE.Color("rgb(30, 30, 40)"));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Ativa as sombras
    renderer.shadowMap.enabled = true;

    // Adiciona o renderizador na div que irá comportar a aplicação
    document.getElementById("Mundo").appendChild(renderer.domElement);

    let camera = new THREE.PerspectiveCamera(
        45,                                         // Angulo de visão
        window.innerWidth / window.innerHeight,     // Razão de aspecto = Proporção da imagem
        0.1,                                        // Distancia minima do campo de visão
        1000                                        // Distancia máxima
    );
    camera.lookAt(0, 0, 0);
    camera.position.set(5, 15, 30);
    camera.up.set(0, 1, 0);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(25, 30, 20);
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.castShadow = true;
    spotLight.name = "spotLight";

    scene.add(spotLight);

    let ambientLight = new THREE.AmbientLight(0x343434);
    ambientLight.name = "ambientLight";
    scene.add(ambientLight);

    // Mostra os eixos
    let axes = new THREE.AxesHelper(12);
    axes.name = "AXES";
    axes.visible = true;
    scene.add(axes);

    // Plano central de apoio
    let planeGeometry = new THREE.PlaneGeometry(30, 30, 10, 10);
    let planeMaterial = new THREE.MeshPhongMaterial({
        color: "rgb(200,200,200)",
        side: THREE.DoubleSide,
    });
    let groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    groundPlane.receiveShadow = true;
    groundPlane.rotateX(THREE.Math.degToRad(-90));
    scene.add(groundPlane);

    // Mouse controla o zoom da câmera, rotação, deslocamento
    let orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 0, 0);
    orbitControls.minDistance = 25;         // Zoom máximo
    orbitControls.maxDistance = 100;        // Zoom minimo

    // Mesmo material para todos os objetos
    let objectMaterial = new THREE.MeshPhongMaterial({color: "rgb(255,120, 22)", side: THREE.DoubleSide});

    // Adiciona os sólidos em cena
    let objectArray = new Array();
    scene.add(criarPlano(8.0, 4.0));
    scene.add(criarBox(8.0, 4.0, 2.0));
    scene.add(criarEsfera(4.0, 64, 64));
    scene.add(criarCirculo(4.0, 32));
    scene.add(criarAnel(2.0, 4.0, 60, 1));
    scene.add(criarTetraedro(4.0));
    scene.add(criarOctaedro(4.0));
    scene.add(criarDodecaedro(4.0));
    scene.add(criarIcosaedro(4.0));

    // Ajuste na posição do cubo
    objectArray[1].position.y = 5;

    // Controle do cenário e seus objetos
    let controls = {
        // Eixo de coordenadas
        axes: true,

        // Physics
        animation: true,
        rotation: 0.015,
        color: "rgb(255,120, 22)",

        // Geometry
        mesh: objectArray[0],
        meshNumber: 0,
        radius: 10,
        type: "Plano",
        size: 1.0,

        chooseGeometry: function () {
            objectArray[this.meshNumber].visible = false;

            switch (this.type) {
                case "Plano":
                    this.meshNumber = 0;
                    break;
                case "Box":
                    this.meshNumber = 1;
                    break;
                case "Esfera":
                    this.meshNumber = 2;
                    break;
                case "Circulo":
                    this.meshNumber = 3;
                    break;
                case "Anel":
                    this.meshNumber = 4;
                    break;
                case "Tetraedro":
                    this.meshNumber = 5;
                    break;
                case "Octaedro":
                    this.meshNumber = 6;
                    break;
                case "Dodecaedro":
                    this.meshNumber = 7;
                    break;
                case "Icosaedro":
                    this.meshNumber = 8;
                    break;
            }
            objectArray[this.meshNumber].visible = true;
            this.mesh = objectArray[this.meshNumber];
        }
    };

    // GUI de controle e ajuste de valores específicos da geometria do objeto
    let gui = new dat.GUI();

    let guiFolder = gui.addFolder("Properties");
    guiFolder.open();       // Abre a pasta
    guiFolder.add(controls, "axes").listen().onChange(function(e) {
        if (controls.axes) {
            axes.visible = true;
        } else {
            axes.visible = false;
        }
    });
    guiFolder.add(controls, "animation").listen().onChange(function (e) {
        if (controls.animation) {
            controls.rotation = 0.015;
        } else {
            controls.rotation = 0;
        }
    });

    guiFolder.add(controls, "type", ["Plano", "Box", "Esfera", "Circulo", 
    "Anel", "Tetraedro", "Octaedro", "Dodecaedro", "Icosaedro"]).onChange(function (e) {
        controls.chooseGeometry();
    });

    controls.chooseGeometry(); // Atualiza a seleção da geometria

    // Plano
    function criarPlano(width, height) {
        let geometry = new THREE.PlaneGeometry(width, height);
        let object = new THREE.Mesh(geometry, objectMaterial);
        object.castShadow = true;
        object.position.set(0.0, 5.0, 0.0);
        object.visible = false;
        object.name = "Plano";
        objectArray.push(object);
        return object;
    }

    // 6 faces
    function criarBox(width, height, deep) {
        let geometry = new THREE.BoxGeometry(width, height, deep);  // Largura, altura e profundidade
        let object = new THREE.Mesh(geometry, objectMaterial);
        object.castShadow = true;
        object.position.set(0.0, height / 2.0, 0.0);
        object.visible = false;
        object.name = "Box";
        objectArray.push(object);
        return object;
    }

    // Esfera
    function criarEsfera(radius, widthSegments, heightSegments) {
        let geometry = new THREE.SphereGeometry(
            radius, 
            widthSegments,       // Numero de segmentos na largura  => Regula o fator "arredondado" da esfera
            heightSegments,     // Numero de segmentos na altura => Regula o fator "arredondado" da esfera
        );
        let object = new THREE.Mesh(geometry, objectMaterial);
        object.castShadow = true;
        object.position.set(0.0, 5.0, 0.0);
        object.visible = false;
        object.name = "Esfera";
        objectArray.push(object);
        return object;
    }

    // Circulo
    function criarCirculo(radius, segments) {
        let geometry = new THREE.CircleGeometry(
            radius, 
            segments,       // Numero de segmentos  => Regula o fator "arredondado" do circulo
        );
        let object = new THREE.Mesh(geometry, objectMaterial);
        object.castShadow = true;
        object.position.set(0.0, 5.0, 0.0);
        object.visible = false;
        object.name = "Circulo";
        objectArray.push(object);
        return object;
    }

    // Anel
    function criarAnel(innerRadius, outerRadius, thetaSegments, phiSegments) {
        let geometry = new THREE.RingGeometry(
            innerRadius,         // Raio interno
            outerRadius,         // Raio externo
            thetaSegments,       // Numero de segmentos da parte externa(minimo 3, padrao 8)  => Regula o fator "arredondado" da esfera
            phiSegments,         // Numero de segmentos(pequenas partições)
        );
        let object = new THREE.Mesh(geometry, objectMaterial);
        object.castShadow = true;
        object.position.set(0.0, 5.0, 0.0);
        object.visible = false;
        object.name = "Anel";
        objectArray.push(object);
        return object;
    }

    // 4 faces
    function criarTetraedro(radius) {
        let geometry = new THREE.TetrahedronGeometry(radius);
        let object = new THREE.Mesh(geometry, objectMaterial);
        object.castShadow = true;
        object.position.set(0.0, radius * 1.1, 0.0);
        object.visible = false;
        object.name = "Tetraedro";
        objectArray.push(object);
        return object;
    }

    // 8 faces
    function criarOctaedro(radius) {
        let geometry = new THREE.OctahedronGeometry(radius);    // Raio e detalhe(Quanto maior, mais vertices tem)
        let object = new THREE.Mesh(geometry, objectMaterial);
        object.castShadow = true;
        object.position.set(0.0, radius, 0.0);
        object.visible = false;
        object.name = "Octaedro";
        objectArray.push(object);
        return object;
    }

    // 12 faces
    function criarDodecaedro(radius) {
        let geometry = new THREE.DodecahedronGeometry(radius);
        let object = new THREE.Mesh(geometry, objectMaterial);
        object.castShadow = true;
        object.position.set(0.0, radius, 0.0);
        object.visible = false;
        object.name = "Dodecaedro";
        objectArray.push(object);
        return object;
    }

    // 20 faces
    function criarIcosaedro(radius) {
        let geometry = new THREE.IcosahedronGeometry(radius);
        let object = new THREE.Mesh(geometry, objectMaterial);
        object.castShadow = true;
        object.position.set(0.0, radius, 0.0);
        object.visible = false;
        object.name = "Icosaedro";
        objectArray.push(object);
        return object;
    }

    // Reajuste da renderização com base na mudança da janela
    function onResize() {
        // Atualiza o aspect da camera com relação as novas dimensões
        camera.aspect = window.innerWidth / window.innerHeight; 
        // Atualiza a matriz de projeção
        camera.updateProjectionMatrix(); 
        // Define os novos valores para o renderizador
        renderer.setSize(window.innerWidth, window.innerHeight); 
    }

    window.addEventListener("resize", onResize, false); // Escuta os eventos de resize

    // Controla o looping de animação
    renderer.setAnimationLoop(animation);

    function animation(time) {
        // Atualiza o posicionamento da camera
        orbitControls.update();

        // Rotaciona o sólido selecionado
        controls.mesh.rotation.x += controls.rotation;
        controls.mesh.rotation.y += controls.rotation;
        controls.mesh.rotation.z += controls.rotation;
        
        // Desenha na tela
        renderer.render(scene, camera);
    }
}