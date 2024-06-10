package com.example.connect_adu.responses;

public class LikeCountResponse {
    private Long likeCount;

    public LikeCountResponse(Long likeCount) {
        this.likeCount = likeCount;
    }

    public Long getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Long likeCount) {
        this.likeCount = likeCount;
    }
}