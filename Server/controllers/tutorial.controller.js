const db    = require("../models");
const {md5} = require("pg/lib/utils");
const jwt   = require('jsonwebtoken');
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const User      = db.users;
const Tutorial  = db.tutorials;
const Op        = db.Sequelize.Op;
const TOKEN_KEY = process.env.TOKEN_KEY;

function trimData(data) {
    return String(data).trim();
}

function generateAccessToken(username) {
    return jwt.sign({username: username}, TOKEN_KEY, { expiresIn: '1h' });
}

exports.login = (req, res) => {
    let userLogin    = trimData(req.body.userLogin || '');
    let userPassword = trimData(req.body.userPassword || '');
    let errors       = [];

    if(! userLogin) {
        errors.push('empty login');
    }

    if(! userPassword) {
        errors.push('empty password');
    }

    if(errors.length) {
        return res.status(400).send({
            message: errors
        });
    }

    User.findOne({
        where: {
            [Op.and] : {
                name:  {[Op.eq]: userLogin},
                passw: {[Op.eq]: userPassword}
            }
        }
    })
    .then(function(user) {
        if (user) {
            let data = {
                message:   'Login success!',
                userName:  userLogin,
                userTokem: generateAccessToken(userLogin)
            }

            return res.send(data);
        }

        throw new Error('Login, Password incorrect');
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.findAll = (req, res) => {
    console.log( Tutorial );

    let isSearch  = Boolean(req.query.s);
    let sort      = req.query.sort;
    let order     = [["id", "DESC"]];
    let condition = null;

    if(sort) {
        order = [sort.split('|')];

        delete req.query['sort'];
    }

    if(isSearch) {
        let intersect = parseInt(req.query['intersect']) 
                            ? Op.and 
                            : Op.or;

        delete req.query['intersect'];
        delete req.query['s'];

        let searchParams = Object.entries(req.query);

        searchParams.forEach(el => {
            let [key, value] = el;

            switch (key) {
                case 'hasImage':
                    if(value != -1) {
                        let operator = parseInt(value) ? Op.ne : Op.eq;

                        if(! condition) {
                            condition = { image: { [ operator ]: '' } };
                        }
                        else {
                            condition = {
                                [intersect] : {
                                    ...condition,
                                    image: { [ operator ]: '' }
                                }
                            } ;
                        }
                    }
                    break;
                case 'published':
                    if(value != -1) {
                        value = Boolean(parseInt(value));

                        if(! condition) {
                            condition = { [key]: { [ Op.eq ]: value } };
                        }
                        else {
                            condition = {
                                [intersect] : {
                                    ...condition,
                                    [key]: { [ Op.eq ]: value }
                                }
                            } ;
                        }
                    }
                    break;
                case 'cathegory':
                    if(value < 6) {
                        value = parseInt(value);

                        if(! condition) {
                            condition = { [key]: { [ Op.eq ]: value } };
                        }
                        else {
                            condition = {
                                [intersect] : {
                                    ...condition,
                                    [key]: { [ Op.eq ]: value }
                                }
                            } ;
                        }
                    }
                    break;
                case 'author':
                case 'description':
                case 'title':
                    if(value.length) {
                        if(! condition) {
                            condition = { [key]: { [ Op.iLike ]: `%${value}%` } };
                        }
                        else {
                            condition = {
                                [intersect] : {
                                    ...condition,
                                    [key]: { [ Op.iLike ]: `%${value}%` },
                                }
                            } ;
                        }
                    }
                    break;
                }
            });
    }

    Tutorial.findAll({ where: condition, order })
        .then(data => {
            return res.send(data);
            //throw new Error('Not found');
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

function getCheckedParams(req) {
    let errors = [];

    title =       trimData(req.body.title || '');
    description = trimData(req.body.description || '');
    author =      trimData(req.body.author || '');
    cathegory =   parseInt(req.body.cathegory || 0);
    image =       trimData(req.body.image || '');
    published =   Boolean(req.body.published || false);

    if (! title) { errors.push('empty title'); }
    if (! description) { errors.push('empty description'); }
    if (! author) { errors.push('empty author'); }

    return {
        tutorial : {
            cathegory,
            author,
            title,
            description,
            image,
            published,
        },
        errors
    };
}

exports.create = (req, res) => {
    const { tutorial, errors } = getCheckedParams(req);

    if(errors.length) {
        return res.status(400).send({ message: errors });
    }

    /**
     * ! need to filter every fields - prepaired statements !
     */
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: [`create tutorial - ${err.message}`] });
        });
};

exports.update = (req, res) => {
    const id          = parseInt(req.params.id);
    const isPublished = Boolean(req.params.published);

    let {tutorial, errors} = isPublished
        ? {
            tutorial: { published: req.body.published },
            errors: []
          }
        : getCheckedParams(req);

    if (errors.length) {
        return res.status(400).send({message: errors});
    }

    Tutorial.update(tutorial, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Updated ok" });
            } else {
                res.send({ message: `Cannot update tutorial with id=${id}` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: [`Error updating tutorial with id=${id}`] });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({ message: "Delete ok" });
        } else {
          res.send({ message: `Cannot delete tutorial with id=${id}` });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Could not delete tutorial with id=${id}`
        });
      });
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            }
            else {
                res.status(404).send({
                    message: `Cannot find tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving tutorial with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} rows deleted` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
