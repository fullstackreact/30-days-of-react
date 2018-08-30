const util = require("util");
const path = require("path");
const fs = require("fs");
const Promise = require("bluebird");
const glob = require("glob");
const chunk = require("lodash/chunk");
const sharp = require("sharp");
const matter = require("gray-matter");

const argv = require("yargs")
  .usage("Usage: $0 [options]")
  .option("srcImagesDir", { describe: "path to fullstackreact images dir" })
  .help()
  .version().argv;

async function run(argv) {
  const rootDir = argv._[0];
  const globStr = `${rootDir}/day-*/post.md`;
  const posts = (await util.promisify(glob)(globStr, {
    dot: true
  })).sort();

  const postData = await Promise.mapSeries(posts, postPath => {
    const content = fs.readFileSync(postPath);
    const postMatter = matter(content).data;
    postMatter.postPath = postPath;
    postMatter.folder = path.dirname(postPath);
    return postMatter;
  });

  console.log(postData);

  const createImages = async postDatas => {
    await Promise.mapSeries(postDatas, async postData => {
      const thumbnailFilepath = path.join(
        path.dirname(postData.postPath),
        "cover.jpg"
      );

      if (argv.srcImagesDir && !fs.existsSync(thumbnailFilepath)) {
        console.log(`Generating ${thumbnailFilepath}`);
        // resize the image
        const inputFile = path.join(argv.srcImagesDir, postData.imageUrl);
        let transformer = sharp(inputFile)
          .resize(140)
          .jpeg({ quality: 100 });
        await Promise.promisify(transformer.toFile, { context: transformer })(
          thumbnailFilepath
        );
      }
    });
  };

  await createImages(postData);

  const items = postData.map(
    postData =>
      `<a href='${postData.folder}'><img src='${
        postData.folder
      }/cover.jpg' width='140px;' /></a><h4 align='center'><a href='${
        postData.folder
      }'>${postData.title}</a><h4>`
  );

  const rows = chunk(items, 5).map(chunk => `| ` + chunk.join(" | ") + ` |`);

  let output =
    rows[0] +
    "\n" +
    "| :---: | :---: | :---: | :---: | :---: |\n" +
    rows.slice(1).join("\n");

  console.log(output);
}

run(argv)
  .then(() => console.log("Done"))
  .catch(err => console.log(err, err.stack));
