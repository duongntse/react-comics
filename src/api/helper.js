export const helper = {
    chooseNewestChaptersVersion: function (main, duck, rock, fox, panda) {
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
    },
    sortBetaItems: function (comics) {
        if (Array.isArray(comics) && comics.length > 0) {
            const cloneComics = [...comics];

            return cloneComics
                .filter(
                    (a) =>
                        a.duck_chapters.length > 0 ||
                        a.fox_chapters.length > 0 ||
                        a.main_chapters.length > 0 ||
                        a.panda_chapters.length > 0 ||
                        a.rock_chapters.length > 0
                )
                .sort((a, b) => {
                    // a :main_chapters, duck_chapters,rock_chapters,fox_chapters, panda_chapters
                    // b :main_chapters, duck_chapters,rock_chapters,fox_chapters, panda_chapters
                    let a_newestChapter = null;
                    let b_newestChapter = null;

                    const a_results = this.chooseNewestChaptersVersion(
                        a.main_chapters,
                        a.duck_chapters,
                        a.rock_chapters,
                        a.fox_chapters,
                        a.panda_chapters
                    );

                    const b_results = this.chooseNewestChaptersVersion(
                        b.main_chapters,
                        b.duck_chapters,
                        b.rock_chapters,
                        b.fox_chapters,
                        b.panda_chapters
                    );

                    if (a_results) {
                        a_newestChapter = a_results[0];
                    } else {
                        if (b_results) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }

                    if (b_results) {
                        b_newestChapter = b_results[0];
                    } else {
                        return 0;
                    }

                    if (!a_newestChapter || !b_newestChapter) {
                        debugger;
                        return -1;
                    } else {
                        return (
                            new Date(b_newestChapter.time) -
                            new Date(a_newestChapter.time)
                        );
                    }
                });
        } else return comics;
    },
};

export default helper;
