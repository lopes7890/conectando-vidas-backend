import { Request } from "express";

// import class
import { DataStoriesService } from "../../services/success_stories/dataSuccessStories.js";

class DataSuccessStoriesController {
    async successStories(req: Request) {
        try{
            const service = new DataStoriesService();
            const dataStories = service.dataStoriesInDataBase(req.body);

            return dataStories;
        } catch (error) {
            return error;
        };
    };
};

export {DataSuccessStoriesController};