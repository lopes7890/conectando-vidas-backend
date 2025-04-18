// import class 
import { DeleteStoriesService } from "../../services/success_stories/deleteSuccessStories.js";
class DeleteSuccessStoriesController {
    async deleteStories(req) {
        try {
            const service = new DeleteStoriesService();
            const deleteService = service.deleteServiceStorie(req.body);
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
