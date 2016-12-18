'use strict'
const Route = use('Route')

Route.get('/fo', 'AdvertiseController.index')
Route.get('/belepett', 'AdvertiseController.belepes')

Route.get('/belepett/search', 'AdvertiseController.search1')
Route.get('/search', 'AdvertiseController.search')

Route.get('/fo/fo', 'AdvertiseController.index')
Route.get('/fo/:id', 'AdvertiseController.show')
Route.get('/fo/reg', 'UserController.reg')
Route.post('/fo/reg', 'UserController.regel')
Route.get('/fo/belep', 'UserController.belep')
Route.post('/fo/belep', 'UserController.belepes')
Route.get('/fo/search', 'AdvertiseController.search')

Route.get('/reg', 'UserController.reg')
Route.post('/reg', 'UserController.regel')

Route.get('/advertises/fo', 'AdvertiseController.index')
Route.get('/advertises/search', 'AdvertiseController.search')
Route.get('/advertises/reg', 'UserController.reg')
Route.post('/advertises/reg', 'UserController.regel')
Route.get('/advertises/belep', 'UserController.belep')
Route.post('/advertises/belep', 'UserController.belepes')

Route.get('/belep', 'UserController.belep')
Route.post('/belep', 'UserController.belepes')


Route.get('/advertises/:id', 'AdvertiseController.show')
Route.get('/advertises/:id', 'AdvertiseController.index')
Route.get('/advertises/exit', 'UserController.exit')

Route.get('/belepett/uj', 'AdvertiseController.uj').middleware('auth')
Route.post('belepett/uj', 'AdvertiseController.letrehoz').middleware('auth')
Route.get('/belepett/advertises/:id/mod', 'AdvertiseController.mod').middleware('auth')
Route.post('/belepett/advertises/:id/mod', 'AdvertiseController.modosit').middleware('auth')
Route.get('/belepett/:id/delete', 'AdvertiseController.torol').middleware('auth')
Route.get('/belepett/exit', 'UserController.exit')

Route.get('/belepett/advertises/:id', 'AdvertiseController.show1')
Route.get('/belepett/advertises/exit', 'UserController.exit')

Route.group('ajax', function () {
  Route.delete('/belepett/advertises/:id/delete', 'AdvertiseController.ajaxDelete').middleware('auth')
  Route.post('/belep', 'UserController.ajaxLogin')
  Route.post('/advertises/belep', 'UserController.ajaxLogin')
  Route.post('/search/reg', 'UserController.ajaxLogin')
  Route.post('/fo/belep', 'UserController.ajaxLogin')
  Route.post('/fo/reg', 'UserController.ajaxReg')
  Route.post('/reg', 'UserController.ajaxReg')
  Route.post('/advertises/reg', 'UserController.ajaxReg')
Route.post('/search/reg', 'UserController.ajaxReg')
}).prefix('/ajax')