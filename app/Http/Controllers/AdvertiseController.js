'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Advertise = use('App/Model/Advertise')
const User = use('App/Model/User')
const Validator = use('Validator')

class AdvertiseController{
    * index(request, response) {
        const categories = yield Category.all()
        for(let category of categories) {
        const topAdvertises = yield category.advertises().limit(3).fetch();
            category.topAdvertises = topAdvertises.toJSON();
        }

        yield response.sendView('main', {
        categories: categories.toJSON()
        })  
    }

    * belepes(request, response) {
        const categories = yield Category.all()
        for(let category of categories) {
        const topAdvertises = yield category.advertises().limit(3).fetch();
            category.topAdvertises = topAdvertises.toJSON();
        }

        yield response.sendView('belepes', {
        categories: categories.toJSON()
        })  
    }

    * show (request, response) {
        const id = request.param('id');
        const advertise = yield Advertise.find(id);
        yield advertise.related('category').load();
        yield response.sendView('advertiseShow', {
            advertise: advertise.toJSON()
        })
    }

    * show1 (request, response) {
        const id = request.param('id');
        const advertise = yield Advertise.find(id);
        yield advertise.related('category').load();
        yield response.sendView('belepAdvertiseShow', {
            advertise: advertise.toJSON()
        })
    }

    * search (request, response) {
        const page = Math.max(1, request.input('p'))
        const filters = {
            advertiseName: request.input('advertiseName') || '',
            category: request.input('category') || 0,
            createdBy: request.input('createdBy') || 0
        }

        const advertises = yield Advertise.query()
        .where(function () {
            if (filters.category > 0) this.where('category_id', filters.category)
            if (filters.createdBy > 0) this.where('user_id', filters.createdBy)
            if (filters.advertiseName.length > 0) this.where('name', 'LIKE', `%${filters.advertiseName}%`)
        })
        .with('user')
        .paginate(page, 9)

        const categories = yield Category.all()
        const users = yield User.all()

        yield response.sendView('advertiseSearch', {
        advertises: advertises.toJSON(),
        categories: categories.toJSON(),
        users: users.toJSON(),
        filters
        })
    }

    * search1 (request, response) {
        const page = Math.max(1, request.input('p'))
        const filters = {
            advertiseName: request.input('advertiseName') || '',
            category: request.input('category') || 0,
            createdBy: request.input('createdBy') || 0
        }

        const advertises = yield Advertise.query()
        .where(function () {
            if (filters.category > 0) this.where('category_id', filters.category)
            if (filters.createdBy > 0) this.where('user_id', filters.createdBy)
            if (filters.advertiseName.length > 0) this.where('name', 'LIKE', `%${filters.advertiseName}%`)
        })
        .with('user')
        .paginate(page, 9)

        const categories = yield Category.all()
        const users = yield User.all()

        yield response.sendView('belepAdvertiseSearch', {
        advertises: advertises.toJSON(),
        categories: categories.toJSON(),
        users: users.toJSON(),
        filters
        })
    }

    * uj (request, response) {
        const categories = yield Category.all()
            yield response.sendView('newAdvertise', {
            categories: categories.toJSON()
        });
    }

    * letrehoz (request, response) {
        const advertiseData = request.except('_csrf');
        const rules = {
            name: 'required',
            describing: 'required',
            price: 'required',
            email:'required',
            phone:'required',
            category_id: 'required'
        };
        const validation = yield Validator.validateAll(advertiseData, rules)

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({errors: validation.messages()})
                .flash()
            response.redirect('back')
            return
        }

        advertiseData.user_id = request.currentUser.id
        const advertise = yield Advertise.create(advertiseData)
        response.redirect('/belepett')
     }

    * mod (request, response) {
        const categories = yield Category.all()
        const id = request.param('id');
        const advertise = yield Advertise.find(id);

        if (request.currentUser.id !== advertise.user_id) {
            response.unauthorized('Access denied.')
            return
        }

        yield response.sendView('advertiseMod', {
            categories: categories.toJSON(),
            advertise: advertise.toJSON()
        });
    }

    * modosit (request, response) {
        const advertiseData = request.except('_csrf');
        const rules = {
            name: 'required',
            describing: 'required',
            price: 'required',
            email:'required',
            phone:'required',
            category_id: 'required'
         };

        const validation = yield Validator.validateAll(advertiseData, rules)

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({errors: validation.messages()})
                .flash()
            response.redirect('back')
            return
        }

        const id = request.param('id');
        const advertise = yield Advertise.find(id);  
        advertise.name = advertiseData.name;
        advertise.describing = advertiseData.describing; 
        advertise.price = advertiseData.price;
        advertise.email = advertiseData.email;
        advertise.phone = advertiseData.phone;
        advertise.category_id = advertiseData.category_id;
        yield advertise.save()
        response.redirect('/belepett')
    }

    * torol (request, response) {
        const id = request.param('id');
        const advertise = yield Advertise.find(id);

        if (request.currentUser.id !== advertise.user_id) {
            response.unauthorized('Access denied.')
            return
        }
        yield advertise.delete()
        response.redirect('/belepett')
    }
}

module.exports = AdvertiseController