 
  class YunTu {
    constructor(){
        this.init()
        this.rotationSpeed=0.2
    }

    init(){
        this.get_dom()
        this.init_scene()
        this.init_camera()
        this.init_render()
        this.start_render()
        this.on_resize()
        this.init_mouse_control()
        this.add_box()
    }

    get_dom(){
        this.dom = document.getElementById('webgl')
        this.size = {
            width: this.dom.clientWidth,
            height: this.dom.clientHeight,
        };
    }

    init_scene(){
        this.scene = new THREE.Scene();
    }

    init_camera(){
        const { width, height } = this.size;
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100000);
        this.camera.position.set(37.05153270423892, 161.17531084718553, 258.35751388362866);
        this.camera.rotation.set(-0.3849588417545965, -0.07204303525066746, -0.029156464042305794);
    }

    init_render(){
        const { width, height } = this.size;
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(new THREE.Color(0, 0, 0), 1);
        this.dom.appendChild(this.renderer.domElement);
    }

    start_render() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.start_render.bind(this));
    }

    on_resize() {
        const resizeFun = () => {
            this.get_dom();
            const { width, height } = this.size;
            this.renderer.setSize(width, height);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', resizeFun, false);
    }

    init_mouse_control() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; // 开启惯性
        this.controls.dampingFactor = 0.8;
    }

    add_box(){
        const geometry = new THREE.Geometry()
        
    }
}


const yuntu = new YunTu()

const gui = new dat.GUI();
gui.add(yuntu, 'rotationSpeed', 0, 0.5);

export default yuntu

