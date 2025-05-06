import {
    CylinderGeometry,
    DirectionalLight,
    HemisphereLight,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    Color,
    Raycaster,
    Vector2,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Pipe 3D View Class MAnager
class SceneManager {
    private scene: Scene;
    private camera: PerspectiveCamera;
    private renderer: WebGLRenderer;
    private controls: OrbitControls;
    private raycaster: Raycaster;
    private mouse: Vector2;
    private tube: Mesh;
    private label: HTMLDivElement;

    constructor(private canvas: HTMLCanvasElement) {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, 1, 0.1, 1000); // Setup inital camera view
        this.raycaster = new Raycaster();
        this.mouse = new Vector2();
        
        this.initCamera();
        this.createTube();
        this.setupLights();
        this.setupRenderer();
        this.setupControls();
        this.createLabel();
        this.setupEventListeners();
        this.startAnimationLoop();
    }

    private initCamera(): void {
        this.camera.position.z = 5;
    }

    private createTube(): void {
        const geometry = new CylinderGeometry(1, 1, 2, 32, 1, true);
        const material = new MeshStandardMaterial({
            transparent: true,
            opacity: 0.6,
            color: 0xf68067,
            metalness: 0.13,
            side: 2,
        });

        this.tube = new Mesh(geometry, material);
        this.tube.rotation.x = Math.PI / 2;
        this.tube.rotation.z = Math.PI / 6;
        this.tube.rotation.y = Math.PI / 6;
        this.scene.add(this.tube);
        this.tube.scale.set(1, 1, 1);
    }

    // White light and white background
    private setupLights(): void {
        const directionalLight = new DirectionalLight(0xffffff);
        directionalLight.position.set(-10, 10, -10).normalize();
        this.scene.add(directionalLight);

        const hemisphereLight = new HemisphereLight(0xffffff, 0xffffff);
        hemisphereLight.position.set(1, 1, 1);
        this.scene.add(hemisphereLight);

        this.scene.background = new Color().setHex(0xffffff);
    }

    // Display scene render
    private setupRenderer(): void {
        this.renderer = new WebGLRenderer({
            antialias: true,
            canvas: this.canvas
        });
        this.resize();
    }

    private setupControls(): void {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.maxDistance = 10;
    }

    private createLabel(): void {
        this.label = document.createElement('div');
        this.label.style.position = 'absolute';
        this.label.style.backgroundColor = '#fff';
        this.label.style.padding = '4px 8px';
        this.label.style.border = '1px solid #ccc';
        this.label.style.borderRadius = '4px';
        this.label.style.pointerEvents = 'none';
        this.label.style.display = 'none';
        document.body.appendChild(this.label);
    }

    private setupEventListeners(): void {
        this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
        this.canvas.addEventListener('mouseleave', () => {
            this.label.style.display = 'none';
        });
    }

    private startAnimationLoop(): void {
        const animate = () => {
            requestAnimationFrame(animate);
            this.controls.update();
            this.resize();
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    private resize(): void {
        const { clientWidth, clientHeight } = this.canvas;
        this.renderer.setSize(clientWidth, clientHeight);
        this.camera.aspect = clientWidth / clientHeight;
        this.camera.updateProjectionMatrix();
    }

    // Display custom coords and labels
    private onMouseMove(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();

        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObject(this.tube);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            const { x, y, z } = intersect.point;
            
            this.label.style.left = `${event.clientX}px`;
            this.label.style.top = `${event.clientY}px`;
            this.label.style.display = 'block';
            this.label.innerHTML = `
                <b>X</b> ${x.toFixed(3)} <b>Y</b> ${y.toFixed(3)}  <b>Z</b> ${z.toFixed(3)}
                <br>                
                <i class="fa-solid fa-temperature-half text-info me-1"></i><b>Temp</b> ${this.getRandomIntInclusive(20, 23)}°
                <br>
                <i class="fa-solid fa-droplet text-info me-1"></i><b>Hum</b> ${this.getRandomIntInclusive(30, 35)}%`;
        } else {
            this.label.style.display = 'none';
        }
    }

    // TODO: remove
    private getRandomIntInclusive(min: number, max: number): number {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

    public resetPosition(): void {
        this.controls.reset();
    }
}

export const createScene = (el: HTMLCanvasElement) => {
    return new SceneManager(el);
};