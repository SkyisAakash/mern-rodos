const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTodoInput(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    if (!Validator.isLength(data.title, {min: 4, max: 300})) {
        errors.title = 'Todo title must be between 4-300 characters long';
    }

    if(!Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}