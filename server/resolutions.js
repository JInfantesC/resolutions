import { Meteor } from 'meteor/meteor';
import { Resolutions} from "/imports/api/resolutions.js"
Meteor.publish("resolutions", function(){
    return Resolutions.find();
});
