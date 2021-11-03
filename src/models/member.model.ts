import mongoose from 'mongoose';

export interface MemberDocument extends mongoose.Document {
    name: String;
}

const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    { versionKey: false }
);
const MemberModel = mongoose.model<MemberDocument>('member', memberSchema);

export default MemberModel;
