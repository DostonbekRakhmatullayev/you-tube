import Joi from "joi";

export const usrsPost = Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required()
})

export const loginPost = Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required()
})

export const videoPost = Joi.object().keys({
    title: Joi.string().required(),
    usersId: Joi.string().required()
})