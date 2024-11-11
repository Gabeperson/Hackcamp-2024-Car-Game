const TILE_SIZE = 10;

enum Direction {
  Left,
  Right,
  Top,
  Bottom,
}

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

  get(vec: Vec2) {
    let col = this.map.get(vec.x);
    if (col == undefined) {
      return undefined;
    }
    return col.get(vec.y);
  }

  set(vec: Vec2, tile: Tile) {
    let col = this.map.get(vec.x);
    if (col == undefined) {
      let map = new Map();
      this.map.set(vec.x, map);
      col = map;
    }
    col.set(vec.y, tile);
  }

  delete(vec: Vec2) {
    let col = this.map.get(vec.x);
    if (col == undefined) {
      console.error("Deleted coord that doesn't exist!! (bug in map impl)");
      return;
    }
    col.delete(vec.y);
    if (col.size == 0) {
      this.map.delete(vec.x);
      console.log("removed size 0");
    }
  }

  *entries() {
    for (let [x, col] of this.map) {
      for (let [y, tile] of col) {
        yield [new Vec2(x, y), tile] as [Vec2, Tile];
      }
    }
  }

  [Symbol.iterator]() {
    return this.entries();
  }
}

type TileMap = CustomMap;

let dir_map = new Map<Direction, Direction[]>([
  [Direction.Top, [Direction.Left, Direction.Top, Direction.Right]],
  [Direction.Left, [Direction.Top, Direction.Left, Direction.Bottom]],
  [Direction.Right, [Direction.Top, Direction.Right, Direction.Bottom]],
  [Direction.Bottom, [Direction.Left, Direction.Bottom, Direction.Right]],
]);

function dir_to_offset(dir: Direction): Vec2 {
  switch (dir) {
    case Direction.Bottom:
      return new Vec2(0, -TILE_SIZE);
    case Direction.Top:
      return new Vec2(0, TILE_SIZE);
    case Direction.Left:
      return new Vec2(-TILE_SIZE, 0);
    case Direction.Right:
      return new Vec2(TILE_SIZE, 0);
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

function updateTileBoundary(tile: Tile, dir: Direction) {
  switch (dir) {
    case Direction.Bottom:
      tile.edge.b = false;
    case Direction.Top:
      tile.edge.t = false;
    case Direction.Left:
      tile.edge.l = false;
    case Direction.Right:
      tile.edge.r = false;
  }
}

let __generate_id: number = 1;

function generate(
  map: TileMap,
  from: Vec2,
  dir: Direction,
  car: Vec2,
  view_dist: number,
  gen_dist: number
): boolean {
  console.log("Ran");
  let diff = car.subtract(from);
  let sqDist = diff.dot(diff);
  let offset = dir_to_offset(dir);
  let newLoc = from.add(offset);

  if (map.get(newLoc) != undefined) {
    console.log("Ran2");
    return false; // This tile already has a road. We need to backtrack!
  }
  if (sqDist > gen_dist) {
    console.log("Ran3");
    return true; // we're good. no backtracking needed
  }
  if (sqDist < view_dist) {
    console.log("Ran4");
    return false; // We're too close, user might see the generation.
  }

  // Generation
  let items = dir_map.get(dir)!.slice(0);
  shuffleArray(items);
  for (let direction of items) {
    let offsetNew = dir_to_offset(direction);
    let newTile = new Tile(newLoc.x, newLoc.y);
    // Update direction we came from
    updateTileBoundary(newTile, dir_opposite(dir));
    // Update direction we are going to
    updateTileBoundary(newTile, direction);
    newTile.id = __generate_id;
    map.set(newLoc, newTile);
    __generate_id++;
    let nextLoc = newLoc.add(offsetNew);
    let res = generate(map, nextLoc, direction, car, view_dist, gen_dist);
    console.log(res);
    if (res) {
      // Succeeded, we also return true.
      return true;
    } else {
      // Failure bubbled up, we test next option.
      map.delete(newLoc);
      console.log("ran!!!!!");
      __generate_id--;
      continue;
    }
  }
  // Failed to find route. We're surrounded. Backtrack.
  return false;
}
