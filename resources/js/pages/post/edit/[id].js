import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import SocialMediaInput from "../components/Core/SocialMediaInput";
import ssrAxios from "../lib/ssrAxios";
import CloseSVG from "../svgs/CloseSVG";

const PostEdit = props => {
    const router = useRouter();

    let { id } = router.query;

    return (
        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
                <div className="contact-form">
                    <div className="d-flex justify-content-between mb-1">
                        {/* Close Icon */}
                        <div className="text-white">
                            <Link href="/">
                                <a className="fs-4">
                                    <CloseSVG />
                                </a>
                            </Link>
                        </div>
                        {/* Close Icon End */}
                        {/* Title */}
                        <h1>Edit Post</h1>
                        {/* Title End */}
                        <a className="invisible">
                            <CloseSVG />
                        </a>
                    </div>

                    {/* Social Input */}
                    <SocialMediaInput
                        {...props}
                        placeholder="What's on your mind"
                        text={props.post.text}
                        showImage={false}
                        showPoll={false}
                        urlTo={`posts/${id}`}
                        editing={true}
                    />
                </div>
            </div>
            <div className="col-sm-4"></div>
        </div>
    );
};

// This gets called on every request
export async function getServerSideProps(context) {
    const { id } = context.query;

    var data = {
        post: {}
    };

    // Fetch Post Comments
    await ssrAxios
        .get(`/api/posts/${id}`)
        .then(res => (data.post = res.data.data));

    // Pass data to the page via props
    return { props: data };
}

export default PostEdit;
