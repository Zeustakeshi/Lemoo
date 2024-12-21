import { Pageable } from "@/common/type/page.type";
import { CommentResponse, VideoShortResponse } from "@/common/type/shorts.type";
import { api } from "@/lib/api";

export const getAllRecommentVideo = async (
    page: number
): Promise<Pageable<VideoShortResponse>> => {
    return api.get("/videos/shorts/view/recommend", {
        params: { page, limit: 3 },
    });
};

export const getVideoComments = async (
    videoId: string,
    page: number
): Promise<Pageable<CommentResponse>> => {
    return await api.get(`/videos/shorts/view/${videoId}/comments`, {
        params: {
            page,
            limit: 7,
        },
    });
};

export const createVideoComment = async (
    videoId: string,
    content: string,
    parentId?: string
): Promise<CommentResponse> => {
    return await api.post(`/videos/shorts/view/${videoId}/comments`, {
        parent: parentId,
        content: content,
    });
};

export const reactionComment = async (
    videoId: string,
    commentId: string,
    type: "LIKE" | "DISLIKE"
) => {
    return await api.post(
        `videos/shorts/view/${videoId}/comments/${commentId}/reaction`,
        {},
        {
            params: { type },
        }
    );
};

export const unReactionComment = async (videoId: string, commentId: string) => {
    return await api.delete(
        `videos/shorts/view/${videoId}/comments/${commentId}/reaction`
    );
};
