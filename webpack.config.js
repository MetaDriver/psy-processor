/**
 * Created by _BOB_ on 21.04.2020.
 */

const __dirname = "D:/__proj/psy-processor";

module.exports = {
    resolve: {
        // for WebStorm
        alias: {
            '@': path.resolve(__dirname),
            '~': path.resolve(__dirname)
        }
    }
};
