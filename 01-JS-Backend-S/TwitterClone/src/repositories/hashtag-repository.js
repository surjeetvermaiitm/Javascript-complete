import Hashtags from '../models/hashtags.js';
import CrudRepository from './crud-repository.js';

class HashtagRepository extends CrudRepository {
    constructor() {
        super(Hashtags)
    }
    async bulkCreate(data) {
        try {
            const tags = await Hashtags.insertMany(data);
            return tags;
        } catch (error) {
            console.log(error);
        }
    }

    async getByName(titleList) {
        try {
            const response = await this.model.find({ title: titleList }).select('title -_id');
            return response;
        } catch (error) {
            console.log(error);
        }
    }

}


export default HashtagRepository;