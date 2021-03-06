export const OAuthOptions = {
	authUrl: 'https://login.feature01.dnevnik.ru/oauth2',
	grantUrl: 'https://api.feature01.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Birthday,Age,Roles,Schools,Organizations,EduGroups,Lessons,Marks,EduWorks,Relatives,Files,Contacts,Friends,Groups,Networks,Events,Wall,Messages,EmailAddress,Sex,SocialEntityMembership',	
	clientId: '5123975fe9eb415390fb7aa316a15e4e',
	redirectUrl: '//localhost:9000/oauth.html',
}

export const APIoptions = {	
	base: 'https://api.feature01.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	url: 'http://localhost:9000',
	server: 'https://feature01.dnevnik.ru',
	cdn: 'http://localhost:9000/assets/',
	cookieDomain: 'localhost',
	cookieName: 'sportikLocal',
}
