const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const game = new Game (ctx)
document.getElementById("btn").addEventListener("click", () =>{
    if (game.interval) {
        game.stop()
    } else {
        game.start()
    }
})
