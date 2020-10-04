export default class Bender {

    constructor() { }

    public bend(geometry: THREE.Geometry, axis: string, angle: number) {
        let theta = 0
        if (angle !== 0) {
            for (let i = 0; i < geometry.vertices.length; i++) {

                let x = geometry.vertices[i].x
                let y = geometry.vertices[i].y
                let z = geometry.vertices[i].z

                switch (axis) {
                    case "x":
                        theta = z * angle
                        break;
                    case "y":
                        theta = x * angle
                        break;
                    case "z":
                        theta = x * angle
                        break;
                }

                let sinTheta = Math.sin(theta)
                let cosTheta = Math.cos(theta)

                switch (axis) {
                    case "x":
                        //bending around the X axis
                        geometry.vertices[i].x = x;
                        geometry.vertices[i].y = (y - 1.0 / angle) * cosTheta + 1.0 / angle;
                        geometry.vertices[i].z = -(y - 1.0 / angle) * sinTheta;
                        break;
                    case "y":
                        //bending around the Y axis
                        geometry.vertices[i].x = -(z - 1.0 / angle) * sinTheta;
                        geometry.vertices[i].y = y
                        geometry.vertices[i].z = (z - 1.0 / angle) * cosTheta + 1.0 / angle;
                        break;
                    case "z":
                        //bending around the Z axis
                        geometry.vertices[i].x = -(y - 1.0 / angle) * sinTheta;
                        geometry.vertices[i].y = (y - 1.0 / angle) * cosTheta + 1.0 / angle;
                        geometry.vertices[i].z = z;
                        break;
                }
            }
            geometry.verticesNeedUpdate = true;
        }
    }
}