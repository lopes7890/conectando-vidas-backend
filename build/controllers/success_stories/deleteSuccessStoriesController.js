// import class 
import { DeleteStoriesService } from "../../services/success_stories/deleteSuccessStories.js";
class DeleteSuccessStoriesController {
    async deleteStories(req) {
        try {
            const serviceDeleteStories = new DeleteStoriesService();
            const deleteService = serviceDeleteStories.deleteServiceStorie(req.body);
            return deleteService;
        }
        catch (error) {
            return { message: error };
        }
        ;
    }
    ;
}
;
export { DeleteSuccessStoriesController };
