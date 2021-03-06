import { mat4 } from "gl-matrix";
import { vec3 } from "./math";
import { IMaterial, IMesh } from "./types/IMesh";

export class Box3D implements IMesh{
    m_VERTICES: any;
    m_INDICES: any;
    m_TEXCOORDS: Array<number>;
    m_modelMatrix: mat4;
    v_position: vec3;

    material: IMaterial;


    constructor(){
        this.m_VERTICES= 
            [ // X, Y, Z           R, G, B
                // Top
                -1.0, 1.0, -1.0,   
                -1.0, 1.0, 1.0,    
                1.0, 1.0, 1.0,     
                1.0, 1.0, -1.0,    

                // Left
                -1.0, 1.0, 1.0,    
                -1.0, -1.0, 1.0,   
                -1.0, -1.0, -1.0,  
                -1.0, 1.0, -1.0,   

                // Right
                1.0, 1.0, 1.0,    
                1.0, -1.0, 1.0,   
                1.0, -1.0, -1.0,  
                1.0, 1.0, -1.0,   

                // Front
                1.0, 1.0, 1.0,    
                1.0, -1.0, 1.0,   
                -1.0, -1.0, 1.0,  
                -1.0, 1.0, 1.0,   

                // Back
                1.0, 1.0, -1.0,   
                1.0, -1.0, -1.0,  
                -1.0, -1.0, -1.0, 
                -1.0, 1.0, -1.0,  

                // Bottom
                -1.0, -1.0, -1.0,  
                -1.0, -1.0, 1.0,   
                1.0, -1.0, 1.0,    
                1.0, -1.0, -1.0,   
            ];

            this.m_INDICES =
            [
                // Top
                0, 1, 2,
                0, 2, 3,

                // Left
                5, 4, 6,
                6, 4, 7,

                // Right
                8, 9, 10,
                8, 10, 11,

                // Front
                13, 12, 14,
                15, 14, 12,

                // Back
                16, 17, 18,
                16, 18, 19,

                // Bottom
                21, 20, 22,
                22, 20, 23
            ];

            this.m_TEXCOORDS = [
                // Front
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Back
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Top
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Bottom
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Right
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Left
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0
              ];

            this.m_modelMatrix = mat4.create();
            this.v_position = new vec3(0,0,0);
        }
}

export class Box2 implements IMesh {
    m_VERTICES: any;
    m_INDICES: any;
    m_TEXCOORDS: any;
    m_modelMatrix: mat4;
    v_position: vec3;

    material: IMaterial;


 constructor(){
        this.m_VERTICES= 
            [ // X, Y, Z           R, G, B
                // Top
                -0.0, 7.0, -1.0,   1.5, 0.5, 0.5,
                -1.0, 1.0, 1.0,    0.5, 1.5, 0.5,
                1.0, 1.0, 1.0,     0.5, 0.5, 1.5,
                1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

                // Left
                -1.0, 1.0, 1.0,    1.75, 0.25, 0.5,
                -1.0, -1.0, 1.0,   1.75, 0.25, 0.5,
                -1.0, -1.0, -1.0,  1.75, 0.25, 0.5,
                -1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

                // Right
                1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
                1.0, -1.0, 1.0,   0.25, 1.25, 0.75,
                1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
                1.0, 1.0, -1.0,   0.25, 1.25, 0.75,

                // Front
                1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
                1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
                -1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
                -1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

                // Back
                1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
                1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
                -1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
                -1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

                // Bottom
                -1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
                -1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
                1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
                1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
            ];

            this.m_INDICES =
            [
                // Top
                0, 1, 2,
                0, 2, 3,

                // Left
                5, 4, 6,
                6, 4, 7,

                // Right
                8, 9, 10,
                8, 10, 11,

      
            ];
            this.m_TEXCOORDS = [
                // Front
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Back
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Top
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Bottom
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Right
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Left
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0
              ];


            this.m_modelMatrix = mat4.create();
            this.v_position = new vec3(0,0,0);
        }
}

export class Plane3D implements IMesh {
    m_VERTICES: any;
    m_INDICES: any;
    m_TEXCOORDS: Array<number>;
    m_modelMatrix:mat4;
    v_position: vec3;
    material: IMaterial;

    constructor()
    {
        this.m_VERTICES= 
        [ // X, Y, Z           R, G, B
            // Front
            -5.0, 0.0, -5.0,  
            -5.0, 0.0, 5.0,   
            5.0, 0.0, 5.0,     
            5.0, 0.0, -5.0   
            // -1.0, -1.0, -1.0,   
            // -1.0, -1.0, 1.0,    
            // 1.0, -1.0, 1.0,     
            // 1.0, -1.0, -1.0,    

        ];

        this.m_INDICES =
        [
            0, 1, 2,
            0, 2, 3
        ];

        this.m_TEXCOORDS = [
            // Front
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0
        ];

        this.m_modelMatrix = mat4.create();
        this.v_position = new vec3(0,0,0);
    }
}

// export class Model3D implements IMesh {
//     m_VERTICES: any;
//     m_INDICES: any; 
//     v_position: vec3;
//     material: IMaterial

//     constructor()
//     {


//     }
// }

