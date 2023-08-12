export interface UserIdentifiers {
	id?: string
	name?: string
	email?: string
}

export interface UserRelations {
	comments?: boolean
	followers?: boolean
	following?: boolean
	recipes?: boolean
	ratings?: boolean
}
