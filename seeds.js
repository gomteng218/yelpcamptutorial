var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
    
var data = [
    {
        name: "Coffee!", 
        image: "https://images.unsplash.com/photo-1422207134147-65fb81f59e38?crop=entropy&fit=crop&fm=jpg&h=725&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1300",
        description: "Bacon ipsum dolor amet corned beef ground round venison, strip steak biltong bacon turducken cupim jerky doner pork belly drumstick. Pancetta boudin pork chop meatball kielbasa ball tip swine. Flank pork loin strip steak brisket, turducken capicola turkey hamburger frankfurter filet mignon rump jerky ham. Short ribs shoulder bacon andouille frankfurter, biltong pastrami strip steak cow corned beef ribeye.Beef tongue turducken venison bresaola ham salami corned beef drumstick pastrami. Ball tip filet mignon bresaola turkey landjaeger. Porchetta short loin jerky jowl meatloaf cow fatback ribeye sausage flank. Tongue sausage tail rump frankfurter. Fatback tri-tip ground round meatloaf prosciutto."
    },
    {
        name: "Cloud's Rest", 
        image: "https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=99451809786f5c6a94f74f20e7ad22a0",
        description: "Bacon ipsum dolor amet corned beef ground round venison, strip steak biltong bacon turducken cupim jerky doner pork belly drumstick. Pancetta boudin pork chop meatball kielbasa ball tip swine. Flank pork loin strip steak brisket, turducken capicola turkey hamburger frankfurter filet mignon rump jerky ham. Short ribs shoulder bacon andouille frankfurter, biltong pastrami strip steak cow corned beef ribeye.Beef tongue turducken venison bresaola ham salami corned beef drumstick pastrami. Ball tip filet mignon bresaola turkey landjaeger. Porchetta short loin jerky jowl meatloaf cow fatback ribeye sausage flank. Tongue sausage tail rump frankfurter. Fatback tri-tip ground round meatloaf prosciutto."
    },
    {
        name: "Deserted Island", 
        image: "https://images.unsplash.com/photo-1446426156356-92b664d86b77?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=d9be6a0e9d83e1f8dc84e1c9c7447d38",
        description: "Bacon ipsum dolor amet corned beef ground round venison, strip steak biltong bacon turducken cupim jerky doner pork belly drumstick. Pancetta boudin pork chop meatball kielbasa ball tip swine. Flank pork loin strip steak brisket, turducken capicola turkey hamburger frankfurter filet mignon rump jerky ham. Short ribs shoulder bacon andouille frankfurter, biltong pastrami strip steak cow corned beef ribeye."
    }
];    
    
function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if (err){
            console.log (err);
        } 
        console.log("removed campgrounds!");
        // Add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground!");
                        // create a comment
                        Comment.create(
                            {
                                text: "This place is great! But I wish there was internet.",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            }); 
    });
    
}

module.exports = seedDB;