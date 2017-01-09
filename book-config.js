const fs = require('fs');
const glob = require('glob');
const path = require('path');

const thisDir = __dirname;
const root = path.join(thisDir, '..', '..', '..');
const files = glob.sync(path.join(thisDir, '*.md'));


module.exports = {
  input: thisDir,
  relativeTo: root,
  baseUrl: 'http://localhost:3020',
  paths: () => {
    let paths = [];
    for (var i = 1; i <= 10; i++) {
      paths.push(`/30-days-of-react/day-${i}`);
    }
    return paths;
  },
  output: 'output',
  name: '30-days-of-react',
  title: '30 Days of React',
  author: 'Ari Lerner & Fullstack.io',
  rights: 'Creative Commons Non-Commercial Share Alike 3.0',
  language: 'en',
  chapters: files,
  imagesDir: path.join(root, 'assets', 'images', 'series', '30-days-of-react'),
  codeDir: path.join(root, 'assets', 'code', 'articles', '30-days-of-react')
};
