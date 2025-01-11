import SceenHeaderBack from "@/components/ui/SceenHeaderBack";
import AppWrapper from "@/components/wrapper/AppWrapper";
import { ShortsCommentProvider } from "@/context/ShortsCommentContext";
import CommentInput from "@/modules/shorts/comment/CommentInput";
import CommentList from "@/modules/shorts/comment/CommentList";
import { useLocalSearchParams } from "expo-router";
import React from "react";

type Props = {};

const CommentScreen = (props: Props) => {
    const { id: videoId } = useLocalSearchParams();

    return (
        <AppWrapper className="">
            <ShortsCommentProvider videoId={videoId as string}>
                <SceenHeaderBack>Bình luận</SceenHeaderBack>
                <CommentList></CommentList>
                <CommentInput></CommentInput>
            </ShortsCommentProvider>
        </AppWrapper>
    );
};

export default CommentScreen;
