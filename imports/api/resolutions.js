import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
export const Resolutions = new Mongo.Collection('resolutions');

Meteor.methods({
    "resolution.insert"(title){
        check(title,String)
        if (!Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }
        Resolutions.insert({
            title:title,
            createAt: new Date(),
            owner: Meteor.userId(),
            username:Meteor.user().username
        });
    },
    "resolution.remove"(resolutionId){
        check(resolutionId,String)
        if (!Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }
        Resolutions.remove(resolutionId);//this means clicked resolution.
    },
    "resolution.checked"(resolutionId, checkedValue){
        check(resolutionId,String)
        check(checkedValue,Boolean)
        if (!Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }
        //Update needs (id to update, values in JSON)
        Resolutions.update(resolutionId, {
            //Set values. Another JSON
            $set:{
                checked: checkedValue  //You can use this reach any value in the template.
            }
        });
    }
});
