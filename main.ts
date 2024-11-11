enum GameStatus {}

let tilemap: TileMap;
let player: Car;
let prev = {
  from: [0, 0] as [number, number],
  dir: Direction.Top,
};
player = new Car();

const VIEW_DIST = 3;
const GEN_RANGE = 10;

function tick() {
  let af_id = requestAnimationFrame(tick);
  // Physics update
  // Move car
  // TODO:
  player.update();
  // Detect collision:
  // TODO:
  for (let [coord, tile] of tilemap) {
    // Iterate through map and check for physics collisions.
    // To cancel the loop, call `cancelAnimationFrame(af_id);`
    // TODO:
    if (collisionWithTile(tile, player)) {
      // player lost by hitting wall
      cancelAnimationFrame(af_id);
      // show game over
      ctx.closePath();
      window.location.replace("./menu/restartGame.html");
    }
  }

  // Generation
  // TODO:

  // Garbage Colect
  // TODO:
  let outOfRange = [];
  for (let [coord, tile] of tilemap) {
    let dx = coord[0] - player.coord.x;
    let dy = coord[1] - player.coord.y;
    let distSquared = dx * dx + dy * dy;
    let genDistSquared = GEN_RANGE * GEN_RANGE * TILE_SIZE * TILE_SIZE;

    if (distSquared > genDistSquared) {
      outOfRange.push(coord);
    }
  }

  // Render
  // TODO:
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let [coord, tile] of tilemap) {
    let image = tile.getImage()!;
    drawRoad(image, 
      player.coord.x, 
      player.coord.y, 
      coord[0], 
      coord[1], 
      player.direction, 
      TILE_SIZE*2
    );
  }
  // renderCar(); //todo
}

function garbageCollect() {}
// reset the game state to beginning.
function reset() {
  // TODO
}

// start the game. CALL AFTER reset()
function start() {
  // TODO
}

function test() {
  let tilemap: CustomMap = new CustomMap();
  let dist = 10;
  let gen_dist = TILE_SIZE * TILE_SIZE * dist * dist;
  let offset: [number, number] = [300, 300];
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
    drawRoad(image, 300, 300, newCoord[0], newCoord[1], PI/2+PI/4, TILE_SIZE*2);

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
