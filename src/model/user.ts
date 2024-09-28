import mongoose, {Schema, Document} from "mongoose";


// For type checking by typescript
export interface Message extends Document{
    content: string;
    createdAt: Date;
};

const MessageSchema : Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now()
    }
    
});

export interface User extends Document{
    email: string;
    username: string,
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
};

const UserSchema : Schema<User> = new Schema({
    email: {
        type: String,
        unique: true,
        // RegeX expression for email validation
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "Please use a valid email address"],
        trim: true,
        required: [true, "Email is required"],
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    verifyCode: {
        type: String,
        unique: true,
        required: [true, "Verify code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]

});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;