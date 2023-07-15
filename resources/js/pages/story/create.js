import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SocialMediaInput from "@/components/Core/SocialMediaInput";
import CloseSVG from "@/svgs/CloseSVG";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform,
    FilePondPluginFileValidateSize
);

const create = props => {
    return (
        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
                <div className="contact-form">
                    <div className="d-flex justify-content-between my-2">
                        {/* <!-- Close Icon --> */}
                        <div className="text-white">
                            <Link to="/"
							 style={{ fontSize: "1.2em" }}>
                                    <CloseSVG />
                            </Link>
                        </div>
                        <h1>Create Story</h1>
                        <a className="invisible">
                            <CloseSVG />
                        </a>
                    </div>
                </div>

                {/* Social Media Input */}
                <div className="bottomNav">
                    <SocialMediaInput
                        {...props}
                        placeholder="What's on your mind"
                        showStory={true}
                        urlTo="stories"
                        required={false}
                        btnText="post"
                        redirect="/"
                    />
                </div>
                {/* Social Media Input End */}
            </div>
            <div className="col-sm-4"></div>
        </div>
    );
};

export default create;
