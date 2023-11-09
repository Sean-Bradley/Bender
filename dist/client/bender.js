//MIT License
//Copyright (c) 2020-2023 Sean Bradley
//https://github.com/Sean-Bradley/Bender/blob/main/LICENSE
export default class Bender {
    bend(geometry, axis, angle) {
        let theta = 0;
        if (angle !== 0) {
            const v = geometry.attributes.position.array;
            for (let i = 0; i < v.length; i += 3) {
                let x = v[i];
                let y = v[i + 1];
                let z = v[i + 2];
                switch (axis) {
                    case "x":
                        theta = z * angle;
                        break;
                    case "y":
                        theta = x * angle;
                        break;
                    default: //z
                        theta = x * angle;
                        break;
                }
                let sinTheta = Math.sin(theta);
                let cosTheta = Math.cos(theta);
                switch (axis) {
                    case "x":
                        v[i] = x;
                        v[i + 1] = (y - 1.0 / angle) * cosTheta + 1.0 / angle;
                        v[i + 2] = -(y - 1.0 / angle) * sinTheta;
                        break;
                    case "y":
                        v[i] = -(z - 1.0 / angle) * sinTheta;
                        v[i + 1] = y;
                        v[i + 2] = (z - 1.0 / angle) * cosTheta + 1.0 / angle;
                        break;
                    default: //z
                        v[i] = -(y - 1.0 / angle) * sinTheta;
                        v[i + 1] = (y - 1.0 / angle) * cosTheta + 1.0 / angle;
                        v[i + 2] = z;
                        break;
                }
            }
            geometry.attributes.position.needsUpdate = true;
        }
    }
}
