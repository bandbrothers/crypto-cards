import { ISimulation } from "./types/ISimulation";
import { IMesh } from "./types/IMesh";
import { IEntity } from "./types/IEntity";
import { mat4, glMatrix } from "gl-matrix";
import { Box2, Box3D, Plane3D } from "./geometry";
import { vec3 } from "./math";

var matWorldUniformLocation: WebGLUniformLocation;
var matModelUniformLocation: WebGLUniformLocation;
var matViewUniformLocation: WebGLUniformLocation;

let identityMatrix = new Float32Array(16);
mat4.identity(identityMatrix);
let angle = 0;
var worldMatrix = new Float32Array(16);
var modelMatrix = new Float32Array(16);
var viewMatrix = new Float32Array(16);
var projMatrix = new Float32Array(16);
let glProgram: WebGLProgram;
var VBO: WebGLBuffer;
var VIO: WebGLBuffer;

export class Camera {
    v_position: vec3;
    v_lookAt: vec3;
}

let box = new Box3D();

export class World {
    camera: Camera;
    objects: Array<IMesh>;

    constructor() {
        this.camera = new Camera();
        this.camera.v_position = new vec3(5, 5, 0);
        this.camera.v_lookAt = new vec3(0, 0, 0);
        this.objects = [];

        // let box2 = new Box3D();
        let box3 = new Box3D();
        let box4 = new Plane3D();
        let box = new Box3D();
        // box2.v_position = new vec3(0, 2, 0);
        box3.v_position = new vec3(0, 0, 2);
        box4.v_position = new vec3(0, 0, 0);
        box.v_position = new vec3(2, 0, 0);

        // this.loadMesh(box2);
        // this.loadMesh(box3);

        this.objects.push(box);
        this.objects.push(box3);
        this.objects.push(box4);
    }

    loadMesh(mesh:IMesh)
    {
    //    this.objects.push(mesh);
    }
}

export async function initRenderer(game: ISimulation) {
    let gl = game.gl;

    let fragShader = await (await fetch("../shaders/frag.glsl")).text();
    let vertShader = await (await fetch("../shaders/vert.glsl")).text();

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

    // Compile shaders
    let vertexShader = buildShader(gl, vertShader, gl.VERTEX_SHADER);
    let fragmentShader = buildShader(gl, fragShader, gl.FRAGMENT_SHADER);

    // Create program
    glProgram= gl.createProgram();

    // Attach and link shaders to the program
    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    gl.linkProgram(glProgram);
    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        console.error(
            "ERROR linking program!",
            gl.getProgramInfoLog(glProgram)
        );
        return;
    }
    gl.validateProgram(glProgram);
    if (!gl.getProgramParameter(glProgram, gl.VALIDATE_STATUS)) {
        console.error(
            "ERROR validating program!",
            gl.getProgramInfoLog(glProgram)
        );
        return;
    }

    //VERTEX BUFFER OBJECT
    VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(box.m_VERTICES),
        gl.STATIC_DRAW
    );

    VIO = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VIO);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(box.m_INDICES),
        gl.STATIC_DRAW
    );
    var posAttribLocation = gl.getAttribLocation(glProgram,"vertPosition");
    var colorAttribLocation = gl.getAttribLocation(glProgram, "vertColor");
    gl.vertexAttribPointer(
        posAttribLocation, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        false,
        6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.vertexAttribPointer(
        colorAttribLocation, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        false,
        6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );
    

    gl.enableVertexAttribArray(posAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    gl.useProgram(glProgram);

    matWorldUniformLocation = gl.getUniformLocation(glProgram, "mWorld");
    matViewUniformLocation = gl.getUniformLocation(glProgram, "mView");
    matModelUniformLocation = gl.getUniformLocation(glProgram, "mModel");
    var matProjUniformLocation = gl.getUniformLocation(glProgram, "mProj");

    var colorAttribLocation = gl.getAttribLocation(glProgram, "vertColor");


    mat4.identity(worldMatrix);
    mat4.identity(modelMatrix);
    mat4.lookAt(viewMatrix, [0, 0, 0], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(
        projMatrix,
        glMatrix.toRadian(90),
        gl.canvas.width / gl.canvas.height,
        0.1,
        1000.0
    );

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.uniformMatrix4fv(matWorldUniformLocation, false, worldMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, false, projMatrix);
    gl.uniformMatrix4fv(matModelUniformLocation, false, modelMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, false, viewMatrix);

}

export function render(game: ISimulation, deltaTime: number) {
    let gl = game.gl;
    let world = game.world

   mat4.lookAt(viewMatrix, 
        [world.camera.v_position.X, world.camera.v_position.Y,world.camera.v_position.Z], 
        [world.camera.v_lookAt.X, world.camera.v_lookAt.Y,world.camera.v_lookAt.Z],
        [0, 1, 0]
    ); // Y UP




    // angle = (performance.now() / 1000) * 2 * Math.PI;
    // let offset = Math.sin(performance.now() / 1000);
    // console.log(offset);
    // mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
    // mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [0, 0, 0]);
    // mat4.translate(worldMatrix, identityMatrix, [0, 0, 0]);
    // mat4.mul(worldMatrix, worldMatrix, yRotationMatrix);
    // gl.uniformMatrix4fv(matWorldUniformLocation, false, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, false, viewMatrix);

    

    gl.clearColor(0.1, 0.1, 0.1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    world.objects.forEach(renderObject => { // not to be confused w/ OOP bullshit
        mat4.rotateY(renderObject.m_modelMatrix, renderObject.m_modelMatrix, (Math.PI / 180));
        mat4.translate(renderObject.m_modelMatrix, identityMatrix, [renderObject.v_position.X, renderObject.v_position.Y, renderObject.v_position.Z]);
        gl.uniformMatrix4fv(matModelUniformLocation, false, renderObject.m_modelMatrix);

        // gl.uniformMatrix4fv(matWorldUniformLocation, false, worldMatrix);

        // // gl.uniformMatrix4fv(programInfo.uniformLocations.normalMatrix, false, object.normalMatrix);

        // // gl.uniform3fv(programInfo.uniformLocations.color, object.color);


        // gl.bufferData(gl.ARRAY_BUFFER, renderObject.m_VERTICES, gl.STATIC_DRAW)

        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(renderObject.m_VERTICES),
            gl.STATIC_DRAW
        );
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VIO);
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(box.m_INDICES),
            gl.STATIC_DRAW
        );

        gl.drawElements(gl.TRIANGLES, renderObject.m_INDICES.length, gl.UNSIGNED_SHORT, 0);
        // gl.drawArrays(gl.TRIANGLES, 0, renderObject.m_VERTICES.length / 3);
    });

    // gl.drawElements(gl.TRIANGLES, box.m_INDICES.length, gl.UNSIGNED_SHORT, 0);
}

function buildShader(gl: WebGLRenderingContext, src: string, type: number) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
        return;
    }
    return shader;
}
