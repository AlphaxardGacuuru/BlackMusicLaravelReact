import React, { useEffect, useRef, useState, useParams } from "react";

import Story from "@/components/Story/Story";

const StoryShow = props => {
    let { id } = useParams();

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

export default StoryShow;
