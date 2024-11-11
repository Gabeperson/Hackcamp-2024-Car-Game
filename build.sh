tsc main.ts car.ts tile.ts procgen.ts render.ts vec2.ts --target es6
rm -r web 2>/dev/null
mkdir web
mv main.js web/
mv car.js web/
mv tile.js web/
mv procgen.js web/
mv render.js web/
cp index.html web/
cp vec2.js web/