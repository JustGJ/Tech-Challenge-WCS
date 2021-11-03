import { Request, Response } from 'express';
import MemberModel from '../models/member.model';
import { inputErrors } from '../utils/errors.utils';

const getAllMembers = async (req: Request, res: Response) => {
    try {
        const members = await MemberModel.find();
        return res.status(201).json(members);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const addMember = async (req: Request, res: Response) => {
    try {
        const member = await MemberModel.create({
            name: req.body.name,
        });
        return res.status(201).send({ member });
    } catch (err) {
        const errors = inputErrors(err);
        return res.status(200).send({ errors });
    }
};

const deleteMember = async (req: Request, res: Response) => {
    try {
        await MemberModel.deleteOne({ _id: req.params.id }).exec();
        return res.status(201).send({ name: req.body.name });
    } catch (err) {
        return res.status(500).send({ err });
    }
};

export { getAllMembers, addMember, deleteMember };
