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
    sortBetaItems: function (betaItems) {
        const cloneBetaItems = [...betaItems];
        return cloneBetaItems.sort((a, b) => {
            // a :main_chapters, duck_chapters,rock_chapters,fox_chapters, panda_chapters
            // b :main_chapters, duck_chapters,rock_chapters,fox_chapters, panda_chapters
            const a_newestChapter = this.chooseNewestChaptersVersion(
                a.main_chapters,
                a.duck_chapters,
                a.rock_chapters,
                a.fox_chapters,
                a.panda_chapters
            )[0];
            const b_newestChapter = this.chooseNewestChaptersVersion(
                b.main_chapters,
                b.duck_chapters,
                b.rock_chapters,
                b.fox_chapters,
                b.panda_chapters
            )[0];

            return (
                new Date(b_newestChapter.time) - new Date(a_newestChapter.time)
            );
        });
    },
};

export default helper;
