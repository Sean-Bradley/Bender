//MIT License
//Copyright (c) 2020 Sean Bradley
//https://github.com/Sean-Bradley/Bender/blob/main/LICENSE
export default class Bender {
    bend(geometry, axis, angle) {
        let theta = 0;
        if (angle !== 0) {
            if (geometry.vertices) {
                const v = geometry.vertices;
                for (let i = 0; i < v.length; i++) {
                    let x = v[i].x;
                    let y = v[i].y;
                    let z = v[i].z;
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
                            //bending around the X axis
                            v[i].x = x;
                            v[i].y = (y - 1.0 / angle) * cosTheta + 1.0 / angle;
                            v[i].z = -(y - 1.0 / angle) * sinTheta;
                            break;
                        case "y":
                            //bending around the Y axis
                            v[i].x = -(z - 1.0 / angle) * sinTheta;
                            v[i].y = y;
                            v[i].z = (z - 1.0 / angle) * cosTheta + 1.0 / angle;
                            break;
                        default: //z
                            //bending around the Z axis
                            v[i].x = -(y - 1.0 / angle) * sinTheta;
                            v[i].y = (y - 1.0 / angle) * cosTheta + 1.0 / angle;
                            v[i].z = z;
                            break;
                    }
                }
                geometry.verticesNeedUpdate = true;
            }
            else {
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
                            //bending around the X axis
                            v[i] = x;
                            v[i + 1] = (y - 1.0 / angle) * cosTheta + 1.0 / angle;
                            v[i + 2] = -(y - 1.0 / angle) * sinTheta;
                            break;
                        case "y":
                            //bending around the Y axis
                            v[i] = -(z - 1.0 / angle) * sinTheta;
                            v[i + 1] = y;
                            v[i + 2] = (z - 1.0 / angle) * cosTheta + 1.0 / angle;
                            break;
                        default: //z
                            //bending around the Z axis
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
}
