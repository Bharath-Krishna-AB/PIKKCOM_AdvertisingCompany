"use client"
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform, Raycast, Vec2 } from 'ogl';
import { useEffect, useRef } from 'react';
import { DemoItem } from './CircularDemo';

type GL = Renderer['gl'];

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
    let timeout: number;
    return function (this: any, ...args: Parameters<T>) {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => func.apply(this, args), wait);
    };
}

function lerp(p1: number, p2: number, t: number): number {
    return p1 + (p2 - p1) * t;
}

function autoBind(instance: any): void {
    const proto = Object.getPrototypeOf(instance);
    Object.getOwnPropertyNames(proto).forEach(key => {
        if (key !== 'constructor' && typeof instance[key] === 'function') {
            instance[key] = instance[key].bind(instance);
        }
    });
}

function createCardTexture(
    gl: GL,
    item: DemoItem,
): { texture: Texture; textureHover: Texture; width: number; height: number; buttonBounds: { x: number; y: number; w: number; h: number } } {
    // Create separate canvas for normal state
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2d context');

    // Create separate canvas for hover state
    const canvasHover = document.createElement('canvas');
    const contextHover = canvasHover.getContext('2d');
    if (!contextHover) throw new Error('Could not get 2d context hover');

    // High resolution canvas for sharp text
    const width = 600;
    const height = 800;
    canvas.width = width;
    canvas.height = height;
    canvasHover.width = width;
    canvasHover.height = height;

    const texture = new Texture(gl, { generateMipmaps: true });
    const textureHover = new Texture(gl, { generateMipmaps: true });
    let buttonBounds = { x: 0, y: 0, w: 0, h: 0 };

    // Function to draw the card content
    const draw = (
        targetCanvas: HTMLCanvasElement,
        targetCtx: CanvasRenderingContext2D,
        targetTexture: Texture,
        isHover: boolean,
        image?: HTMLImageElement
    ) => {
        // Clear
        targetCtx.clearRect(0, 0, width, height);

        // Draw Background
        targetCtx.fillStyle = item.type === 'green' ? '#703EFF' : item.type === 'black' ? '#0f0f0f' : '#ffffff';
        targetCtx.beginPath();
        targetCtx.roundRect(0, 0, width, height, 40);
        targetCtx.fill();

        // Text configuration
        const isDark = item.type === 'black';
        const textColor = isDark ? '#ffffff' : '#2D2D2D';
        const subTextColor = isDark ? '#a0a0a0' : '#555555';
        const accentColor = item.type === 'green' ? '#1a1a1a' : '#703EFF';

        // 1. Draw Badge (Product Name)
        if (item.badge) {
            targetCtx.save();
            targetCtx.font = '600 24px "Clash Display", sans-serif';
            targetCtx.fillStyle = isDark ? accentColor : '#2D2D2D';
            targetCtx.textAlign = 'left';
            targetCtx.textBaseline = 'top';
            targetCtx.fillText(item.badge, 40, 40);
            targetCtx.restore();
        }

        // 2. Draw Title
        targetCtx.save();
        targetCtx.font = '700 60px "Anton", sans-serif';
        targetCtx.fillStyle = textColor;
        targetCtx.textAlign = 'left';
        const lines = item.title.split('\n');
        let yPos = 120;
        lines.forEach(line => {
            targetCtx.fillText(line.toUpperCase(), 40, yPos);
            yPos += 70;
        });
        targetCtx.restore();

        // 3. Draw Description
        targetCtx.save();
        targetCtx.font = '400 28px "Figtree", sans-serif';
        targetCtx.fillStyle = subTextColor;
        targetCtx.textAlign = 'left';
        const descLines = item.description.split('\n');
        yPos += 20;
        descLines.forEach(line => {
            targetCtx.fillText(line, 40, yPos);
            yPos += 35;
        });
        targetCtx.restore();

        // 4. Draw Content
        if (!isHover) {
            // Normal State: Draw Image
            if (image) {
                targetCtx.save();
                const imgY = yPos + 40;
                const imgH = height - imgY - 40;
                const imgW = width - 80;

                if (imgH > 0) {
                    targetCtx.beginPath();
                    targetCtx.roundRect(40, imgY, imgW, imgH, 20);
                    targetCtx.clip();

                    const imgAspect = image.width / image.height;
                    const areaAspect = imgW / imgH;
                    let drawW, drawH, drawX, drawY;

                    if (imgAspect > areaAspect) {
                        drawH = imgH;
                        drawW = imgH * imgAspect;
                        drawX = 40 + (imgW - drawW) / 2;
                        drawY = imgY;
                    } else {
                        drawW = imgW;
                        drawH = imgW / imgAspect;
                        drawX = 40;
                        drawY = imgY + (imgH - drawH) / 2;
                    }
                    targetCtx.drawImage(image, drawX, drawY, drawW, drawH);
                }
                targetCtx.restore();
            } else {
                // Placeholder
                targetCtx.save();
                const imgY = yPos + 40;
                const imgH = height - imgY - 40;
                if (imgH > 0) {
                    targetCtx.fillStyle = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                    targetCtx.beginPath();
                    targetCtx.roundRect(40, imgY, width - 80, imgH, 20);
                    targetCtx.fill();
                }
                targetCtx.restore();
            }
        } else {
            // Hover State: Draw Button 
            const btnY = yPos + 60;
            const btnX = 40;
            const btnH = 60;

            targetCtx.save();

            // 1. Setup Font & Measure Text
            targetCtx.font = '700 20px "Figtree", sans-serif';
            const safeText = item.text || '';
            const textStr = `Explore ${safeText}`;
            const metrics = targetCtx.measureText(textStr);
            const textWidth = metrics ? metrics.width : 100;

            // 2. Calculate Dynamic Width
            // padding-left (30) + text + gap (10) + arrow (20) + padding-right (30)
            let btnW = 30 + textWidth + 10 + 20 + 30;
            if (!btnW || isNaN(btnW)) btnW = 220; // Fallback

            // 3. Draw Button Pill
            targetCtx.fillStyle = isDark ? '#ffffff' : '#0f0f0f';
            targetCtx.beginPath();
            targetCtx.roundRect(btnX, btnY, btnW, btnH, 30);
            targetCtx.fill();

            // 4. Draw Button Text
            targetCtx.fillStyle = isDark ? '#0f0f0f' : '#ffffff';
            targetCtx.textAlign = 'left';
            targetCtx.textBaseline = 'middle';
            targetCtx.fillText(textStr, btnX + 30, btnY + btnH / 2);

            // 5. Draw Arrow
            targetCtx.font = '20px sans-serif';
            targetCtx.fillText("↗", btnX + 30 + textWidth + 10, btnY + btnH / 2 + 1);

            targetCtx.restore();

            // Store bounds
            buttonBounds = { x: btnX, y: btnY, w: btnW, h: btnH };
        }

        // Upload to texture
        targetTexture.image = targetCanvas;
        if ((targetTexture as any).needsUpdate !== undefined) (targetTexture as any).needsUpdate = true;
    }

    // Initial draw
    draw(canvas, context, texture, false);
    draw(canvasHover, contextHover, textureHover, true);

    // Load Image
    if (item.image) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = item.image;
        img.onload = () => {
            // Only redraw normal texture with image
            draw(canvas, context, texture, false, img);
        };
    }

    return { texture, textureHover, width, height, buttonBounds };
}

interface ScreenSize {
    width: number;
    height: number;
}

interface Viewport {
    width: number;
    height: number;
}

interface MediaProps {
    geometry: Plane;
    gl: GL;
    item: DemoItem;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: ScreenSize;
    viewport: Viewport;
    bend: number;
    borderRadius?: number;
}

class Media {
    extra: number = 0;
    geometry: Plane;
    gl: GL;
    item: DemoItem;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: ScreenSize;
    viewport: Viewport;
    bend: number;
    borderRadius: number;
    program!: Program;
    plane!: Mesh;
    scale!: number;
    padding!: number;
    width!: number;
    widthTotal!: number;
    x!: number;
    speed: number = 0;
    isBefore: boolean = false;
    isAfter: boolean = false;
    hoverTarget: number = 0;
    hoverCurrent: number = 0;
    buttonBounds!: { x: number; y: number; w: number; h: number };

    constructor({
        geometry,
        gl,
        item,
        index,
        length,
        renderer,
        scene,
        screen,
        viewport,
        bend,
        borderRadius = 0,
    }: MediaProps) {
        this.geometry = geometry;
        this.gl = gl;
        this.item = item;
        this.index = index;
        this.length = length;
        this.renderer = renderer;
        this.scene = scene;
        this.screen = screen;
        this.viewport = viewport;
        this.bend = bend;
        this.borderRadius = borderRadius;
        this.createShader();
        this.createMesh();
        this.onResize();
    }

    createShader() {
        const { texture, textureHover, buttonBounds } = createCardTexture(this.gl, this.item);
        this.buttonBounds = buttonBounds;

        this.program = new Program(this.gl, {
            depthTest: false,
            depthWrite: false,
            vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
            fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform sampler2D tHoverMap;
        uniform float uHover;
        varying vec2 vUv;
        
        void main() {
          vec4 t1 = texture2D(tMap, vUv);
          vec4 t2 = texture2D(tHoverMap, vUv);
          gl_FragColor = mix(t1, t2, uHover);
        }
      `,
            uniforms: {
                tMap: { value: texture },
                tHoverMap: { value: textureHover },
                uHover: { value: 0 },
                uSpeed: { value: 0 },
                uTime: { value: 0 }
            },
            transparent: true
        });
    }

    createMesh() {
        this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        });
        (this.plane as any).media = this; // Link for raycast
        this.plane.setParent(this.scene);
    }

    update(scroll: { current: number; last: number }, direction: 'right' | 'left') {
        this.plane.position.x = this.x - scroll.current - this.extra;

        const x = this.plane.position.x;
        const H = this.viewport.width / 2;

        if (this.bend === 0) {
            this.plane.position.y = 0;
            this.plane.rotation.z = 0;
        } else {
            const B_abs = Math.abs(this.bend);
            const R = (H * H + B_abs * B_abs) / (2 * B_abs);
            const effectiveX = Math.min(Math.abs(x), H);

            const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
            if (this.bend > 0) {
                this.plane.position.y = -arc;
                this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
            } else {
                this.plane.position.y = arc;
                this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
            }
        }

        this.speed = scroll.current - scroll.last;
        this.program.uniforms.uSpeed.value = this.speed;

        // Tween Hover
        this.hoverCurrent = lerp(this.hoverCurrent, this.hoverTarget, 0.1);
        this.program.uniforms.uHover.value = this.hoverCurrent;

        const planeOffset = this.plane.scale.x / 2;
        const viewportOffset = this.viewport.width / 2;
        this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
        this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
        if (direction === 'right' && this.isBefore) {
            this.extra -= this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
        if (direction === 'left' && this.isAfter) {
            this.extra += this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
    }

    onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
        if (screen) this.screen = screen;
        if (viewport) {
            this.viewport = viewport;
        }
        // Scale so that card width is approx 40% of screen width (roughly 2.5 cards visible, allowing for margins/gaps)
        // 600 is base card width
        this.scale = (this.screen.width * 0.4) / 800;

        // Make cards portrait: taller than wide
        this.plane.scale.y = (this.viewport.height * (800 * this.scale)) / this.screen.height;
        this.plane.scale.x = (this.viewport.width * (600 * this.scale)) / this.screen.width;

        this.padding = 2;
        this.width = this.plane.scale.x + this.padding;
        this.widthTotal = this.width * this.length;
        this.x = this.width * this.index;
    }
}

interface AppConfig {
    items?: DemoItem[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    font?: string;
    scrollSpeed?: number;
    scrollEase?: number;
}

class App {
    container: HTMLElement;
    scrollSpeed: number;
    scroll: {
        ease: number;
        current: number;
        target: number;
        last: number;
        position?: number;
    };
    onCheckDebounce: (...args: any[]) => void;
    renderer!: Renderer;
    gl!: GL;
    camera!: Camera;
    scene!: Transform;
    planeGeometry!: Plane;
    medias: Media[] = [];
    items: DemoItem[] = [];
    screen!: { width: number; height: number };
    viewport!: { width: number; height: number };
    raf: number = 0;

    raycast!: Raycast;
    mouse!: Vec2;

    boundOnResize!: () => void;
    boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
    boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
    boundOnTouchUp!: () => void;
    boundOnMouseMove!: (e: MouseEvent) => void;
    boundOnClick!: (e: MouseEvent) => void;

    isDown: boolean = false;
    start: number = 0;

    constructor(
        container: HTMLElement,
        {
            items,
            bend = 1,
            borderRadius = 0,
            scrollSpeed = 2,
            scrollEase = 0.05
        }: AppConfig
    ) {
        document.documentElement.classList.remove('no-js');
        this.container = container;
        this.scrollSpeed = scrollSpeed;
        this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
        this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();
        this.createGeometry();
        this.createMedias(items || [], bend, borderRadius);

        this.raycast = new Raycast();
        this.mouse = new Vec2();

        this.update();
        this.addEventListeners();
    }

    createRenderer() {
        this.renderer = new Renderer({
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio || 1, 2)
        });
        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 0);
        this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
    }

    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = 45;
        this.camera.position.z = 20;
    }

    createScene() {
        this.scene = new Transform();
    }

    createGeometry() {
        this.planeGeometry = new Plane(this.gl, {
            heightSegments: 50,
            widthSegments: 100
        });
    }

    createMedias(
        items: DemoItem[],
        bend: number = 1,
        borderRadius: number,
    ) {
        this.items = items;
        // console.log("Creating medias with items", items); 
        this.medias = this.items.map((item, index) => {
            return new Media({
                geometry: this.planeGeometry,
                gl: this.gl,
                item,
                index,
                length: this.items.length,
                renderer: this.renderer,
                scene: this.scene,
                screen: this.screen,
                viewport: this.viewport,
                bend,
                borderRadius,
            });
        });
    }

    onTouchDown(e: MouseEvent | TouchEvent) {
        this.isDown = true;
        this.scroll.position = this.scroll.current;
        this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;
    }

    onTouchMove(e: MouseEvent | TouchEvent) {
        if (!this.isDown) return;
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const distance = (this.start - x) * (this.scrollSpeed * 0.025);
        this.scroll.target = (this.scroll.position ?? 0) + distance;
    }

    onTouchUp() {
        this.isDown = false;
        this.onCheck();
    }

    onCheck() {
        if (!this.medias || !this.medias[0]) return;
        const width = this.medias[0].width;
        const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
        const item = width * itemIndex;
        this.scroll.target = this.scroll.target < 0 ? -item : item;
    }

    onResize() {
        this.screen = {
            width: this.container.clientWidth,
            height: this.container.clientHeight
        };
        this.renderer.setSize(this.screen.width, this.screen.height);
        this.camera.perspective({
            aspect: this.screen.width / this.screen.height
        });
        const fov = (this.camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;
        this.viewport = { width, height };
        if (this.medias) {
            this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
        }
    }

    update() {
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
        const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
        if (this.medias) {
            this.medias.forEach(media => media.update(this.scroll, direction));
        }
        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.scroll.last = this.scroll.current;
        this.raf = window.requestAnimationFrame(this.update.bind(this));
    }

    addEventListeners() {
        this.boundOnResize = this.onResize.bind(this);
        this.boundOnTouchDown = this.onTouchDown.bind(this);
        this.boundOnTouchMove = this.onTouchMove.bind(this);
        this.boundOnTouchUp = this.onTouchUp.bind(this);
        this.boundOnMouseMove = this.onMouseMove.bind(this);
        this.boundOnClick = this.onClick.bind(this);

        window.addEventListener('resize', this.boundOnResize);
        window.addEventListener('mousedown', this.boundOnTouchDown);
        window.addEventListener('mousemove', this.boundOnTouchMove); // Drag
        window.addEventListener('mouseup', this.boundOnTouchUp);
        window.addEventListener('touchstart', this.boundOnTouchDown);
        window.addEventListener('touchmove', this.boundOnTouchMove);
        window.addEventListener('touchend', this.boundOnTouchUp);

        // Interaction listeners (Hover/Click)
        window.addEventListener('mousemove', this.boundOnMouseMove);
        window.addEventListener('click', this.boundOnClick);
    }

    onMouseMove(e: MouseEvent) {
        if (!this.renderer || !this.medias) return;

        // Update mouse position for raycast (normalized -1 to 1)
        const bounds = this.container.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const x = (mouseX / bounds.width) * 2 - 1;
        const y = -(mouseY / bounds.height) * 2 + 1; // Invert Y
        this.mouse.set(x, y);

        this.raycast.castMouse(this.camera, this.mouse);
        const hits = this.raycast.intersectBounds(this.medias.map(m => m.plane)) as any[];

        // Reset all
        this.medias.forEach(m => m.hoverTarget = 0);
        this.container.style.cursor = 'grab';

        if (hits && hits.length > 0) {
            const hitMesh = hits[0];
            const media = (hitMesh as any).media;
            if (media) {
                // Always show hover effect for the card
                media.hoverTarget = 1;

                // Only show pointer if over the button
                // Check detailed intersection for UVs
                const detailedHits = this.raycast.intersectMeshes([hitMesh]) as any[];

                if (detailedHits && detailedHits.length > 0) {
                    const hit = detailedHits[0];
                    // UV (0,0) is bottom-left, Canvas (0,0) is top-left
                    // Canvas Y = (1 - uv.y) * 800
                    if (hit.hit && hit.hit.uv) {
                        const cx = hit.hit.uv.x * 600;
                        const cy = (1 - hit.hit.uv.y) * 800;
                        const b = media.buttonBounds;
                        if (cx >= b.x && cx <= b.x + b.w && cy >= b.y && cy <= b.y + b.h) {
                            this.container.style.cursor = 'pointer';
                        }
                    }
                }
            }
        }

        if (this.isDown) this.container.style.cursor = 'grabbing';
    }

    onClick(e: MouseEvent) {
        if (this.isDown) return;

        const bounds = this.container.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const x = (mouseX / bounds.width) * 2 - 1;
        const y = -(mouseY / bounds.height) * 2 + 1;

        this.mouse.set(x, y);
        this.raycast.castMouse(this.camera, this.mouse);
        const hits = this.raycast.intersectBounds(this.medias.map(m => m.plane)) as any[];

        if (hits && hits.length > 0) {
            const hitMesh = hits[0];
            const media = (hitMesh as any).media;
            if (media && media.item.link) {
                // Check detailed button bounds
                const detailedHits = this.raycast.intersectMeshes([hitMesh]) as any[];
                if (detailedHits && detailedHits.length > 0) {
                    const hit = detailedHits[0];
                    console.log('Click detected on mesh, checking UVs...', hit);

                    if (hit.hit && hit.hit.uv) {
                        const cx = hit.hit.uv.x * 600;
                        const cy = (1 - hit.hit.uv.y) * 800;
                        const b = media.buttonBounds;

                        console.log('Click UV:', hit.hit.uv);
                        console.log('Calculated (cx, cy):', cx, cy);
                        console.log('Button Bounds:', b);
                        console.log('Link:', media.item.link);

                        if (cx >= b.x && cx <= b.x + b.w && cy >= b.y && cy <= b.y + b.h) {
                            console.log('Button click confirmed! Redirecting to:', media.item.link);
                            window.location.href = media.item.link;
                        } else {
                            console.log('Click outside button bounds.');
                        }
                    } else {
                        console.log('No UV on hit result', hit);
                    }
                }
            }
        }
    }

    destroy() {
        window.cancelAnimationFrame(this.raf);
        window.removeEventListener('resize', this.boundOnResize);
        window.removeEventListener('mousedown', this.boundOnTouchDown);
        window.removeEventListener('mousemove', this.boundOnTouchMove);
        window.removeEventListener('mouseup', this.boundOnTouchUp);
        window.removeEventListener('touchstart', this.boundOnTouchDown);
        window.removeEventListener('touchmove', this.boundOnTouchMove);
        window.removeEventListener('touchend', this.boundOnTouchUp);

        window.removeEventListener('mousemove', this.boundOnMouseMove);
        window.removeEventListener('click', this.boundOnClick);

        if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
            this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
        }
    }
}

interface CircularGalleryProps extends AppConfig {
    items?: DemoItem[];
}

export default function CircularDemoRenderer({
    items,
    bend = 1,
    textColor = '#ffffff',
    borderRadius = 0.05,
    font = 'bold 20px Figtree',
    scrollSpeed = 2,
    scrollEase = 0.1
}: CircularGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!containerRef.current) return;
        const app = new App(containerRef.current, {
            items,
            bend,
            textColor,
            borderRadius,
            font,
            scrollSpeed,
            scrollEase
        });
        return () => {
            app.destroy();
        };
    }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);
    return <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} />;
}
