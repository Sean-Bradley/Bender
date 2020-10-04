# Bender
Bend Geometries in Threejs. Works with both Geometries and BufferGeometries.

## Usage
```typescript
bend(geometry: THREE.Geometry | THREE.BufferGeometry, axis: string, angle: number)
```

![Bending a cube](docs/cube.jpg)

![Bending text](docs/text.jpg)

```bash
git clone https://github.com/Sean-Bradley/Bender.git
cd Bender
npm install
npm run dev
```

This is a typescript project consisting of two sub projects with there own tsconfigs.

To edit this example, then modify the files in `./src/client/` or `./src/server/`. The projects will auto recompile if you started by using `npm run dev`

or

You can simply just import the generated `./dist/client/bender.js` directly into your project as a module.

```html
<script type="module" src="./bender.js"></script>
```

or as ES6 import

```typescript
import Bender from './bender.js'
```
