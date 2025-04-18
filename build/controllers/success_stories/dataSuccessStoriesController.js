import { DataStoriesService } from "../../services/success_stories/dataSuccessStories.js";
class DataSuccessStoriesController {
    async successStories(req) {
        try {
            const service = new DataStoriesService();
            const dataStories = service.dataStoriesInDataBase(req.body);
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
