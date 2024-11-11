enum GameStatus {}

function tick() {
  requestAnimationFrame(tick);
}

// function test() {
//     let tilemap: CustomMap = new CustomMap();
//     let dist = 20;
//     let gen_dist = TILE_SIZE*TILE_SIZE*dist*dist;
//     let offset: [number, number] = [300, 300];
//     let from = addCoord([0, 0], offset);
//     let success = generate(tilemap, [0, 0], Direction.Top, [0, 0],
//         0, gen_dist);
//     console.log(tilemap);
//     console.log(success);
//     let arr: [[number, number], number][] = [];
//     for (let [coord, tile] of tilemap) {
//         let newCoord = addCoord(coord, offset);
//         drawRect(newCoord[0], newCoord[1], TILE_SIZE, PI/2);
//         drawText(newCoord[0], newCoord[1], tile.id!.toString());
//         arr.push([coord, tile.id!]);
//     }
//     arr.sort(function(a, b) {
//         return a[1] - b[1];
//     });
//     let prev = offset
//     for (let [coord, id] of arr) {
//         let c = addCoord(coord, offset);
//         drawLine(prev, c);
//         prev = c;
//     }
//     console.log(tilemap.size());
//     drawCircle(from[0], from[1], Math.sqrt(gen_dist));
// }
