const TILE_SIZE = 50;

// Procedural generation
enum Direction {
  Left,
  Right,
  Top,
  Bottom,
}

// Randomize array in-place using Durstenfeld shuffle algorithm
function shuffleArray(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

class CustomMap {
  map: Map<number, Map<number, Tile>>;
  constructor() {
    this.map = new Map();
  }
  size() {
    let s = 0;
    for (let [_unused, innermap] of this.map) {
      s += innermap.size;
    }
    return s;
  }
  get(key: [number, number]) {
    let [x, y] = key;
    let col = this.map.get(x);
    if (col == undefined) {
      return undefined;
    }
    let tile = col.get(y);
    return tile;
  }
  set(key: [number, number], tile: Tile) {
    let [x, y] = key;
    let col = this.map.get(x);
    if (col == undefined) {
      let map = new Map();
      this.map.set(x, map);
      col = map;
    }
    col.set(y, tile);
  }
  delete(key: [number, number]) {
    let [x, y] = key;
    let col = this.map.get(x);
    if (col == undefined) {
      console.error("Deleted coord that doesn't exist!! (bug in map impl)");
      return;
    }
    col.delete(y);
    if (col.size == 0) {
      this.map.delete(x);
      console.log("removed size 0");
    }
  }
  *entries() {
    for (let [x, col] of this.map) {
      for (let [y, tile] of col) {
        yield [[x, y], tile] as [[number, number], Tile];
      }
    }
  }

  [Symbol.iterator]() {
    return this.entries();
  }
}

type TileMap = CustomMap;
// let weights = [1, 1, 1];
let dir_map = new Map<Direction, Direction[]>([
  [Direction.Top, [Direction.Left, Direction.Top, Direction.Right]],
  [Direction.Left, [Direction.Top, Direction.Left, Direction.Bottom]],
  [Direction.Right, [Direction.Top, Direction.Right, Direction.Bottom]],
  [Direction.Bottom, [Direction.Left, Direction.Bottom, Direction.Right]],
]);

function dir_to_offset(dir: Direction): [number, number] {
  switch (dir) {
    case Direction.Bottom:
      return [0, TILE_SIZE];
    case Direction.Top:
      return [0, -TILE_SIZE];
    case Direction.Left:
      return [-TILE_SIZE, 0];
    case Direction.Right:
      return [TILE_SIZE, 0];
  }
}
function dir_opposite(dir: Direction): Direction {
  switch (dir) {
    case Direction.Bottom:
      return Direction.Top;
    case Direction.Top:
      return Direction.Bottom;
    case Direction.Left:
      return Direction.Right;
    case Direction.Right:
      return Direction.Left;
  }
}

function addCoord(
  coord: [number, number],
  offset: [number, number]
): [number, number] {
  return [coord[0] + offset[0], coord[1] + offset[1]];
}

// function weighted_random(items, weights) {
//     for (let i = 1; i < weights.length; i++)
//         weights[i] += weights[i - 1];

//     var random = Math.random() * weights[weights.length - 1];
//     var i: number;
//     for (i = 0; i < weights.length; i++)
//         if (weights[i] > random)
//             break;

//     return items[i];
// }
function updateTileBoundary(tile: Tile, dir: Direction) {
  switch (dir) {
    case Direction.Bottom:
      tile.edge.b = false;
      return;
    case Direction.Top:
      tile.edge.t = false;
      return;
    case Direction.Left:
      tile.edge.l = false;
      return;
    case Direction.Right:
      tile.edge.r = false;
      return;
  }
}

let __generate_id: number = 1;

// Dir is "open direction" of the last tile.
// returns true if success. false if backtrack.
function generate(
  map: TileMap,
  from: [number, number],
  dir: Direction,
  car: [number, number],
  view_dist: number,
  gen_dist: number
): boolean {
  let distX = Math.abs(car[0] - from[0]);
  let distY = Math.abs(car[1] - from[1]);
  let sqDist = distX * distX + distY * distY;
  let offset = dir_to_offset(dir);
  let newLoc: [number, number] = addCoord(from, offset);
  // console.log(newLoc);
  // console.log(map);
  if (map.get(newLoc) != undefined) {
    return false; // This tile already has a road. We need to backtrack!
  }
  if (sqDist > gen_dist) {
    // we're good. no backtracking needed. We save current progress and leave.
    // we didn't update the current location, so we'll just start again from here.
    prev.from = from;
    prev.dir = dir;
    return true; 
  }
  if (sqDist < view_dist) {

    return false; // We're too close, user might see the generation.
  }
  console.log(from, car);
  // Generation
  let items = dir_map.get(dir)!.slice(0);
  shuffleArray(items);
  for (let direction of items) {
    let offsetNew = dir_to_offset(direction);
    let newTile = new Tile(newLoc[0], newLoc[1]);
    // Update direction we came from
    updateTileBoundary(newTile, dir_opposite(dir));
    // Update direction we are going to
    updateTileBoundary(newTile, direction);
    newTile.id = __generate_id;
    map.set(newLoc, newTile);
    __generate_id++;
    let res = generate(
      map,
      addCoord(newLoc, offsetNew),
      direction,
      car,
      view_dist,
      gen_dist
    );
    if (res) {
      // Succeeded, we also return true.
      return true;
    } else {
      // Failure bubbled up, we test next option.
      map.delete(newLoc);
      __generate_id--;
      continue;
    }
  }
  // Failed to find route. We're surrounded. Backtrack.
  return false;
}
