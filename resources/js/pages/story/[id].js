import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ssrAxios from "../lib/ssrAxios";

import Story from "../components/Story/Story";

const StoryShow = props => {
    const router = useRouter();

    let { id } = router.query;

    const storyScroller = useRef();

    const [stories, setStories] = useState(props.stories);

    useEffect(() => props.get("stories", setStories, "stories"), []);

    useEffect(() => {
        // Scroll Karaoke to current one
        var storyEl = document.getElementById(id);

        storyEl &&
            storyEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [stories]);

    return (
        <div className="row p-0">
            <div className="col-sm-4"></div>
            <div className="col-sm-4 m-0 p-0">
                <div
                    ref={storyScroller}
                    className="hidden-scroll m-0 p-0"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {stories.map((story, key) => (
                        <Story
                            {...props}
                            key={key}
                            story={story}
                            stories={stories}
                            storyScroller={storyScroller}
                        />
                    ))}
                </div>
            </div>
            <div className="col-sm-4"></div>
        </div>
    );
};

export async function getServerSideProps(context) {
    var stories;

    await ssrAxios.get(`/api/stories`).then(res => (stories = res.data.data));

    return { props: { stories } };
}

export default StoryShow;
