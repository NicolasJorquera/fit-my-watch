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


@Component({
  selector: 'app-watch-preview',
  templateUrl: './three-viewer.component.html',
})
export class ThreeViewerComponent implements AfterViewInit, OnChanges {
  @ViewChild('threeCanvas', { static: true }) canvasRef!: ElementRef;

  @Input() width: number = 40;
  @Input() height: number = 50;
  @Input() thickness: number = 10;
  @Input() strapWidth: number = 20;
  @Input() shape: 'round' | 'square' = 'round';

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private reloj!: THREE.Mesh;
  private correa!: THREE.Mesh;
  private wrist!: THREE.Mesh;
  private controls!: OrbitControls;

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
    }
  }

  private initThreeJS() {
    if (typeof window === 'undefined') {
      return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      // limit camera/canvas size to parent element
      this.canvasRef.nativeElement.offsetWidth / this.canvasRef.nativeElement.offsetHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.canvasRef.nativeElement.appendChild(this.renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    this.scene.add(light);

    this.camera.position.z = 200;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  private createWrist() {
    const wristGeometry = new THREE.CylinderGeometry(30, 30, 60, 32);
    const wristMaterial = new THREE.MeshStandardMaterial({ color: 0xf1c27d });
    this.wrist = new THREE.Mesh(wristGeometry, wristMaterial);
    this.wrist.rotation.z = Math.PI / 2;
    this.scene.add(this.wrist);

  }

  private createWatch() {
    if (this.reloj) this.scene.remove(this.reloj);
    if (this.correa) this.scene.remove(this.correa);

    let relojGeometry: THREE.BufferGeometry;
    if (this.shape === 'square') {
      relojGeometry = new THREE.BoxGeometry(
        this.width,
        this.thickness,
        this.height
      );
    } else {
      relojGeometry = new THREE.CylinderGeometry(
        this.width / 2,
        this.width / 2,
        this.thickness,
        32
      );
    }

    const relojMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    this.reloj = new THREE.Mesh(relojGeometry, relojMaterial);
    this.reloj.position.set(0, this.thickness / 2 + 30, 0);
    this.scene.add(this.reloj);

    const strapGeometry = new THREE.BoxGeometry(
      this.strapWidth,
      2,
      this.height + 20
    );
    const strapMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    this.correa = new THREE.Mesh(strapGeometry, strapMaterial);
    this.correa.position.set(0, 30, 0);
    this.scene.add(this.correa);
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
