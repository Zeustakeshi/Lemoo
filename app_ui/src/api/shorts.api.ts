import { Pageable } from "@/common/type/page.type";
import { VideoShortResponse } from "@/common/type/shorts.type";
import { api } from "@/lib/api";

export const getAllRecommentVideo = async (
    page: number
): Promise<Pageable<VideoShortResponse>> => {
    return api.get("/videos/shorts/view/recommend", {
        params: { page, limit: 3 },
    });
};
