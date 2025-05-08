// import class
import { DataStoriesService } from "../../services/success_stories/dataSuccessStories.js";
class DataSuccessStoriesController {
    async successStories(req) {
        try {
            const serviceStories = new DataStoriesService();
            const dataStories = serviceStories.dataStoriesInDataBase(req.body);
            return dataStories;
        }
        catch (error) {
            return error;
        }
        ;
    }
    ;
}
;
export { DataSuccessStoriesController };
