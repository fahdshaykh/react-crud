import PostController from './PostController'
import Settings from './Settings'
const Controllers = {
    PostController: Object.assign(PostController, PostController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers