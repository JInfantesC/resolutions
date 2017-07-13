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
        return Resolutions.find();
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




/* FRON END CODE
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/
