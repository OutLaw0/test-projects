import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineEventHandler, getQuery } from 'file://D:/Github/test-projects/kelnik/kelnik/node_modules/h3/dist/index.mjs';

const apartments_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const query = getQuery(event);
  const limit = Number((_a = query.limit) != null ? _a : 20);
  const offset = Number((_b = query.offset) != null ? _b : 0);
  const roomsParam = typeof query.rooms === "string" ? query.rooms : "";
  const rooms = roomsParam ? roomsParam.split(",").map((n) => Number(n)).filter((n) => !Number.isNaN(n)) : [];
  const priceMin = Number((_c = query.priceMin) != null ? _c : 0);
  const priceMax = Number((_d = query.priceMax) != null ? _d : Number.MAX_SAFE_INTEGER);
  const areaMin = Number((_e = query.areaMin) != null ? _e : 0);
  const areaMax = Number((_f = query.areaMax) != null ? _f : Number.MAX_SAFE_INTEGER);
  const dataPath = resolve(process.cwd(), "public", "data", "apartments.json");
  const raw = await readFile(dataPath, "utf-8");
  const all = JSON.parse(raw);
  const prices = all.map((x) => x.price);
  const areas = all.map((x) => x.area);
  const meta = {
    priceMin: Math.min(...prices),
    priceMax: Math.max(...prices),
    areaMin: Math.min(...areas),
    areaMax: Math.max(...areas)
  };
  let filtered = all.filter((x) => x.price >= priceMin && x.price <= priceMax && x.area >= areaMin && x.area <= areaMax && (rooms.length === 0 || rooms.includes(x.rooms)));
  const total = filtered.length;
  filtered = filtered.slice(offset, offset + limit);
  return {
    items: filtered,
    total,
    meta
  };
});

export { apartments_get as default };
//# sourceMappingURL=apartments.get.mjs.map
