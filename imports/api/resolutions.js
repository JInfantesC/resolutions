import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
export const Resolutions = new Mongo.Collection('resolutions');
//Define methods. This methods are called using Meteor.call("method_name", arg1,...argN);
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
        Meteor.call("checkOwner",resolutionId);
        if (!Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }
        Resolutions.remove(resolutionId);//this means clicked resolution.
    },
    "resolution.checked"(resolutionId, checkedValue){
        check(resolutionId,String)
        check(checkedValue,Boolean)
        Meteor.call("checkOwner",resolutionId);
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
    },
    "setPrivate"(id,private){
        console.log("setPrivate")
        check(id, String);
        check(private, Boolean);

        Meteor.call("checkOwner",id);

        Resolutions.update (id, {$set:{private:private}});
    },
    "checkOwner"(id){//Useful to verify that the registry belongs to current user.
        console.log("checkOwner");
        check(id,String);
        var resolution_value=Resolutions.findOne(id);
        if (resolution_value.owner!==Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }
    }

});
