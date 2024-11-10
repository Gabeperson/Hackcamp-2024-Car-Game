const TILE_SIZE = 200;

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



type TileMap = Map<[number, number], Tile>;
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
            return [0, -TILE_SIZE]
        case Direction.Top:
            return [0, TILE_SIZE]
        case Direction.Left:
            return [-TILE_SIZE, 0]
        case Direction.Right:
            return [TILE_SIZE, 0]
    }
}
function dir_opposite(dir: Direction): Direction {
    switch (dir) {
        case Direction.Bottom:
            return Direction.Top
        case Direction.Top:
            return Direction.Bottom
        case Direction.Left:
            return Direction.Right
        case Direction.Right:
            return Direction.Left
    }
}

function addCoord(coord: [number, number], offset: [number, number]):
    [number, number] {
        return [coord[0]+offset[0], coord[1]+offset[1]]
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
        case Direction.Top:
            tile.edge.t = false;
        case Direction.Left:
            tile.edge.l = false;
        case Direction.Right:
            tile.edge.r = false;
    }
}

const GEN_DISTANCE = 10;
const VIEW_DISTANCE = 5;

const SQ_GEN_DISTANCE = GEN_DISTANCE * GEN_DISTANCE;
const SQ_VIEW_DISTANCE = VIEW_DISTANCE * VIEW_DISTANCE;

// Dir is "open direction" of the last tile.
// returns true if success. false if backtrack.
function generate(map: TileMap, from: [number, number],
    dir: Direction, car: [number, number]): boolean {
    let distX = Math.abs(car[0] - from[0]);
    let distY = Math.abs(car[1] - from[1])
    let sqDist = distX*distX+distY*distY;
    let offset = dir_to_offset(dir);
    let newLoc: [number, number] = addCoord(from, offset);
    if (map.get(newLoc) != undefined) {
        return false; // This tile already has a road. We need to backtrack!
    }
    if (sqDist > SQ_GEN_DISTANCE) {
        return true; // we're good. no backtracking needed
    }
    if (sqDist <= SQ_VIEW_DISTANCE) {
        return false; // We're too close, user might see the generation.
    }
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
        map.set(newLoc, newTile);
        let res = generate(
            map, 
            addCoord(newLoc, offsetNew),
            direction,
            car,
        );
        if (res) {
            // Succeeded, we also return true.
            return true;
        } else {
            // Failure bubbled up, we test next option.
            map.delete(newLoc);
            continue;
        }
    }
    // Failed to find route. We're surrounded. Backtrack.
    return false;
}