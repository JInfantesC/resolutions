import { Meteor } from 'meteor/meteor';
import { Resolutions} from "/imports/api/resolutions.js"
Meteor.publish("resolutions", function(){
    return Resolutions.find({
        $or: [      //MongoDb special value. Performs a logical OR with the values passed in the array
            {private: {$ne: true}},
            {owner:this.userId}
        ]
    });
});
