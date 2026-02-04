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
): { texture: Texture; textureHover: Texture; width: number; height: number } {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2d context');

    // High resolution canvas for sharp text
    const width = 600;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    const texture = new Texture(gl, { generateMipmaps: true });
    const textureHover = new Texture(gl, { generateMipmaps: true });

    // Function to draw the card content
    const draw = (targetTexture: Texture, isHover: boolean, image?: HTMLImageElement) => {
        // Clear
        context.clearRect(0, 0, width, height);

        // Draw Background
        context.fillStyle = item.type === 'green' ? '#703EFF' : item.type === 'black' ? '#0f0f0f' : '#ffffff';
        // Rounded rect for the background
        context.beginPath();
        context.roundRect(0, 0, width, height, 40);
        context.fill();

        // Text configuration
        const isDark = item.type === 'black';
        const textColor = isDark ? '#ffffff' : '#2D2D2D';
        const subTextColor = isDark ? '#a0a0a0' : '#555555';
        const accentColor = item.type === 'green' ? '#1a1a1a' : '#703EFF';

        // 1. Draw Badge (Product Name) - Top Left
        if (item.badge) {
            context.save();
            context.font = '600 24px "Clash Display", sans-serif';
            context.fillStyle = isDark ? accentColor : '#2D2D2D';
            context.textAlign = 'left';
            context.textBaseline = 'top';
            context.fillText(item.badge, 40, 40);
            context.restore();
        }

        // 2. Draw Title (Tagline) - Large, Upper Middle
        context.save();
        context.font = '700 60px "Anton", sans-serif';
        context.fillStyle = textColor;
        context.textAlign = 'left';
        const lines = item.title.split('\n');
        let yPos = 120; // Start lower to clear badge
        lines.forEach(line => {
            context.fillText(line.toUpperCase(), 40, yPos);
            yPos += 70;
        });
        context.restore();

        // 3. Draw Description - Below Title
        context.save();
        context.font = '400 28px "Figtree", sans-serif';
        context.fillStyle = subTextColor;
        context.textAlign = 'left';
        const descLines = item.description.split('\n');
        yPos += 20; // Gap
        descLines.forEach(line => {
            context.fillText(line, 40, yPos);
            yPos += 35;
        });
        context.restore();

        // 4. Draw Content (Image OR Button)
        if (!isHover) {
            // Normal State: Draw Image
            if (image) {
                context.save();
                const imgY = yPos + 40;
                const imgH = height - imgY - 40;
                const imgW = width - 80;

                if (imgH > 0) {
                    context.beginPath();
                    context.roundRect(40, imgY, imgW, imgH, 20);
                    context.clip();

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
                    context.drawImage(image, drawX, drawY, drawW, drawH);
                }
                context.restore();
            } else {
                // Placeholder
                context.save();
                const imgY = yPos + 40;
                const imgH = height - imgY - 40;
                if (imgH > 0) {
                    context.fillStyle = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                    context.beginPath();
                    context.roundRect(40, imgY, width - 80, imgH, 20);
                    context.fill();
                }
                context.restore();
            }

            // B. Draw Overlay if Hover
            if (isHover) {
                // Dark overlay
                context.fillStyle = 'rgba(0, 0, 0, 0.6)';
                context.fillRect(40, imgY, imgW, imgH);

                // "Explore" Text
                context.fillStyle = '#ffffff';
                context.font = '700 32px "Figtree", sans-serif';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText("EXPLORE", 40 + imgW / 2, imgY + imgH / 2);

                // Arrow below text
                context.font = '32px sans-serif'; // Unicode arrow
                context.fillText("↗", 40 + imgW / 2, imgY + imgH / 2 + 40);
            }
        } else {
            // Hover State: Draw Button 
            // Position button where image would start
            const btnY = yPos + 60;
            const btnX = 40;
            const btnH = 60;
            const btnW = 220; // Approx

            context.save();
            // Button Pill
            context.fillStyle = isDark ? '#ffffff' : '#0f0f0f';
            context.beginPath();
            context.roundRect(btnX, btnY, btnW, btnH, 30);
            context.fill();

            // Button Text
            context.fillStyle = isDark ? '#0f0f0f' : '#ffffff';
            context.font = '700 20px "Figtree", sans-serif';
            context.textAlign = 'left';
            context.textBaseline = 'middle';
            context.fillText(`Explore ${item.text}`, btnX + 30, btnY + btnH / 2);

            // Arrow (Simple drawing)
            // context.fillText("->", btnX + 160, btnY + btnH/2);
            // Draw arrow manually for nicer look
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = isDark ? '#0f0f0f' : '#ffffff';
            const ax = btnX + 180;
            const ay = btnY + btnH / 2;
            context.moveTo(ax, ay + 4);
            context.lineTo(ax + 4, ay);
            context.lineTo(ax, ay - 4);
            context.moveTo(ax - 8, ay + 4);
            context.lineTo(ax - 4, ay); // simple arrow attempt
            // Actually simple text arrow might be safer for canvas
            // Let's use text
            // context.stroke();
            context.font = '20px sans-serif';
            context.fillText("↗", btnX + 180, btnY + btnH / 2 + 1);

            context.restore();
        }

        // Upload to texture
        targetTexture.image = canvas;
        if ((targetTexture as any).needsUpdate !== undefined) (targetTexture as any).needsUpdate = true;
    }

    // Initial draw
    draw(texture, false);
    draw(textureHover, true); // Hover texture always has button, no image needed

    // Load Image
    if (item.image) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = item.image;
        img.onload = () => {
            // Only redraw normal texture with image
            draw(texture, false, img);
        };
    }

    return { texture, textureHover, width, height };
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
        const { texture, textureHover } = createCardTexture(this.gl, this.item);

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
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1; // Invert Y
        this.mouse.set(x, y);

        this.raycast.castMouse(this.camera, this.mouse);
        const hits = this.raycast.intersectBounds(this.medias.map(m => m.plane));

        // Reset all
        this.medias.forEach(m => m.hoverTarget = 0);
        this.container.style.cursor = 'grab';

        if (hits && hits.length > 0) {
            const hitMesh = hits[0];
            const media = (hitMesh as any).media;
            if (media) {
                media.hoverTarget = 1;
                this.container.style.cursor = 'pointer';
            }
        }

        if (this.isDown) this.container.style.cursor = 'grabbing';
    }

    onClick(e: MouseEvent) {
        if (this.isDown) return;

        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        this.mouse.set(x, y);
        this.raycast.castMouse(this.camera, this.mouse);
        const hits = this.raycast.intersectBounds(this.medias.map(m => m.plane));

        if (hits && hits.length > 0) {
            const hitMesh = hits[0];
            const media = (hitMesh as any).media;
            if (media && media.item.link) {
                window.location.href = media.item.link;
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
