import React from "react";
import Moment from "moment";
import _ from "lodash";

const BootstrapTableChapters = ({ prevChapters }) => (
    <table className="table table-light table-hover">
        <thead>
            <tr>
                <th scope="col">
                    <div className="item content text-center">Chapter</div>
                </th>
                <th scope="col">
                    <div className="item content text-center">Date</div>
                </th>
            </tr>
        </thead>
        <tbody>
            {prevChapters.map((chapter, index) => (
                <tr key={index}>
                    <td>
                        <a className="chapterNumberLink" href={chapter.link}>
                            {_.truncate(chapter.text, {
                                length: 20,
                            })}
                        </a>
                    </td>
                    <td>
                        {chapter.time ? (
                            <span className="">
                                {/* <div className="item content text-center"> </div> */}
                                {Moment(chapter.time).fromNow()}
                            </span>
                        ) : (
                            "not available"
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

/*
<ComicCard
    website_name={website_name}
    website_url={website_url}
    cover_img={cover_img}
    comic_name={comic_name}
    comic_url={comic_url}
    main_chapters,
    duck_chapters,
    rock_chapters,
    fox_chapters,
    panda_chapters,
/>;
*/
export const ComicCard = (props) => {
    const {
        website_name,
        website_url,
        cover_img,
        comic_name,
        comic_url,
        main_chapters,
        duck_chapters,
        rock_chapters,
        fox_chapters,
        panda_chapters,
    } = props;

    const chooseNewestChaptersVersion = (main, duck, rock, fox, panda) => {
        const filtered_versions = [main, duck, rock, fox, panda].filter(
            (version) => version.length > 0
        );

        if (filtered_versions.length > 1) {
            return filtered_versions.sort((a, b) => {
                const a_latestChapter = [...a].sort(
                    (a, b) => new Date(b.time) - new Date(a.time)
                )[0];
                const b_latestChapter = [...b].sort(
                    (a, b) => new Date(b.time) - new Date(a.time)
                )[0];
                return (
                    new Date(b_latestChapter.time) -
                    new Date(a_latestChapter.time)
                );
            })[0];
        } else {
            return filtered_versions[0];
        }
    };

    const chapters = chooseNewestChaptersVersion(
        main_chapters,
        duck_chapters,
        rock_chapters,
        fox_chapters,
        panda_chapters
    );

    const latestChapterUI = (
        <div className="text">
            <div className="extra content">
                <span className="right floated mr-1">
                    {chapters[0].time ? Moment(chapters[0].time).fromNow() : ""}
                </span>
                <span>
                    <a
                        className="m-1 chapterNumberLink"
                        href={chapters[0].link}
                    >
                        {_.truncate(chapters[0].text, {
                            length: 20,
                        })}
                    </a>
                </span>
            </div>
        </div>
    );

    const prevChapterUIs = (
        <div className="dropdown d-grid gap-2">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Previous Chapters
            </button>
            <ul
                className="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton"
            >
                <BootstrapTableChapters prevChapters={chapters.slice(1)} />
            </ul>
        </div>
    );

    return (
        <div className="ui link cards my-1">
            <div className="card">
                <div className="image">
                    <img src={cover_img} style={{ height: "410px" }} />
                </div>
                <div className="content">
                    <div className="header">
                        <a className="m-1" href={comic_url}>
                            {comic_name}
                        </a>
                    </div>
                    <div className="meta">
                        <a href={website_url}>
                            {_.truncate(website_name, {
                                length: 15,
                            })}
                        </a>
                    </div>
                    {/* <div className="description">
                            Matthew is an interior designer living in New York.
                        </div> */}
                </div>
                {[latestChapterUI]}
                <br />
                {prevChapterUIs}
            </div>
        </div>
    );
};

export default ComicCard;
