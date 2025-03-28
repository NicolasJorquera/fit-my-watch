import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ModelService } from '../../services/model.service';

@Component({
  selector: 'app-watch-preview',
  templateUrl: './three-viewer.component.html',
})
export class ThreeViewerComponent implements AfterViewInit, OnChanges {
  @ViewChild('threeCanvas', { static: true }) canvasRef!: ElementRef;

  @Input() watch_width: number = 34;
  @Input() watch_height: number = 40;
  @Input() watch_thickness: number = 10;
  @Input() strap_width: number = 20;
  @Input() watch_shape: 'round' | 'square' = 'round';
  @Input() wrist_size: number = 180;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private watch!: THREE.Mesh;
  private strap!: THREE.Mesh;
  private wrist!: THREE.Mesh;
  private controls!: OrbitControls;

  constructor(private modelService: ModelService) {
    this.modelService.modelParameters$.subscribe((parameters) => {
      console.log(parameters);
      this.watch_width = parameters.watch_width;
      this.watch_height = parameters.watch_height;
      this.watch_thickness = parameters.watch_thickness;
      this.strap_width = parameters.strap_width;
      this.watch_shape = parameters.watch_shape;
      this.wrist_size = parameters.wrist_size;
      this.updateCanvasSize();
      this.createWatch();
    });
  }

  ngAfterViewInit() {
    this.initThreeJS();
    this.createWrist();
    this.createWatch();
    this.animate();

    this.updateCanvasSize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.scene) {
      this.createWatch();
    } else {
      this.initThreeJS();
    }
  }

  private initThreeJS() {
    if (typeof window === 'undefined') {
      console.warn('ThreeViewerComponent.initThreeJS: window is undefined');
      return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      // limit camera/canvas size to parent element
      this.canvasRef.nativeElement.offsetWidth /
        this.canvasRef.nativeElement.offsetHeight,
      0.1,
      1000
    );

    this.scene.background = new THREE.Color(0x97d9ff);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.canvasRef.nativeElement.offsetWidth, this.canvasRef.nativeElement.offsetWidth / 2);

    this.canvasRef.nativeElement.appendChild(this.renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    this.scene.add(light);

    this.camera.position.z = 200;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  private createWrist() {
    const wrist_radius = this.wrist_size / (Math.PI * 2);
    const wristGeometry = new THREE.CylinderGeometry(
      wrist_radius * 1.2,
      wrist_radius,
      200,
      32
    );
    const wristMaterial = new THREE.MeshStandardMaterial({ color: 0xf1c27d });
    this.wrist = new THREE.Mesh(wristGeometry, wristMaterial);
    this.wrist.rotation.z = Math.PI / 2;
    this.wrist.position.set(-45, -wrist_radius, 0);
    this.scene.add(this.wrist);
  }

  private createWatch() {
    if (this.watch) this.scene.remove(this.watch);
    if (this.strap) this.scene.remove(this.strap);

    let watchGeometry: THREE.BufferGeometry;
    if (this.watch_shape === 'square') {
      watchGeometry = new THREE.BoxGeometry(
        this.watch_width,
        this.watch_thickness,
        this.watch_height
      );
    } else {
      watchGeometry = new THREE.CylinderGeometry(
        this.watch_width / 2,
        this.watch_width / 2,
        this.watch_thickness,
        32
      );
    }

    const wrist_radius = this.wrist_size / (Math.PI * 2);

    const watchMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    this.watch = new THREE.Mesh(watchGeometry, watchMaterial);
    this.watch.position.set(0, this.watch_thickness / 2, 0); // position the watch above the wrist
    this.scene.add(this.watch);

    const strap_length = this.wrist_size;

    const strapGeometry = new THREE.BoxGeometry(
      this.strap_width,
      2,
      this.watch_height + strap_length
    );
    const strapMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    this.strap = new THREE.Mesh(strapGeometry, strapMaterial);
    this.strap.position.set(0, 0, 0);
    this.scene.add(this.strap);
  }

  private updateCanvasSize() {
    const canvasElement = this.canvasRef.nativeElement;
    const width = canvasElement.clientWidth;
    const height = canvasElement.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
