import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Resolutions } from '/imports/api/resolutions.js';

import './main.html';
/*
Resolutions.insert({title: 'my-todo'});
Resolutions.insert({title: 'ololol'});
*/
Template.body.onCreated(function (){
    Template.instance().subscribe("resolutions");
});
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
        Meteor.call("resolution.insert",title);
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
        Meteor.call("resolution.checked",this._id,!this.checked);
    },
    //Action, selector
    "click .delete":function(){
        Meteor.call("resolution.remove",this._id);
    },
    "click .toggle-private":function(){
        Meteor.call("setPrivate", this._id, !this.private);//this template id and this private value from mongo
    }
});
Template.resolution.helpers({
    isOwner:function(){
        return Meteor.userId()==this.owner?true:false;
    }
});
Accounts.ui.config({
    passwordSignupFields:"USERNAME_ONLY"
});
