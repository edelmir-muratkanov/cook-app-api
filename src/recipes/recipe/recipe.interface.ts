export interface RecipeIdentifiers {
	id?: string
	name?: string
}

export interface RecipeRelations {
	author?: boolean
	ingredients?: boolean
	instructions?: boolean
	comments?: boolean
	ratings?: boolean
	cuisine?: boolean
}
