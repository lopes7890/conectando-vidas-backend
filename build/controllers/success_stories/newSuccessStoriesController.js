// import class
import { NewStoriesService } from "../../services/success_stories/registerSuccessStories.js";
class NewSuccessStoriesController {
    async newStories(req) {
        try {
            const service = new NewStoriesService();
            const registerNewStorie = await service.registerStoriesInDataBase(req.body, req);
            if (typeof registerNewStorie === "object") {
                return "internal fail, try again";
            }
            ;
            return registerNewStorie;
        }
        catch (error) {
            return { message: error };
        }
        ;
    }
    ;
}
;
export { NewSuccessStoriesController };
