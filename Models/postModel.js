import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: false,
    },
    background: {
      startColor: {
        type: String,
        default: '#ffffff',
      },
      endColor: {
        type: String,
        default: '#ffffff',
      },
      image: {
        type: String,
        default: '',
      },
    },
    uploadImage:{
      type:String,
      default: null,
      required:false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: Array,
      default: [],
      required: false
    },
    comments: {
      type: Array,
      default: [],
      required:false
    }
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model('Post', postSchema);
