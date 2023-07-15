import BackSVG from "@/svgs/BackSVG";
import { Link } from "react-router-dom";

const Privacy = () => {
    return (
        <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                <div className="my-2 ml-2 text-white">
                    <Link to="/">
                        <a>
                            <BackSVG />
                        </a>
                    </Link>
                </div>
                <iframe
                    src="https://www.iubenda.com/privacy-policy/38639633"
                    title="privacy policy"
                    frameBorder="0"
                    width="100%"
                    height="800px"
                    scrolling="no"
                ></iframe>
            </div>
            <div className="col-sm-1"></div>
        </div>
    );
};

export default Privacy;
