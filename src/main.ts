import { createContext, isContext } from "vm";
import { Card } from "./game/card";
import { initRenderer, render, World } from "./engine/renderer";
import { ISimulation } from "./engine/types/ISimulation";
import { vec3, VMath } from "./engine/math";
import { simulate } from "./engine/simulation";

class Game implements ISimulation {
    gl: WebGLRenderingContext;
    world: World;

    update(world: World) {
        this.world = world;
        return this.world;
    }
}

window.onload = () => {
    let currentTime = 0;
    let lastTime = 0;
    let deltaTime = 0;
    let canvas = <HTMLCanvasElement>document.getElementById("canvas");

    //Instantiate game instance
    let game = new Game();
    game.gl = canvas.getContext("webgl");
    game.world = new World();


    initRenderer(game);

    //main loop ~ executes each anim frame to simulate and render game
    let main = () => {
        //Get current delta
        currentTime = performance.now();
        deltaTime = (currentTime - lastTime) / 1000.0;

        // /resize canvas
        if (!game.gl) {
            console.log("Failed to get the rendering context for WebGL");
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Simulate
        simulate(game, deltaTime);

        //Render
        render(game, deltaTime);

        lastTime = currentTime;
        requestAnimationFrame(main);
    };

    console.log("starting game yo");
    requestAnimationFrame(main);
};
