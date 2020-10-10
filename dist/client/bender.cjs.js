"use strict";
//MIT License
//Copyright (c) 2020 Sean Bradley
//https://github.com/Sean-Bradley/Bender/blob/main/LICENSE
Object.defineProperty(exports, "__esModule", { value: true });
var Bender = /** @class */ (function () {
    function Bender() {
    }
    Bender.prototype.bend = function (geometry, axis, angle) {
        var theta = 0;
        if (angle !== 0) {
            if (geometry.vertices) {
                var v = geometry.vertices;
                for (var i = 0; i < v.length; i++) {
                    var x = v[i].x;
                    var y = v[i].y;
                    var z = v[i].z;
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
                    var sinTheta = Math.sin(theta);
                    var cosTheta = Math.cos(theta);
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
                var v = geometry.attributes.position.array;
                for (var i = 0; i < v.length; i += 3) {
                    var x = v[i];
                    var y = v[i + 1];
                    var z = v[i + 2];
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
                    var sinTheta = Math.sin(theta);
                    var cosTheta = Math.cos(theta);
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
    };
    return Bender;
}());
exports.default = Bender;
