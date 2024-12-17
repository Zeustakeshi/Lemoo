type BaseEntity = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

type Channel = {
    name: string;
    avatar: string;
    background: string;
    description: string;
    status: "ACTIVE" | "BLOCKED" | "PENDING"
    like: number;

    gender: number;
    dateOfBirth: Date;
} & BaseEntity;

type ChannelFollower = {
    channelId: string;
    userId: string;
} & BaseEntity

type Product = {
    name: string;
    image: string;
    price: number;
} & BaseEntity


type Video = {
    channelId: string;
    url: string;
    tags: string[]
    description: string;
    product: Product
    views: number
} & BaseEntity

type VideoReaction = {
    type: "LIKE" | "DISLIKE"
    videoId: string;
    userId: string;
} & BaseEntity

type VideoComment = {
    videoId: string;
    userId: string;
    content: string;
    parent: string
} & BaseEntity


type VideoCommentReaction = {
    type: "LIKE" | "DISLIKE"
    commentId: string;
    userId: string;
} & BaseEntity

