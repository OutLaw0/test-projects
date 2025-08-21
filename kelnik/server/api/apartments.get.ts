import { readFile } from 'node:fs/promises'
import { resolve as pathResolve } from 'node:path'
import { defineEventHandler, getQuery, type H3Event } from 'h3'

interface ApartmentItem {
	id: number
	title: string
	rooms: number
	area: number
	floor: number
	price: number
	image: string
}

export default defineEventHandler(async (event: H3Event) => {
	const query = getQuery(event)
	const limit = Number(query.limit ?? 20)
	const offset = Number(query.offset ?? 0)
	const roomsParam = typeof query.rooms === 'string' ? query.rooms : ''
	const rooms = roomsParam
		? roomsParam.split(',').map((n: string) => Number(n)).filter((n) => !Number.isNaN(n))
		: []
	const priceMin = Number(query.priceMin ?? 0)
	const priceMax = Number(query.priceMax ?? Number.MAX_SAFE_INTEGER)
	const areaMin = Number(query.areaMin ?? 0)
	const areaMax = Number(query.areaMax ?? Number.MAX_SAFE_INTEGER)

	const dataPath = pathResolve(process.cwd(), 'public', 'data', 'apartments.json')
	const raw = await readFile(dataPath, 'utf-8')
	const all: ApartmentItem[] = JSON.parse(raw)

	const prices = all.map((x) => x.price)
	const areas = all.map((x) => x.area)
	const meta = {
		priceMin: Math.min(...prices),
		priceMax: Math.max(...prices),
		areaMin: Math.min(...areas),
		areaMax: Math.max(...areas)
	}

	let filtered = all.filter((x) => (
		x.price >= priceMin && x.price <= priceMax &&
		x.area >= areaMin && x.area <= areaMax &&
		(rooms.length === 0 || rooms.includes(x.rooms))
	))

	const total = filtered.length
	filtered = filtered.slice(offset, offset + limit)

	return {
		items: filtered,
		total,
		meta
	}
}) 