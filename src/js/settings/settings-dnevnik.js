export const OAuthOptions = {
	authUrl: 'https://login.dnevnik.ru/oauth2',
	grantUrl: 'https://api.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Birthday,Age,Roles,Files,Sex',	
	clientId: '7d0d92280bd34aa9a5afec1c749bf0e1',
	redirectUrl: 'https://ad.dnevnik.ru/promo/oauth2',
}

export const APIoptions = {	
	base: 'https://api.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	url: 'https://ad.dnenvik.ru/promo/wishlist3',
	server: 'https://dnevnik.ru',
	cdn: 'https://ad.csdnevnik.ru/special/staging/sportik/',
	//cookieDomain: '.dnevnik.ru',
	cookieDomain: '.csdnevnik.ru',
	cookieName: 'sportikDnevnik',
}
