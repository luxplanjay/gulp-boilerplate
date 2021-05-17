import del from 'del';
import paths from './paths';

const clean = () => {
    return del(paths.clean);
};

export default clean;
