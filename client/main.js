import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Resolutions } from '/imports/api/resolutions.js';

import './main.html';
/*
Resolutions.insert({title: 'my-todo'});
Resolutions.insert({title: 'ololol'});
*/

Template.body.helpers({

    resolutions:function (){
        if (Session.get("hideFinished")){
            return Resolutions.find({
                checked:{$ne: true} //MongoDb stuff. if checked is NotEqual to true
            });
        }else{
            return Resolutions.find();
        }

    }
});
Template.body.events({
    "submit .new-resolution": function(event){
        console.log("submit .new-resolution")
        var title=event.target.title.value;
        Resolutions.insert({
            title:title,
            createAt: new Date(),
        });
        event.target.title.value="";
        return false;
    },
    "change .hide-finished":function(event){
        console.log(Session.get("hideFinished"));
        Session.set("hideFinished", event.target.checked)
    }
});
Template.resolution.events({
    "click .toggle-checked":function(){
        //Update needs (id to update, values in JSON)
        Resolutions.update(this._id, {
            //Set values. Another JSON
            $set:{
                checked: !this.checked  //You can use this reach any value in the template.
            }
        });
    },
    //Action, selector
    "click .delete":function(){
        Resolutions.remove(this._id);//this means clicked resolution.
    }
});
Accounts.ui.config({
    passwordSignupFields:"USERNAME_ONLY"
});
