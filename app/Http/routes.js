'use strict'
const Route = use('Route')

Route.get('/fo', 'AdvertiseController.index')
Route.get('/belepett', 'AdvertiseController.belepes')

Route.get('/belepett/search', 'AdvertiseController.search1')
Route.get('/search', 'AdvertiseController.search')

Route.get('/fo/fo', 'AdvertiseController.index')
Route.get('/fo/:id', 'AdvertiseController.show')
Route.get('/fo/reg', 'UserController.reg')
Route.get('/fo/belep', 'UserController.belep')
Route.get('/fo/search', 'UserController.search')

Route.get('/reg', 'UserController.reg')
Route.post('/reg', 'UserController.regel')

Route.get('/advertises/reg', 'UserController.reg')
Route.get('/advertises/reg', 'UserController.regel')
Route.get('/advertises/belep', 'UserController.belep')
Route.get('/advertises/belepes', 'UserController.belepes')

Route.get('/belep', 'UserController.belep')
Route.post('/belep', 'UserController.belepes')
Route.get('/exit', 'UserController.exit')


Route.get('/advertises/:id', 'AdvertiseController.show')
Route.get('/advertises/:id', 'AdvertiseController.index')
Route.get('/advertises/exit', 'UserController.exit')

Route.get('/belepett/uj', 'AdvertiseController.uj').middleware('auth')
Route.post('belepett/uj', 'AdvertiseController.letrehoz').middleware('auth')
Route.get('/belepett/:id/mod', 'AdvertiseController.mod').middleware('auth')
Route.post('/belepett/:id/mod', 'AdvertiseController.modosit').middleware('auth')
Route.get('/belepett/:id/delete', 'AdvertiseController.torol').middleware('auth')
Route.get('/belepett/exit', 'UserController.exit')

Route.get('/belepett/advertises/:id', 'AdvertiseController.show1')
Route.get('/belepett/advertises/:id', 'AdvertiseController.belepes')
Route.get('/belepett/advertises/exit', 'UserController.exit')
