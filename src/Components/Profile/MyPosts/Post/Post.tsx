import React from "react";

type PostType = { post: string }

export const Post: React.FC<PostType> = (props) => {
    return (
        <div>
            {props.post}
        </div>
    )
}