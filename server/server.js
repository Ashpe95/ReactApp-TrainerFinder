const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'));

// Models
const {User} = require('./models/user');
const {Advert} = require('./models/advert');
const {Reservation} = require('./models/reservation');

//Middlewares
const {auth} = require('./middleware/auth');
const {trainer} = require('./middleware/trainer');

//===================================
//                USERS
//===================================

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isTrainer: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        sex: req.user.sex,
        personaldescription: req.user.personaldescription,
        role: req.user.role,
        trainerinfo: req.user.trainerinfo
    })
})

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
})

app.post('/api/users/login', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if (!user) return res.json({loginSuccess: false, message: 'Auth failes, email not found'});

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({loginSuccess: false, message: 'Wrong password'});

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {token: ''},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        }
    )
})

app.post('/api/users/update_profile',auth,(req,res)=>{
    User.findOneAndUpdate(
        {_id:req.user._id},
        {
            $set: req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

app.post('/api/users/user_profile', (req, res) => {
    if (req.body.trainerinfo == null) {
        User.findOneAndUpdate(
            {_id: req.body._id},
            {
                $set: req.body.trainerinfo = [],
                $set: req.body
            },
            {new: true},
            (err, doc) => {
                if (err) return res.json({success: false, err});
                return res.status(200).send({
                    success: true
                })
            }
        )
    } else {
        User.findOneAndUpdate(
            {_id: req.body._id},
            {
                $set: req.body
            },
            {new: true},
            (err, doc) => {
                if (err) return res.json({success: false, err});
                return res.status(200).send({
                    success: true
                })
            }
        )
    }

})

app.get('/api/users/get_user_by_id', (req, res) => {
    let id = req.query.id;

    User.findOne({'_id': {$in: id}}).exec((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            trainer: doc
        })
    })
})

app.post('/api/users/getUser', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if (!user) return res.json({loginSuccess: false, message: 'Auth failed, email not found'});
        else {
            return res.json({
                id: user._id,
                sex: user.sex,
                personaldescription: user.personaldescription,
                trainerinfo: user.trainerinfo,
                role: user.role,
                email: user.email,
                password: user.password,
                name: user.name,
                lastname: user.lastname,

            })
        }
    })
})

app.post('/api/users/get_trainer_by_id', (req, res) => {
    User.findOne({'_id': req.body._id}, (err, user) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            name: user.name,
            lastname: user.lastname
        })
    })
})

app.post('/api/users/logoutUser', (req, res) => {
    User.findOneAndUpdate({'email': req.body.email}, {token: ''}, (err, user) => {
            if (!user) return res.json({success: false, message: 'Cant logout'});
            else {
                return res.json({
                    success: true
                })
            }
        }
    )
});


//===================================
//                ADVERT
//===================================

// app.post('/api/adverts/add',auth,trainer,(req,res)=>{
//     const advert = new Advert(req.body);
//
//     advert.save((err,doc)=>{
//         if(err) return res.json({success:false,err});
//         res.status(200).json({
//             success: true,
//             add: doc
//         })
//     })
// })

/**
 * MOBILNA
 */
app.post('/api/adverts/add', (req, res) => {
    const advert = new Advert(req.body);

    advert.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            add: doc
        })
    })
})


app.get('/api/adverts/adverts_by_trainer_id', auth, trainer, (req, res) => {
    let trainer = req.query.id;
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Advert.find({'trainer': {$in: trainer}}).
    limit(limit).
    exec((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            adverts: doc
        })
    })
})

app.get('/api/adverts/adverts_by_id', (req, res) => {
    let id = req.query.id;

    Advert.find({'_id': {$in: id}}).exec((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).send(doc[0]);
    })
})


app.post('/api/adverts/update_advert',auth,trainer,(req,res)=>{
    Advert.findOneAndUpdate(
        {_id:req.body.advertId},
        {
            $set: req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

/**
 * MOBILNA
 */
app.post('/api/adverts/update_advert_trainer', (req, res) => {
    Advert.findOneAndUpdate(
        {_id: req.body._id},
        {
            $set: req.body
        },
        {new: true},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        }
    )
})

app.post('/api/adverts/adverts_to_client', (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    if(req.body.filters){
        for (let key in req.body.filters) {
            if (req.body.filters[key].length > 0) {
                if (key === 'priceperhour') {
                    findArgs[key] = {
                        $gte: req.body.filters[key][0],
                        $lte: req.body.filters[key][1]
                    }
                } else {
                    findArgs[key] = req.body.filters[key];
                }
            }
        }
    }

    findArgs['publish'] = true;
    if (req.body.sport) {
        findArgs['sport'] = req.body.sport;
    }
    if (req.body.priceperhour) {
        findArgs['priceperhour'] = {
            $gte: req.body.priceperhour[0],
            $lte: req.body.priceperhour[1]
        }
    }
    ;

    Advert.find(findArgs).sort([[sortBy, order]]).skip(skip).limit(limit).exec((err, adverts) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            size: adverts.length,
            adverts
        })
    })
});

app.post('/api/adverts/available', auth, trainer, (req, res) => {

    Advert.findOneAndUpdate(
        {_id: req.body._id},
        {$set: {available: req.body.advertDetail}},
        {new: true},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            res.status(200).json({
                success: true
            })
        }
    )
})

app.post('/api/adverts/getAdvert', (req, res) => {
    Advert.find({'trainer': req.body.trainer}, (err, advert) => {
        if (!advert) return res.json({loginSuccess: false, message: 'Auth failed, email not found'});
        else {
            return res.json({
                adverts: advert
            })
        }
    })
})

app.post('/api/adverts/getAdvertId', (req, res) => {
    Advert.findOne({'_id': req.body.id}, (err, advert) => {
        if (!advert) return res.json({loginSuccess: false, message: 'Auth failed, advert not found'});
        else {
            return res.json({
                // adverts: advert
                description: advert.description,
                priceperhour: advert.priceperhour,
                title: advert.title,
                sport: advert.sport,
                country: advert.country,
                city: advert.city,
                trainer: advert.trainer,
                publish: advert.publish
            })
        }
    })
})

//===================================
//             RESERVATION
//===================================

app.post('/api/reservations/add', auth, (req, res) => {
    const reservation = new Reservation(req.body);

    reservation.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            add: doc
        })
    })
})

app.post('/api/reservations/get_by_day', (req, res) => {
    let findArgs = {};

    for (let key in req.body) {
        if (req.body[key].length > 0) {
            findArgs[key] = req.body[key];
        }
    }

    Reservation.find(findArgs).exec((err, reservationsByDay) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            reservationsByDay
        })
    })
})

app.get('/api/reservations/reservations_by_client',  (req, res) => {
    let client = req.query.id;
    let order = 'asc';
    let sortBy = "createdAt";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;


    Reservation.find({'user': {$in: client}}).
    populate('advert').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            reservations: doc
        })
    })
})

app.get('/api/reservations/reservations_by_trainer',  (req, res) => {
    let trainer = req.query.id;
    let order = 'asc';
    let sortBy = "createdAt";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Reservation.find({'trainer': {$in: trainer}}).
    populate('advert').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            reservations: doc
        })
    })
})

//===================================
//
//===================================

//DEFAULT
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server Running at ${port}`)
})