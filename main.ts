enum GameStatus {}

let tilemap: TileMap = new CustomMap();
let player: Car;
let prev = {
  from: [0, 0] as [number, number],
  dir: Direction.Top,
};
player = new Car();

const VIEW_DIST = 3;
const GEN_RANGE = 10;

function tick() {
  // let af_id = setTimeout(tick, 10);
  let af_id = requestAnimationFrame(tick);
  // console.log("ran");
  // Physics update
  // Move car
  // TODO:
  player.update();
  // Detect collision:
  // TODO:
  // for (let [coord, tile] of tilemap) {
  //   // Iterate through map and check for physics collisions.
  //   // To cancel the loop, call `cancelAnimationFrame(af_id);`
  //   // TODO:
  //   if (collisionWithTile(tile, player)) {
  //     // player lost by hitting wall
  //     cancelAnimationFrame(af_id);
  //     // show game over
  //     ctx.closePath();
  //     window.location.replace("./menu/restartGame.html");
  //   }
  // }

  // Generation
  // TODO:
  // console.log(tilemap);
  if (!generate(tilemap, prev.from, prev.dir, [player.coord.x, player.coord.y],
    VIEW_DIST*VIEW_DIST, GEN_RANGE*GEN_RANGE
  )) {
    alert("FAIL");
  }
  // console.log(tilemap);

  // Garbage Colect
  // TODO:
  let outOfRange: [number, number][] = [];

  for (let [coord, tile] of tilemap) {
    let dx = coord[0] - player.coord.x;
    let dy = coord[1] - player.coord.y;
    let distSquared = dx * dx + dy * dy;
    let genDistSquared = GEN_RANGE * GEN_RANGE * TILE_SIZE * TILE_SIZE;

    if (distSquared > genDistSquared) {
      outOfRange.push(coord);
    }
  }

  for (let i = 0; i < outOfRange.length; i++) {
    tilemap.delete(outOfRange[i]);
  }
  // Render
  // TODO:
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let [coord, tile] of tilemap) {
    let image = tile.getImage()!;
    let pcoord: [number, number] = [-player.coord.x+INITIAL_CAR_X, -player.coord.y+INITIAL_CAR_Y]
        // let pcoord: [number, number] = [INITIAL_CAR_X, INITIAL_CAR_Y];

    let c = addCoord(coord, pcoord);
    drawRoad(image, 
      player.coord.x, 
      player.coord.y, 
      c[0], 
      c[1], 
      player.direction, 
      TILE_SIZE*2
    );
  }
  player.renderCar(); //todo
}



function garbageCollect() {}
// reset the game state to beginning.
function reset() {
  player = new Car();
  prev.from = [player.coord.x, player.coord.y-TILE_SIZE/2];
}

// start the game. 
function start() {
  reset();
  generate(tilemap, prev.from, prev.dir, [player.coord.x, player.coord.y],
    0, GEN_RANGE*GEN_RANGE*TILE_SIZE*TILE_SIZE,
  )
  tick();
}

function test() {
  let tilemap: CustomMap = new CustomMap();
  let dist = 10;
  let gen_dist = TILE_SIZE * TILE_SIZE * dist * dist;
  let offset: [number, number] = [200, 300];
  let from = addCoord([0, 0], offset);
  let success = generate(tilemap, [0, 0], Direction.Top, [0, 0], 0, gen_dist);
  console.log(tilemap);
  console.log(success);
  let arr: [[number, number], number][] = [];
  for (let [coord, tile] of tilemap) {
    console.log(tile.edge);
    let newCoord = addCoord(coord, offset);
    let image = tile.getImage()!;
    // drawImage(IMAGE_UP_DOWN, newCoord[0], newCoord[1], TILE_SIZE, TILE_SIZE, PI / 2);
    drawRoad(
      image,
      300,
      300,
      newCoord[0],
      newCoord[1],
      PI / 2 + PI / 4,
      TILE_SIZE * 2
    );

    drawText(newCoord[0], newCoord[1], tile.id!.toString());
    arr.push([coord, tile.id!]);
  }
  arr.sort(function (a, b) {
    return a[1] - b[1];
  });
  let prev = offset;
  for (let [coord, id] of arr) {
    let c = addCoord(coord, offset);
    drawLine(prev, c);
    prev = c;
  }
  console.log(tilemap.size());
  drawCircle(from[0], from[1], Math.sqrt(gen_dist));
}
