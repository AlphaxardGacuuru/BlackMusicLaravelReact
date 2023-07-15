import { Link } from "react-router-dom";

// const SocialMediaInput = React.lazy(() => import('@/components/core/SocialMediaInput'))
import SocialMediaInput from "@/components/Core/SocialMediaInput";
import CloseSVG from "@/svgs/CloseSVG";

const PostCreate = props => {
    return (
        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
                <div className="contact-form">
                    <div className="d-flex justify-content-between my-2">
                        {/* <!-- Close Icon --> */}
                        <div className="text-white">
                            {props.media ? (
                                <span style={{ fontSize: "1.2em" }}>
                                    <CloseSVG />
                                </span>
                            ) : (
                                <Link to="/">
                                    <a style={{ fontSize: "1.2em" }}>
                                        <CloseSVG />
                                    </a>
                                </Link>
                            )}
                        </div>
                        <h1>Create Post</h1>
                        <a className="invisible">
                            <CloseSVG />
                        </a>
                    </div>

                    {/* Social Input */}
                    <SocialMediaInput
                        {...props}
                        placeholder="What's on your mind"
                        showImage={true}
                        showPoll={true}
                        urlTo="posts"
                        redirect="/"
                        editing={false}
                    />
                </div>
            </div>
            <div className="col-sm-4"></div>
        </div>
    );
};

export default PostCreate;
