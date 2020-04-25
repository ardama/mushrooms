import { arrayToGrid } from '../utils/helpers.js';
import * as data from '../../assets/chunks.json';
const { height, width, editorsettings, layers } = data;
const { height: chunkheight, width: chunkwidth } = editorsettings.chunksize

export default arrayToGrid(layers[0].chunks, height / chunkheight, width / chunkwidth);
