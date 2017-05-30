var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {name: "Cloud's Rest",
    image: "https://farm5.staticflickr.com/4123/4943676109_b93d9c1203.jpg",
    description: "Etiam mauris dui, maximus et ipsum id, congue pharetra dui. Donec congue, purus at congue porta, elit lorem commodo nunc, quis rhoncus sapien massa a ipsum. Integer nec arcu in diam posuere posuere. Vestibulum laoreet ante at tellus tincidunt ornare. Integer sem dolor, luctus porta luctus in, viverra non eros. Praesent dignissim mauris quis blandit mattis. Cras at lectus non odio sollicitudin posuere quis vel nulla. Fusce convallis tortor vel tempus efficitur. Nullam vulputate at arcu a sagittis. Nunc dignissim eget dolor a tristique. In mattis vestibulum facilisis. Curabitur laoreet diam libero, eget malesuada ligula gravida ac. Integer id justo elementum, interdum lorem non, elementum turpis."
    },
    {name: "Desert Mesa",
    image: "https://farm5.staticflickr.com/4182/34065314110_b5409d52b5.jpg",
    description: "Etiam mauris dui, maximus et ipsum id, congue pharetra dui. Donec congue, purus at congue porta, elit lorem commodo nunc, quis rhoncus sapien massa a ipsum. Integer nec arcu in diam posuere posuere. Vestibulum laoreet ante at tellus tincidunt ornare. Integer sem dolor, luctus porta luctus in, viverra non eros. Praesent dignissim mauris quis blandit mattis. Cras at lectus non odio sollicitudin posuere quis vel nulla. Fusce convallis tortor vel tempus efficitur. Nullam vulputate at arcu a sagittis. Nunc dignissim eget dolor a tristique. In mattis vestibulum facilisis. Curabitur laoreet diam libero, eget malesuada ligula gravida ac. Integer id justo elementum, interdum lorem non, elementum turpis."
    },
    {name: "Canyon Floor",
    image: "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
    description: "Etiam mauris dui, maximus et ipsum id, congue pharetra dui. Donec congue, purus at congue porta, elit lorem commodo nunc, quis rhoncus sapien massa a ipsum. Integer nec arcu in diam posuere posuere. Vestibulum laoreet ante at tellus tincidunt ornare. Integer sem dolor, luctus porta luctus in, viverra non eros. Praesent dignissim mauris quis blandit mattis. Cras at lectus non odio sollicitudin posuere quis vel nulla. Fusce convallis tortor vel tempus efficitur. Nullam vulputate at arcu a sagittis. Nunc dignissim eget dolor a tristique. In mattis vestibulum facilisis. Curabitur laoreet diam libero, eget malesuada ligula gravida ac. Integer id justo elementum, interdum lorem non, elementum turpis."
    }
]

function seedDB() {
    Campground.remove({}, function(err) {
       if (err) {
           console.log(err);
       }
       console.log("removed campgrounds!!!");
       //add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //add a few comments
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("create new comment");
                                campground.comments.push(comment);
                                campground.save();
                            }
                        });
                }
            });
        });
    });

}

module.exports = seedDB;