"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.addMember = exports.getAllMembers = void 0;
const member_model_1 = __importDefault(require("../models/member.model"));
const errors_utils_1 = require("../utils/errors.utils");
const getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield member_model_1.default.find();
        res.status(201).json(members);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.getAllMembers = getAllMembers;
const addMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const newMember = await MemberModel.create({
        //     name: req.body.name,
        // });
        const member = yield member_model_1.default.create({
            name: req.body.name,
        });
        // return res.status(201).send(newMember);
        return res.status(201).send({ member });
    }
    catch (err) {
        const errors = (0, errors_utils_1.inputErrors)(err);
        return res.status(200).send({ errors });
    }
});
exports.addMember = addMember;
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield member_model_1.default.deleteOne({ _id: req.params.id }).exec();
        // await MemberModel.remove({ _id: req.params.id }).exec();
        return res.status(201).send({ message: req.body.name + ' a été supprimé du voyage !' });
    }
    catch (err) {
        if (err)
            return res.status(500).send({ message: err });
    }
});
exports.deleteMember = deleteMember;
