// import class
import { NewStoriesService } from "../../services/success_stories/registerSuccessStories.js";
class NewSuccessStoriesController {
    async newStories(req) {
        try {
            const serviceNewStorie = new NewStoriesService();
            const registerNewStorie = await serviceNewStorie.registerStoriesInDataBase(req.body, req);
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
