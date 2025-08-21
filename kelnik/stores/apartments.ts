import { defineStore } from 'pinia'

export interface ApartmentItem {
	id: number
	title: string
	rooms: number
	area: number
	floor: number
	price: number
	image: string
}

export interface ApartmentsResponse {
	items: ApartmentItem[]
	total: number
	meta: {
		priceMin: number
		priceMax: number
		areaMin: number
		areaMax: number
	}
}

export interface FiltersState {
	rooms: number[]
	price: [number, number]
	area: [number, number]
}

interface ApartmentsState {
	apartments: ApartmentItem[]
	total: number
	loading: boolean
	locked: boolean
	limit: number
	offset: number
	filters: FiltersState
	meta: {
		priceMin: number
		priceMax: number
		areaMin: number
		areaMax: number
	}
	orderBy: 'priceAsc' | 'priceDesc' | 'areaAsc' | 'areaDesc' | 'floorAsc' | 'floorDesc' | 'none'
}

interface FetchOptions {
	reset?: boolean
}

export const useApartmentsStore = defineStore('apartments', {
	state: (): ApartmentsState => ({
		apartments: [],
		total: 0,
		loading: false,
		locked: false,
		limit: 20,
		offset: 0,
		filters: {
			rooms: [],
			price: [0, 100000000],
			area: [0, 200]
		},
		meta: {
			priceMin: 0,
			priceMax: 100000000,
			areaMin: 0,
			areaMax: 200
		},
		orderBy: 'none'
	}),
	getters: {
		canLoadMore(state: ApartmentsState): boolean {
			return state.apartments.length < state.total
		}
	},
	actions: {
		async fetchApartments(options: FetchOptions = {}) {
			if (options.reset) {
				this.offset = 0
				this.apartments = []
				this.limit = 1000 // load all available results initially
			}
			this.loading = true
			try {
				const params = new URLSearchParams()
				params.set('limit', String(this.limit))
				params.set('offset', String(this.offset))
				if (this.filters.rooms.length) {
					params.set('rooms', this.filters.rooms.join(','))
				}
				params.set('priceMin', String(this.filters.price[0]))
				params.set('priceMax', String(this.filters.price[1]))
				params.set('areaMin', String(this.filters.area[0]))
				params.set('areaMax', String(this.filters.area[1]))

				const data = await $fetch<ApartmentsResponse>(`/api/apartments?${params.toString()}`)
				
				if (data) {
					let items = data.items
					switch (this.orderBy) {
						case 'priceAsc': items = [...items].sort((a, b) => a.price - b.price); break
						case 'priceDesc': items = [...items].sort((a, b) => b.price - a.price); break
						case 'areaAsc': items = [...items].sort((a, b) => a.area - b.area); break
						case 'areaDesc': items = [...items].sort((a, b) => b.area - a.area); break
						case 'floorAsc': items = [...items].sort((a, b) => a.floor - b.floor); break
						case 'floorDesc': items = [...items].sort((a, b) => b.floor - a.floor); break
					}
					
					this.total = data.total
					this.meta = data.meta
					if (options.reset) {
						this.apartments = items
					} else {
						this.apartments = this.apartments.concat(items)
					}
					this.offset += data.items.length
				}
			} catch (error) {
				console.error('Failed to fetch apartments:', error)
			} finally {
				this.loading = false
				this.locked = false
			}
		},
		setOrder(order: ApartmentsState['orderBy']) {
			this.orderBy = order
		},
		async applyFilters() {
			if (this.loading) return
			this.locked = true
			await this.fetchApartments({ reset: true })
		},
		async loadMore() {
			if (this.loading || !this.canLoadMore) return
			await this.fetchApartments()
		},
		setRooms(rooms: number[]) {
			if (this.locked) return
			this.filters.rooms = rooms
		},
		setPriceRange(range: [number, number]) {
			if (this.locked) return
			this.filters.price = range
		},
		setAreaRange(range: [number, number]) {
			if (this.locked) return
			this.filters.area = range
		},
		resetFilters() {
			if (this.locked) return
			this.filters.rooms = []
			this.filters.price = [this.meta.priceMin, this.meta.priceMax]
			this.filters.area = [this.meta.areaMin, this.meta.areaMax]
		}
	}
}) 